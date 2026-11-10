"""Command line entry point:  python -m instagram_audit [--demo]"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

from .analyze import ARCHIVE, Rules, score_posts, summarize
from .report import write_csv, write_html


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Analyse an Instagram account and suggest posts to archive.")
    ap.add_argument("--demo", action="store_true", help="use synthetic data, no token needed")
    ap.add_argument("--limit", type=int, help="only analyse the N most recent posts")
    ap.add_argument("--out", default="reports", help="output folder (default: reports)")
    ap.add_argument("--min-age", type=int, default=14, help="never flag posts younger than N days")
    ap.add_argument("--archive-ratio", type=float, default=0.5,
                    help="flag when engagement < this fraction of format median (default 0.5)")
    args = ap.parse_args(argv)

    if args.demo:
        from .demo import demo_data
        account, posts = demo_data()
    else:
        from .fetch import InstagramAPIError, InstagramClient
        try:
            client = InstagramClient(
                access_token=os.environ.get("IG_ACCESS_TOKEN", ""),
                user_id=os.environ.get("IG_USER_ID", "me"),
                host=os.environ.get("IG_API_HOST", "graph.instagram.com"),
            )
            account, posts = client.fetch_all(args.limit)
        except (ValueError, InstagramAPIError) as exc:
            print(f"error: {exc}", file=sys.stderr)
            return 1

    rules = Rules(min_age_days=args.min_age, archive_ratio=args.archive_ratio)
    scored = score_posts(account, posts, rules)
    summary = summarize(scored)

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    (out / "raw.json").write_text(json.dumps({"account": account, "posts": posts}, indent=2))
    write_csv(scored, out / "audit.csv")
    write_html(account, scored, summary, out / "audit.html")

    c = summary["counts"]
    print(f"@{account.get('username')}: {summary['total']} posts — "
          f"{c['archive']} archive, {c['review']} review, {c['keep']} keep")
    for s in [s for s in scored if s.verdict == ARCHIVE][:10]:
        print(f"  ARCHIVE {s.posted_at:%Y-%m-%d} {s.format:<8} {s.relative_score:.2f}x  "
              f"{'; '.join(s.reasons)}  {s.permalink}")
    print(f"Reports written to {out}/audit.html and {out}/audit.csv")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
