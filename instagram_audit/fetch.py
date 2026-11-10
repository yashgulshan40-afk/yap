"""Fetch posts and per-post insights from the Instagram Graph API.

Works with either login flavour Meta offers:

* Instagram API with Instagram Login  -> host ``graph.instagram.com``, user id ``me``
* Instagram API with Facebook Login   -> host ``graph.facebook.com``, user id = IG business account id

Only the standard library is used so the tool runs anywhere without installs.
"""

from __future__ import annotations

import json
import urllib.error
import urllib.parse
import urllib.request

API_VERSION = "v23.0"

MEDIA_FIELDS = ",".join(
    [
        "id",
        "caption",
        "media_type",
        "media_product_type",
        "permalink",
        "timestamp",
        "like_count",
        "comments_count",
    ]
)

# Metrics we try to pull per post. Not every metric exists for every media
# type, so we fall back to asking for them one by one when a batch fails.
INSIGHT_METRICS = ["reach", "saved", "shares", "views", "total_interactions"]


class InstagramAPIError(RuntimeError):
    pass


class InstagramClient:
    def __init__(self, access_token: str, user_id: str = "me", host: str = "graph.instagram.com"):
        if not access_token:
            raise ValueError("An Instagram access token is required (set IG_ACCESS_TOKEN).")
        self.token = access_token
        self.user_id = user_id
        self.base = f"https://{host}/{API_VERSION}"

    # -- low level -------------------------------------------------------
    def _get(self, path_or_url: str, params: dict | None = None) -> dict:
        if path_or_url.startswith("http"):
            url = path_or_url  # pagination "next" links already carry the token
        else:
            query = dict(params or {})
            query["access_token"] = self.token
            url = f"{self.base}/{path_or_url}?{urllib.parse.urlencode(query)}"
        try:
            with urllib.request.urlopen(url, timeout=30) as resp:
                return json.load(resp)
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", "replace")
            try:
                message = json.loads(body).get("error", {}).get("message", body)
            except json.JSONDecodeError:
                message = body
            raise InstagramAPIError(f"HTTP {exc.code}: {message}") from None

    # -- public ----------------------------------------------------------
    def account(self) -> dict:
        return self._get(self.user_id, {"fields": "id,username,followers_count,media_count"})

    def media(self, limit: int | None = None) -> list[dict]:
        posts: list[dict] = []
        page = self._get(f"{self.user_id}/media", {"fields": MEDIA_FIELDS, "limit": 50})
        while True:
            posts.extend(page.get("data", []))
            if limit and len(posts) >= limit:
                return posts[:limit]
            nxt = page.get("paging", {}).get("next")
            if not nxt:
                return posts
            page = self._get(nxt)

    def insights(self, media_id: str) -> dict[str, int]:
        try:
            return self._parse(self._get(f"{media_id}/insights", {"metric": ",".join(INSIGHT_METRICS)}))
        except InstagramAPIError:
            pass
        # Batch failed (usually one unsupported metric) -> try each on its own.
        result: dict[str, int] = {}
        for metric in INSIGHT_METRICS:
            try:
                result.update(self._parse(self._get(f"{media_id}/insights", {"metric": metric})))
            except InstagramAPIError:
                continue
        return result

    @staticmethod
    def _parse(payload: dict) -> dict[str, int]:
        out = {}
        for item in payload.get("data", []):
            values = item.get("values") or [{}]
            value = item.get("total_value", {}).get("value", values[0].get("value", 0))
            out[item["name"]] = int(value or 0)
        return out

    def fetch_all(self, limit: int | None = None) -> tuple[dict, list[dict]]:
        account = self.account()
        posts = self.media(limit)
        for post in posts:
            post["insights"] = self.insights(post["id"])
        return account, posts
