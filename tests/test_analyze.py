import unittest
from datetime import datetime, timedelta, timezone

from instagram_audit.analyze import ARCHIVE, KEEP, REVIEW, score_posts, summarize
from instagram_audit.demo import demo_data

NOW = datetime(2026, 11, 10, tzinfo=timezone.utc)


def post(i, days_ago, likes, reach, saves=5, shares=5, media_type="IMAGE"):
    ts = (NOW - timedelta(days=days_ago)).strftime("%Y-%m-%dT%H:%M:%S+0000")
    return {"id": str(i), "media_type": media_type, "timestamp": ts, "like_count": likes,
            "comments_count": 0, "insights": {"reach": reach, "saved": saves, "shares": shares}}


class AnalyzeTest(unittest.TestCase):
    def test_weak_old_post_is_archive_candidate(self):
        posts = [post(i, 30 + i, 100, 1000) for i in range(5)]
        posts.append(post("bad", 40, 5, 300, saves=0, shares=0))
        scored = {s.id: s for s in score_posts({"followers_count": 1000}, posts, now=NOW)}
        self.assertEqual(scored["bad"].verdict, ARCHIVE)
        self.assertEqual(scored["0"].verdict, KEEP)

    def test_recent_posts_never_flagged(self):
        posts = [post(i, 30 + i, 100, 1000) for i in range(5)]
        posts.append(post("new", 2, 1, 100, saves=0, shares=0))
        scored = {s.id: s for s in score_posts({"followers_count": 1000}, posts, now=NOW)}
        self.assertEqual(scored["new"].verdict, KEEP)

    def test_formats_benchmarked_separately(self):
        reels = [post(f"r{i}", 30 + i, 300, 1000, media_type="VIDEO") for i in range(4)]
        images = [post(f"i{i}", 30 + i, 60, 1000) for i in range(4)]
        scored = score_posts({"followers_count": 1000}, reels + images, now=NOW)
        self.assertTrue(all(s.verdict == KEEP for s in scored))

    def test_demo_runs(self):
        account, posts = demo_data()
        scored = score_posts(account, posts)
        summary = summarize(scored)
        self.assertEqual(summary["total"], len(posts))
        self.assertTrue(any(s.verdict in (ARCHIVE, REVIEW) for s in scored))


if __name__ == "__main__":
    unittest.main()
