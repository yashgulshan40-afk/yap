# yap. — YAP Digital Marketing Website

**Let the internet yap about your brand.**
Yeh YAP Digital Marketing Agency ki poori website hai. Theme logo se match karti hai: black background, white type aur ek gold dot.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About Us | `about.html` |
| Services | `services.html` |
| Portfolio | `portfolio.html` |
| Packages | `packages.html` |
| Clients | `clients.html` |
| Contact | `contact.html` |
| 404 | `404.html` |

Saath me ye bhi hain:

- Full-screen **Menu** jo har page se khulta hai.
- **WhatsApp chat widget**, jisme quick options hain aur message seedha WhatsApp me khulta hai.
- Har service aur package par **"Enquire on WhatsApp"** button.
- **Project brief form**, jo saari details bhar kar WhatsApp kholta hai.
- **Portfolio**: category filter aur popup ke saath. Photos aur videos dono chalte hain.
- **Packages**: Starter, Growth, Premium aur Custom. Price abhi nahi dikhta, uski jagah "Price on request" aata hai. Single services ki list bhi hai.
- **Clients**: chalte hue counters, industry ke hisaab se clients ki ginti, client logos aur testimonials.
- **SEO**: meta tags, Open Graph image, `sitemap.xml`, `robots.txt` aur schema.org data.
- Mobile, tablet aur desktop sab par theek dikhti hai.

## Content kaise badlein (sabse zaroori)

Saara text aur data **ek hi file** me hai: **`assets/js/config.js`**. Ise Notepad ya VS Code me kholo aur badlo:

| Kya badalna hai | config.js me kahan |
|---|---|
| Phone, WhatsApp, email, domain, social links | `site` |
| Home ki badi heading | `hero` |
| Services | `services` |
| Packages, aur baad me price | `packages.plans` → `price: "₹10,000", per: "/month"` |
| Single services ka price | `packages.addons` |
| Clients ke numbers | `stats` ⚠ abhi sample numbers hain |
| Industry ke hisaab se clients | `clientCategories` ⚠ sample |
| Client naam / logo | `clients` → logo `assets/clients/` me rakho |
| Testimonials | `testimonials` ⚠ sample hain, khaali `[]` karne par section hide ho jayega |
| FAQ, process, "Why YAP" | `faq`, `process`, `why` |

## Portfolio kaise add karein

**Tareeka 1 (aasaan): Python script se**

1. Apni photos ya videos category ke folder me daalo:
   ```
   assets/portfolio/social-media/
   assets/portfolio/reels/
   assets/portfolio/branding/
   assets/portfolio/design/
   assets/portfolio/websites/
   assets/portfolio/ads/
   ```
2. Ye command chalao:
   ```bash
   python3 tools/portfolio_builder.py
   ```
3. Bas. Portfolio apne aap update ho jayega. File ka naam hi title banta hai, jaise `brew-cafe-launch.jpg` ka title "Brew Cafe Launch" banega.
   Client ka naam, description, tags ya Instagram reel ka link daalna ho to image ke saath same naam ki `.json` file rakho. Example `tools/portfolio_builder.py` ke upar diya hai.

**Tareeka 2:** `config.js` ki `portfolio` list me haath se items add karo.

## Apne computer ya phone par chalana

```bash
python3 tools/serve.py
```
- Computer par: http://localhost:8000
- Phone par (same Wi-Fi): jo link terminal me print hoga, woh phone ke browser me kholo.

Ya seedha `index.html` par double-click kar do.

## Live kaise karein (free)

- **Netlify:** app.netlify.com/drop par poora folder drag-and-drop kar do.
- **GitHub Pages:** repo ki Settings → Pages me branch select karo.
- Domain (`yapdigitalmarketing.digital`) hosting ki settings me jodo. Domain alag ho to `config.js`, `sitemap.xml` aur `robots.txt` me badal dena.

## Folder structure

```
├── index.html, about.html, services.html, portfolio.html,
│   packages.html, clients.html, contact.html, 404.html
├── assets/
│   ├── css/style.css        ← design / theme
│   ├── js/config.js         ← ✏️ SAARA CONTENT YAHAN
│   ├── js/main.js           ← site engine (chhedne ki zaroorat nahi)
│   ├── js/portfolio-data.js ← portfolio_builder.py banata hai
│   ├── img/                 ← logo, favicon, share image
│   ├── portfolio/<category>/← apna kaam yahan daalo
│   └── clients/             ← client logos
├── tools/
│   ├── portfolio_builder.py ← portfolio auto-generate
│   └── serve.py             ← local preview server
├── sitemap.xml, robots.txt
```

Fonts: Poppins (logo jaisa), DM Sans aur Instrument Serif, teeno Google Fonts se.
Koi framework ya build step nahi hai: sirf HTML, CSS, JavaScript aur Python.
