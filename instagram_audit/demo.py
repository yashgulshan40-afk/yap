"""Synthetic account data so the tool can be tried without an access token."""

from __future__ import annotations

import random
from datetime import datetime, timedelta, timezone


def demo_data(n: int = 60, seed: int = 7) -> tuple[dict, list[dict]]:
    rng = random.Random(seed)
    now = datetime.now(timezone.utc)
    account = {"id": "demo", "username": "demo_brand", "followers_count": 12500, "media_count": n}
    kinds = [("VIDEO", "REELS", 1.4), ("CAROUSEL_ALBUM", "FEED", 1.1), ("IMAGE", "FEED", 0.8)]
    posts = []
    for i in range(n):
        media_type, product, boost = rng.choice(kinds)
        quality = rng.lognormvariate(0, 0.6) * boost
        reach = int(3000 * quality * rng.uniform(0.7, 1.3))
        ts = now - timedelta(days=i * 3 + rng.randint(0, 2), hours=rng.randint(0, 23))
        posts.append({
            "id": f"demo_{i}",
            "caption": f"Demo post #{i}",
            "media_type": media_type,
            "media_product_type": product,
            "permalink": "",
            "timestamp": ts.strftime("%Y-%m-%dT%H:%M:%S+0000"),
            "like_count": int(reach * 0.04 * quality),
            "comments_count": int(reach * 0.003 * quality),
            "insights": {
                "reach": reach,
                "saved": int(reach * 0.006 * quality * rng.random() * 2),
                "shares": int(reach * 0.004 * quality * rng.random() * 2),
                "views": int(reach * 1.6),
            },
        })
    return account, posts
