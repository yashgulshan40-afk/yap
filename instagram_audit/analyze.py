"""Score posts and decide which ones to keep, review or suggest for archiving."""

from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timezone
from statistics import median

KEEP, REVIEW, ARCHIVE = "keep", "review", "archive"


@dataclass
class Rules:
    # Posts younger than this are still collecting reach, so we never flag them.
    min_age_days: int = 14
    # Engagement rate below this fraction of the format's median -> archive candidate.
    archive_ratio: float = 0.5
    # Below this fraction -> worth a manual look.
    review_ratio: float = 0.8
    # Reach below this fraction of the format's median also counts against a post.
    low_reach_ratio: float = 0.5


@dataclass
class PostScore:
    id: str
    permalink: str
    caption: str
    format: str
    posted_at: datetime
    age_days: int
    likes: int
    comments: int
    saves: int
    shares: int
    reach: int
    views: int
    engagement_rate: float
    relative_score: float  # engagement rate / median of same format (1.0 = typical)
    verdict: str = KEEP
    reasons: list[str] = field(default_factory=list)


def post_format(post: dict) -> str:
    if post.get("media_product_type") == "REELS":
        return "REEL"
    return {"CAROUSEL_ALBUM": "CAROUSEL", "VIDEO": "VIDEO"}.get(post.get("media_type", ""), "IMAGE")


def _parse_ts(ts: str) -> datetime:
    # Instagram returns e.g. 2026-10-01T12:30:00+0000
    return datetime.strptime(ts, "%Y-%m-%dT%H:%M:%S%z")


def score_posts(account: dict, posts: list[dict], rules: Rules | None = None,
                now: datetime | None = None) -> list[PostScore]:
    rules = rules or Rules()
    now = now or datetime.now(timezone.utc)
    followers = max(int(account.get("followers_count") or 0), 1)

    scored: list[PostScore] = []
    for p in posts:
        ins = p.get("insights", {})
        likes = int(p.get("like_count") or 0)
        comments = int(p.get("comments_count") or 0)
        saves, shares = ins.get("saved", 0), ins.get("shares", 0)
        reach = ins.get("reach", 0)
        interactions = likes + comments + saves + shares
        # Prefer reach as denominator; fall back to followers if insights are missing.
        rate = interactions / (reach or followers)
        posted = _parse_ts(p["timestamp"])
        scored.append(PostScore(
            id=p["id"], permalink=p.get("permalink", ""),
            caption=(p.get("caption") or "").strip().replace("\n", " ")[:120],
            format=post_format(p), posted_at=posted, age_days=(now - posted).days,
            likes=likes, comments=comments, saves=saves, shares=shares, reach=reach,
            views=ins.get("views", 0), engagement_rate=rate, relative_score=0.0,
        ))

    # Benchmarks per format, so Reels are compared to Reels, carousels to carousels.
    by_format: dict[str, list[PostScore]] = defaultdict(list)
    for s in scored:
        by_format[s.format].append(s)

    for fmt, group in by_format.items():
        med_rate = median(s.engagement_rate for s in group) or 1e-9
        reaches = [s.reach for s in group if s.reach]
        med_reach = median(reaches) if reaches else 0
        for s in group:
            s.relative_score = s.engagement_rate / med_rate
            _classify(s, med_reach, len(group), rules)

    scored.sort(key=lambda s: s.relative_score)
    return scored


def _classify(s: PostScore, med_reach: float, group_size: int, rules: Rules) -> None:
    if s.age_days < rules.min_age_days:
        s.reasons.append(f"Only {s.age_days}d old - still collecting reach")
        return
    if group_size < 3:
        s.reasons.append(f"Too few {s.format.lower()} posts to benchmark")
        return

    strikes = 0
    pct = round(s.relative_score * 100)
    if s.relative_score < rules.archive_ratio:
        strikes += 2
        s.reasons.append(f"Engagement {pct}% of your typical {s.format.lower()}")
    elif s.relative_score < rules.review_ratio:
        strikes += 1
        s.reasons.append(f"Engagement a bit low ({pct}% of typical)")
    if med_reach and s.reach and s.reach < med_reach * rules.low_reach_ratio:
        strikes += 1
        s.reasons.append(f"Reach {s.reach:,} vs typical {int(med_reach):,}")
    if s.saves == 0 and s.shares == 0:
        strikes += 1
        s.reasons.append("Zero saves and shares")

    if strikes >= 3:
        s.verdict = ARCHIVE
    elif strikes >= 1:
        s.verdict = REVIEW


def summarize(scored: list[PostScore]) -> dict:
    """Account-level takeaways: what works, when to post, how many to archive."""
    by_format: dict[str, list[float]] = defaultdict(list)
    by_hour: dict[int, list[float]] = defaultdict(list)
    by_day: dict[str, list[float]] = defaultdict(list)
    for s in scored:
        by_format[s.format].append(s.engagement_rate)
        by_hour[s.posted_at.hour].append(s.engagement_rate)
        by_day[s.posted_at.strftime("%A")].append(s.engagement_rate)

    def best(groups: dict, min_n: int = 2):
        ranked = [(k, median(v), len(v)) for k, v in groups.items() if len(v) >= min_n]
        return sorted(ranked, key=lambda x: x[1], reverse=True)

    counts = {v: sum(1 for s in scored if s.verdict == v) for v in (KEEP, REVIEW, ARCHIVE)}
    return {
        "total": len(scored),
        "counts": counts,
        "formats": best(by_format, 1),
        "best_hours_utc": best(by_hour)[:3],
        "best_days": best(by_day)[:3],
        "top_posts": sorted(scored, key=lambda s: s.relative_score, reverse=True)[:5],
    }
