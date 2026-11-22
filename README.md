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
| Pricing (rate list, monthly plans, T&C) | `packages.html` |
| Media (hamare Agra pages + promotion packages) | `media.html` |
| Clients | `clients.html` |
| Contact | `contact.html` |
| 404 | `404.html` |

Saath me ye bhi hain:

- Full-screen **Menu** jo har page se khulta hai.
- **WhatsApp chat widget**, jisme quick options hain aur message seedha WhatsApp me khulta hai.
- Har service aur package par **"Enquire on WhatsApp"** button.
- **Project brief form**, jo saari details bhar kar WhatsApp kholta hai.
- **Portfolio**: category filter aur popup ke saath. Photos aur videos dono chalte hain.
- **Pricing**: Basic aur Premium monthly plans, single services ke charges, production charges, complimentary services, USP aur T&C. Saare price PDF se liye gaye hain.
- **Media**: Agra Outlook, Agra People, Agra Lifestyles, Agra Wale aur Yash the Explorer, saath me story, reel, collab, sponsorship aur subscription ke packages.
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
| Monthly plans aur unke price | `pricing.monthly` |
| Single services ke charges | `pricing.charges` |
| Shoot / production charges | `pricing.production` |
| Free (complimentary) services | `pricing.complimentary` |
| Media pages aur promotion packages | `mediaPages`, `promotions` |
| USP aur T&C | `usp`, `terms` |
| Sab price chhupane hain | `showPrices: false` |
| Clients ke numbers | `stats` |
| Industry ke hisaab se clients | `clientCategories` |
| Client naam / logo | `clients` → logo `assets/clients/` me rakho |
| Testimonials | `testimonials` ⚠ sample hain, khaali `[]` karne par section hide ho jayega |
| FAQ, process, "Why YAP" | `faq`, `process`, `why` |

## Portfolio kaise add karein

Abhi portfolio me **57 projects** hain (24 graphic design, 17 reels/videos, 16 photography). Ye aapki purani portfolio file se liye gaye hain.

**Naya kaam add karna (Python script se):**

1. Photo ya video ko sahi folder me daalo:
   ```
   assets/portfolio/graphic-design/
   assets/portfolio/reels/          ← video (.mp4) + same naam ki cover photo (.jpg)
   assets/portfolio/photography/
   assets/portfolio/branding/
   assets/portfolio/websites/
   ```
2. Details ke liye same naam ki `.json` file banao (optional):
   ```json
   { "title": "Diwali Offer", "client": "Fakira Rooftop Lounge & Bar", "tags": ["Nightlife & Bar"], "featured": 1 }
   ```
   `"featured"` wale projects apni category me sabse upar dikhte hain.
3. Ye command chalao:
   ```bash
   python3 tools/portfolio_builder.py
   ```

Hataana ho to us project ki files folder se delete karke script dobara chalao.

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
- Domain (`yapdigitalmarketing.com`) hosting ki settings me jodo. Domain alag ho to `config.js`, `sitemap.xml` aur `robots.txt` me badal dena.

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
