# YAP Digital Marketing — Service Catalog

A responsive, interactive service catalog website for **YAP Digital Marketing**.
Pure HTML, CSS and JavaScript: no build step and no dependencies.

## Features
- **20 services in 8 categories:** SEO, Social Media, Paid Ads, Content, Web, Branding, Email, Video
- Category filters, live search, billing filter (monthly / one-time) and sorting
- Service detail popup
- **Bundled packages** with the savings worked out automatically
- **Quote basket:** add services or packages and see monthly and one-time totals plus 18% GST
- Send a quote on **WhatsApp** or **email**, or **print / save it as a PDF**
- Contact form (opens the visitor's email app with the details filled in)
- Dark / light mode, mobile menu, FAQs, process and testimonials sections
- The basket and theme are saved in the browser (localStorage)

## Run it
Open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```
You can deploy it as-is to GitHub Pages, Netlify or Vercel.

## Customise
All content lives in **`js/data.js`**:
- `SERVICES`: name, price, billing (`"month"` or `"one-time"`), features, delivery time
- `PACKAGES`: bundles built from service IDs
- `CONTACT`: phone, WhatsApp number, email and address (**replace the placeholders**)
- `TESTIMONIALS`: **samples only**, so replace them with real client reviews before going live

Colours are CSS variables at the top of `css/styles.css`.

## Structure
```
index.html        Page markup
css/styles.css    Styles (light/dark, responsive, print)
js/data.js        Catalog data (edit this)
js/app.js         Filtering, quote basket, modal, theme, form
```
