# yap
Marketing agency

## Instagram Audit

Connects to an Instagram account, analyses every post automatically, and suggests
which weak posts to **archive** (plus which ones are worth a manual review).

### Kya karta hai (what it does)

1. Pulls all posts plus their insights (reach, likes, comments, saves, shares, views)
   from the official Instagram Graph API.
2. Works out each post's **engagement rate** = (likes + comments + saves + shares) / reach.
3. Compares each post only with **its own format** (Reels with Reels, carousels with carousels,
   images with images), so Reels don't make photos look bad.
4. Gives each post a verdict:
   - **archive**: engagement under 50% of your typical post *and* low reach or zero saves/shares
   - **review**: a bit below typical, worth a look
   - **keep**: everything else. Posts younger than 14 days are always kept, because they are still collecting reach.
5. Also reports what's working: best format, best posting days and hours, and your top 5 posts.

Output goes to `reports/`: `audit.html` (a page you can open in the browser), `audit.csv`
(opens in Excel or Google Sheets) and `raw.json`.

> ⚠️ Instagram's API **does not allow archiving posts programmatically**. The tool only
> *suggests* posts. Open each link from the report and use **⋯ → Archive** in the app.

### Try it without an account

```bash
python3 -m instagram_audit --demo
```

### Connect your Instagram page

Requirements: the Instagram account must be a **Business** or **Creator** account
(Settings → Account type and tools → Switch to professional account).

1. Go to https://developers.facebook.com/apps, then **Create App** and pick the *Business* type.
2. Add the **Instagram** product, then choose **API setup with Instagram login**.
3. Under *Generate access tokens*, add your Instagram account and generate a token.
   Required permissions: `instagram_business_basic` and `instagram_business_manage_insights`.
4. Run:

```bash
export IG_ACCESS_TOKEN="paste-token-here"
python3 -m instagram_audit
```

Then open `reports/audit.html`.

**Using Facebook Login instead** (the IG account is linked to a Facebook Page): get a token with
`instagram_basic`, `instagram_manage_insights` and `pages_read_engagement`, then also set:

```bash
export IG_API_HOST=graph.facebook.com
export IG_USER_ID=<your instagram business account id>
```

Never commit your token. Keep it in an environment variable.

### Options

| Flag | Default | Meaning |
|---|---|---|
| `--limit N` | all | analyse only the N most recent posts |
| `--min-age D` | 14 | never flag posts younger than D days |
| `--archive-ratio R` | 0.5 | stricter (lower) or looser (higher) archive threshold |
| `--out DIR` | `reports` | output folder |

### Run automatically (weekly)

Add a cron job, e.g. every Monday at 9am:

```
0 9 * * 1  cd /path/to/yap && IG_ACCESS_TOKEN=... python3 -m instagram_audit
```

Long-lived tokens expire after 60 days. Refresh them with
`GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=...`.

### Tests

```bash
python3 -m unittest
```

No third-party packages needed. Python 3.10+.
