"""Write the audit as CSV (for spreadsheets) and a self-contained HTML page."""

from __future__ import annotations

import csv
import html
from pathlib import Path

from .analyze import ARCHIVE, REVIEW, PostScore

CSV_COLUMNS = [
    "verdict", "format", "posted_at", "age_days", "relative_score", "engagement_rate",
    "reach", "views", "likes", "comments", "saves", "shares", "reasons", "permalink", "caption",
]


def write_csv(scored: list[PostScore], path: Path) -> None:
    with path.open("w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(CSV_COLUMNS)
        for s in scored:
            w.writerow([
                s.verdict, s.format, s.posted_at.isoformat(), s.age_days,
                f"{s.relative_score:.2f}", f"{s.engagement_rate:.4f}", s.reach, s.views,
                s.likes, s.comments, s.saves, s.shares, "; ".join(s.reasons), s.permalink, s.caption,
            ])


def _row(s: PostScore) -> str:
    e = html.escape
    link = f'<a href="{e(s.permalink)}" target="_blank" rel="noopener">open</a>' if s.permalink else ""
    return (
        f'<tr class="{s.verdict}"><td><span class="tag {s.verdict}">{s.verdict}</span></td>'
        f"<td>{s.format}</td><td>{s.posted_at:%d %b %Y}</td>"
        f'<td class="n">{s.relative_score:.2f}×</td><td class="n">{s.engagement_rate:.1%}</td>'
        f'<td class="n">{s.reach:,}</td><td class="n">{s.saves}</td><td class="n">{s.shares}</td>'
        f"<td>{e('; '.join(s.reasons))}</td><td class=\"cap\">{e(s.caption)}</td><td>{link}</td></tr>"
    )


def write_html(account: dict, scored: list[PostScore], summary: dict, path: Path) -> None:
    c = summary["counts"]
    fmt_rows = "".join(
        f"<li><b>{f}</b> — median engagement {m:.1%} ({n} posts)</li>" for f, m, n in summary["formats"]
    )
    days = ", ".join(d for d, _, _ in summary["best_days"]) or "not enough data"
    hours = ", ".join(f"{h:02d}:00" for h, _, _ in summary["best_hours_utc"]) or "not enough data"
    flagged = [s for s in scored if s.verdict in (ARCHIVE, REVIEW)]
    rows = "".join(_row(s) for s in flagged) or '<tr><td colspan="11">Nothing flagged 🎉</td></tr>'
    top = "".join(_row(s) for s in summary["top_posts"])
    user = html.escape(str(account.get("username", "your account")))

    page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Instagram Audit</title>
<style>
:root{{--bg:#fafafa;--fg:#1b1b1f;--muted:#6b6b75;--card:#fff;--line:#e4e4ea;
--keep:#1f8a4c;--review:#b7791f;--archive:#c53030}}
@media (prefers-color-scheme:dark){{:root{{--bg:#111114;--fg:#ececf1;--muted:#9a9aa6;--card:#1b1b20;--line:#2c2c34;
--keep:#4ade80;--review:#fbbf24;--archive:#f87171}}}}
body{{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,sans-serif}}
main{{max-width:1200px;margin:auto;padding:24px 16px}}
.cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin:16px 0}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:14px}}
.card b{{display:block;font-size:28px}} .muted{{color:var(--muted)}}
.wrap{{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:10px}}
table{{border-collapse:collapse;width:100%;font-size:13px}}
th,td{{padding:8px 10px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}}
td.n{{text-align:right;font-variant-numeric:tabular-nums}} td.cap{{max-width:260px;color:var(--muted)}}
.tag{{font-weight:600;text-transform:uppercase;font-size:11px}}
.tag.keep{{color:var(--keep)}} .tag.review{{color:var(--review)}} .tag.archive{{color:var(--archive)}}
a{{color:inherit}}
</style></head><body><main>
<h1>Instagram audit — @{user}</h1>
<p class="muted">{summary['total']} posts analysed. Each post is compared with the median of its own format
(Reels vs Reels, carousels vs carousels). Posts younger than 14 days are never flagged.</p>
<div class="cards">
<div class="card"><span class="muted">Archive suggested</span><b style="color:var(--archive)">{c['archive']}</b></div>
<div class="card"><span class="muted">Review manually</span><b style="color:var(--review)">{c['review']}</b></div>
<div class="card"><span class="muted">Keep</span><b style="color:var(--keep)">{c['keep']}</b></div>
<div class="card"><span class="muted">Followers</span><b>{int(account.get('followers_count') or 0):,}</b></div>
</div>
<h2>What works</h2><ul>{fmt_rows}
<li><b>Best days:</b> {days}</li><li><b>Best hours (UTC):</b> {hours}</li></ul>
<h2>Archive &amp; review suggestions</h2>
<p class="muted">Instagram's API cannot archive posts — open each link and use ⋯ → Archive in the app.</p>
<div class="wrap"><table><thead><tr><th>Verdict</th><th>Format</th><th>Posted</th><th>vs typical</th>
<th>Eng. rate</th><th>Reach</th><th>Saves</th><th>Shares</th><th>Why</th><th>Caption</th><th></th></tr></thead>
<tbody>{rows}</tbody></table></div>
<h2>Top 5 posts — make more like these</h2>
<div class="wrap"><table><tbody>{top}</tbody></table></div>
</main></body></html>"""
    path.write_text(page, encoding="utf-8")
