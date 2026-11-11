# Yash Agarwal Portfolio: 4 versions

All the content from `Yash_Agarwal_Portfolio_Updated_7_2.html` (16 clients, 110 videos,
77 reel covers, 232 photos & graphics, profile, stats and contact details), rebuilt as
four different websites that share one data file.

| File | Version | Built with |
|---|---|---|
| `index.html` | Start page linking all four | HTML/CSS |
| `cinematic.html` | **Cinematic Showreel**: dark, video-first, looping hero, 9:16 reel strip, client "scenes" | HTML, CSS, vanilla JS |
| `editorial.html` | **Editorial Journal**: menu-style index, magazine case studies, light & dark | HTML, CSS Grid |
| `react.html` | **Media Library App**: search, filter by type / industry / client, viewer with WhatsApp button | React 18 + htm (no build) |
| `catalog.html` | **Services Catalog**: 10 services with real samples, client wall, WhatsApp enquiry basket | Tailwind CSS + JS |

## Run it
- **Computer:** open `index.html` in Chrome/Edge/Firefox. Everything is local; only the fonts need internet.
- **Phone:** the whole `portfolio/` folder must stay together. The easiest way is to upload the
  folder to https://app.netlify.com/drop (free) and open the link it gives you.

## Edit content
- **Text, captions, contact:** `data.js` (`profile`, `categories`, `projects`).
- **Photos / videos:** `assets/img/` and `assets/vid/` (file names are referenced from `data.js`).
- **Services & prices (catalog):** the `SERVICES` list at the top of `catalog.js`.
  Set `price: "₹X,XXX"` on a service to show a price instead of "Price on request".
- **Catalog styles:** edit `tailwind/input.css` or classes in `catalog.html`, then run `tailwind/build.sh`.

## Files
```
data.js        all content (generated from the original portfolio)
core.js        shared helpers: projects, counts, contact links, lightbox viewer
react-app.js   React components for react.html
catalog.js     services catalog + enquiry basket
catalog.css    compiled Tailwind CSS
vendor/        React 18.3.1, ReactDOM, htm 3.1.1 (offline copies, with licences)
tailwind/      Tailwind source + build script
assets/        419 images and 110 videos extracted from the original file
```
