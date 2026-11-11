# YAP Digital Marketing Agency website

The website of **YAP Digital Marketing Agency** (Instagram: [@yapdigitalmarketingagency](https://instagram.com/yapdigitalmarketingagency)), styled after the agency logo in `assets/yap-logo.png`: near-black, white Poppins, one gold dot.
Pure HTML, CSS and JavaScript: no build step and no dependencies.

## Features
- **20 services in 8 categories:** SEO, Social Media, Paid Ads, Content, Web, Branding, Email, Video
- Category filters, live search, billing filter (monthly / one-time) and sorting
- Service detail popup
- **Bundled packages** with the savings worked out automatically
- **Quote basket:** add services or packages and see monthly and one-time totals plus 18% GST
- Send the quote on **WhatsApp** or copy the quote text
- Contact form that prepares the enquiry as a WhatsApp message
- **Our work** section with real reels and graphics pulled from `portfolio/` (hidden automatically if that folder is missing)
- Client name ticker, Instagram section, mobile menu, FAQs and process
- The quote basket is saved in the browser (localStorage)

## Run it on a phone (easiest)
Use **`yap-catalog.html`**: it is one self-contained file with all the CSS and JS inside.
1. Download `yap-catalog.html` to your phone (GitHub → file → "Download raw file").
2. Open it with an HTML viewer app, or upload it to https://app.netlify.com/drop to get a free live link.

After changing `index.html`, `css/` or `js/`, rebuild the single file:
```bash
python3 tools/build_single.py
```

## Run it on a computer
Open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```
You can deploy it as-is to GitHub Pages, Netlify or Vercel.

## Customise
All content lives in **`js/data.js`**:
- `SERVICES`: name, price, billing (`"month"` or `"one-time"`), features, delivery time
- `PACKAGES`: bundles built from service IDs
- `CONTACT`: phone, WhatsApp number, email, Instagram handle and location

Brand colours (`--ink`, `--gold`) are CSS variables at the top of `css/styles.css`.

## Structure
```
index.html        Page markup
css/styles.css    Styles (light/dark, responsive, print)
js/data.js        Catalog data (edit this)
js/app.js         Filtering, quote basket, modal, theme, form
yap-catalog.html  Single-file build of all the above (for phones)
tools/build_single.py  Rebuilds yap-catalog.html
portfolio/        Yash Agarwal portfolio, 4 versions (see portfolio/README.md)
```
