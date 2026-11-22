/* =====================================================================
   YAP. DIGITAL MARKETING — SITE CONFIG
   ---------------------------------------------------------------------
   Website ka saara content isi file se badalta hai:
   text, services, rates, packages, promotions, clients, portfolio.
   HTML ko haath lagane ki zaroorat nahi.
   Price likhne ka format: "₹1,000"   ·   price chhupana ho to showPrices: false
   ===================================================================== */

window.YAP = {

  /* ---------- 1. BASIC INFO ---------- */
  site: {
    name: "YAP Digital Marketing",
    short: "yap",
    tagline: "One click at a time",
    promise: "Your business, our commitment. Together we grow.",
    domain: "yapdigitalmarketing.com",
    founder: "Yash Agarwal",
    phone: "+91 821 811 6706",                      // dikhne wala number
    whatsapp: "918218116706",                       // country code ke saath, bina + aur space ke
    email: "yapdigitalmarketing@gmail.com",         // khaali = hide
    location: "Agra, India · Serving clients everywhere",
    hours: "Mon – Sat · 10:00 AM – 8:00 PM",
    whatsappGreeting: "Hi YAP! I found you on your website and want to grow my brand.",
    social: {                                       // khaali = icon hide
      instagram: "https://instagram.com/yap_digital_marketing",
      linkedin: "",
      youtube: "",
      facebook: "",
      x: ""
    }
  },

  /* Website par price dikhane hain? false = har jagah "Ask price" dikhega */
  showPrices: true,

  /* ---------- 2. HOME HERO ---------- */
  hero: {
    eyebrow: "Digital Marketing Agency · One click at a time",
    rotating: ["brand", "reels", "café", "hotel", "business"],
    sub: "Branding, content, reels, ads, websites and city-page promotion for brands that want people talking — and buying."
  },

  /* ---------- 3. SERVICES ----------
     icon: social, megaphone, reels, design, brand, video, camera, vlog, web, ads, google, seo,
           influencer, city, qr, hashtag, mockup, thumbnail, magazine, content, analytics
     group: Marketing · Creative · Production · Tech  (services page par filter) */
  services: [
    { icon: "social", group: "Marketing", title: "Social Media Management",
      short: "Your Instagram and Facebook handled end to end: planning, posting, captions and community.",
      points: ["Monthly content calendar", "Posting & captions", "Insights improvement", "Monthly report"] },
    { icon: "megaphone", group: "Marketing", title: "Social Media Marketing",
      short: "Growth-focused marketing with ad promotions, lead generation and offer strategy.",
      points: ["Ad promotions & management", "Lead generation", "Competitive & SWOT analysis", "Offer recommendations"] },
    { icon: "brand", group: "Creative", title: "Branding & Logo Design",
      short: "Logos, colours and a brand identity people remember — on screen and in print.",
      points: ["Logo design", "Brand identity", "Brand mockups", "Print-ready files"] },
    { icon: "camera", group: "Production", title: "Content Creation",
      short: "We plan and shoot marketing content at your venue: reels, offers, food, ambience and people.",
      points: ["On-site shoots", "Offer & promo videos", "Ambience & food content", "Event coverage"] },
    { icon: "reels", group: "Production", title: "Reels & Short Videos",
      short: "Hook-first reels made to stop the scroll and bring people to your door.",
      points: ["Hook & script ideas", "Trending audio", "Captions & effects", "Fast-cut editing"] },
    { icon: "vlog", group: "Production", title: "Vlog & Marketing",
      short: "Vlog-style coverage of your café, hotel or store, promoted on our own Agra pages.",
      points: ["Vlog coverage", "Creator-style storytelling", "Promotion on our pages", "Free vlog promo on monthly plans"] },
    { icon: "video", group: "Creative", title: "Video Editing",
      short: "Clean, fast edits with captions, music and motion for reels, ads and YouTube.",
      points: ["Reel & ad edits", "Captions & subtitles", "Colour & sound polish", "3 free revisions"] },
    { icon: "camera", group: "Production", title: "Product & Food Photography",
      short: "Menu, product and lifestyle photos that make people hungry or curious.",
      points: ["Food & beverage shoots", "Product photography", "Interior & venue photos", "Edited, ready-to-post files"] },
    { icon: "design", group: "Creative", title: "Graphic Design",
      short: "Posts, offers, festive creatives, menus, standees and billboards.",
      points: ["Social media posts", "Offer & festive creatives", "Menu design", "Billboards & print"] },
    { icon: "ads", group: "Marketing", title: "Meta Ads (Facebook & Instagram)",
      short: "Targeted Facebook and Instagram ads that bring footfall, calls and leads.",
      points: ["Campaign setup", "Local audience targeting", "Ad creatives", "Cost-per-result tracking"] },
    { icon: "google", group: "Marketing", title: "Google Ads",
      short: "Show up when people in your city search for what you sell.",
      points: ["Search campaigns", "Keyword research", "Call & direction ads", "Budget optimisation"] },
    { icon: "seo", group: "Marketing", title: "SEO & Social Media Optimisation",
      short: "Rank on Google and optimise your profiles so customers find you first.",
      points: ["Google Business Profile", "Keyword research", "Profile optimisation", "Reviews increase"] },
    { icon: "influencer", group: "Marketing", title: "Influencer & Model Marketing",
      short: "Local influencers and models who make your brand look good and get it talked about.",
      points: ["Influencer shortlisting", "Model shoots", "Collab planning", "Review reels"] },
    { icon: "city", group: "Marketing", title: "City Page Marketing",
      short: "Promotion on Agra's popular Instagram pages — Agra Outlook, Agra People, Agra Lifestyles and more.",
      points: ["Story & reel promotions", "Page collaborations", "Sponsorships", "Monthly subscriptions"] },
    { icon: "hashtag", group: "Marketing", title: "Hashtag & Keyword Research",
      short: "The right hashtags and keywords so your posts reach the right people.",
      points: ["Hashtag sets", "Keyword research", "Trend analysis", "Competitor research"] },
    { icon: "web", group: "Tech", title: "Website Design",
      short: "Fast, mobile-first websites with WhatsApp enquiries built in.",
      points: ["Business websites", "Landing pages", "WhatsApp & lead forms", "50% off design with monthly handling"] },
    { icon: "qr", group: "Tech", title: "Digital QR Menu & QR Services",
      short: "Contactless QR menus and all-in-one QR codes for your links, reviews and payments.",
      points: ["Digital QR menu", "All-in-one QR", "Review & Instagram QR", "Free with services above ₹3,000"] },
    { icon: "mockup", group: "Creative", title: "Mockup Design",
      short: "Realistic mockups of your brand on cups, bags, tees, signboards and packaging.",
      points: ["Merchandise mockups", "Packaging mockups", "Signage mockups", "Presentation-ready"] },
    { icon: "thumbnail", group: "Creative", title: "YouTube Thumbnails",
      short: "Bold, clickable thumbnails that lift your YouTube click-through rate.",
      points: ["Click-worthy layouts", "Face cut-outs & effects", "Channel style kit", "Bulk packs"] },
    { icon: "magazine", group: "Creative", title: "Magazine & PDF Design",
      short: "Magazines, brochures, company profiles and PDF documents laid out beautifully.",
      points: ["Magazine covers & pages", "Brochures & catalogues", "PDF documentary", "Print-ready export"] }
  ],

  /* ---------- 4. PRICING ---------- */
  pricing: {
    intro: "Clear, honest prices. No GST on our services and 3 free changes on every job.",

    /* Monthly plans: features + prices */
    monthly: [
      { name: "Basic", badge: "",
        for: "Everything a growing business needs to show up and grow every month.",
        features: ["Social Media Management", "Social Media Marketing", "Graphic Designs", "Video Editing", "Content Coverage",
                   "QR Service", "Ad Promotions", "Ads Management", "Insights Improvement", "Lead Generation",
                   "Competitive Analysis", "Hashtag Research", "Keyword Research", "SWOT Analysis", "Trend Analysis",
                   "Influencer Marketing", "City Page Marketing", "Offer Recommendation"],
        prices: [
          { service: "Social Media Management", rows: [["1 month", "₹8,000"], ["3 months", "₹21,000"]] },
          { service: "Social Media Marketing",  rows: [["1 month", "₹12,000"], ["3 months", "₹30,000"]] }
        ] },
      { name: "Premium", badge: "Best value", featured: true,
        for: "All of Basic, plus the extras that get you guaranteed growth.",
        features: ["All Basic services", "Free Ads", "Free Printing", "Free Influencer", "Reviews Increase", "Guaranteed Growth",
                   "Social Media Optimisation", "20 Content Guarantee", "Special Card", "1 Free Event Coverage", "Regular Consultant Service"],
        prices: [
          { service: "Social Media Management", rows: [["1st month", "₹10,000", "then ₹8,000/month"], ["3 months", "₹24,000"]] },
          { service: "Social Media Marketing",  rows: [["1st month", "₹15,000", "then ₹12,000/month"], ["3 months", "₹36,000"]] }
        ] }
    ],
    monthlyNote: "Full payment for the first month. For 3-month plans, pay 50% in advance.",

    /* Single services (rate card) */
    charges: [
      { name: "Graphic Design",   rows: [["1 graphic", "₹200"], ["10 graphics", "₹1,000"]] },
      { name: "Video Editing",    rows: [["1 video", "₹500"], ["4 videos", "₹1,000"]], note: "Videos under 50 seconds" },
      { name: "Logo Design",      rows: [["Logo design", "₹500"]] },
      { name: "Thumbnail Design", rows: [["1 thumbnail", "₹300"], ["5 thumbnails", "₹1,000"]] },
      { name: "QR Service",       rows: [["1 QR", "₹500"], ["All-in-one QR", "₹800"]] },
      { name: "Menu Design",      rows: [["Service charge", "₹2,000"]] },
      { name: "Mockup Design",    rows: [["Per design", "₹500"]] },
      { name: "Magazine Design",  rows: [["Cover page", "₹500"], ["Content page", "₹250"]] },
      { name: "PDF Documentary",  rows: [["Service charge", "₹500"], ["Per page", "₹100"]] },
      { name: "Website Design",   rows: [["Design", "As per requirement"], ["Monthly handling", "₹5,000/month"]], note: "Take design + handling together and get 50% off the design" }
    ],

    /* Shoot / production */
    production: [
      { name: "Content Creation",           rows: [["1 video", "₹500"], ["7 videos", "₹2,500"], ["10 videos", "₹3,000"]] },
      { name: "Marketing Content Creation", rows: [["2 videos", "₹1,000"], ["7 videos", "₹3,000"], ["10 videos", "₹4,000"]] },
      { name: "Vlog Coverage",              rows: [["1 video", "₹1,200"], ["7 videos", "₹6,000"], ["10 videos", "₹8,000"]] },
      { name: "Product / Food Photography", rows: [["10 photos", "₹800"], ["20 photos", "₹1,000"], ["50 photos", "₹2,000"]] }
    ],

    /* Free extras — pick any 1 with a paid service */
    complimentary: [
      { title: "Insta Story", text: "Below ₹1,000: your story on @yash_the_explorer_. Above ₹1,000: on @agraoutlook." },
      { title: "Graphic Design", text: "1 free graphic on any service above ₹1,200." },
      { title: "QR Service", text: "Free QR service on any service above ₹3,000." },
      { title: "Video Editing", text: "Take any 2 services and get 1 free video edit (under 40 seconds)." },
      { title: "Vlog Service", text: "Free vlog promotion with any monthly package." },
      { title: "Marketing Content", text: "Unlimited marketing videos free with our Social Media Management & Marketing monthly package." }
    ],
    complimentaryNote: "Complimentary services come only with a paid service. Choose any one."
  },

  /* ---------- 5. MEDIA PAGES (our brands) + PROMOTION PACKAGES ---------- */
  mediaPages: [
    { key: "agra-outlook", name: "Agra Outlook", handle: "@agraoutlook", logo: "assets/media/agra-outlook.png", link: "https://instagram.com/agraoutlook",
      text: "Agra's city page for food, places, offers and what's happening around town." },
    { key: "yash", name: "Yash the Explorer", handle: "@yash_the_explorer_", logo: "assets/media/yash-the-explorer.png", link: "https://instagram.com/yash_the_explorer_",
      text: "Our founder's creator page — food, cafés and travel stories from Agra." },
    { key: "agra-people", name: "Agra People", handle: "", logo: "assets/media/agra-people.png", link: "",
      text: "Faces, stories and local businesses of Agra." },
    { key: "agra-lifestyle", name: "Agra Lifestyles", handle: "", logo: "assets/media/agra-lifestyles.png", link: "",
      text: "Taj City ke Taj log — lifestyle, fashion and nightlife in Agra." },
    { key: "agra-wale", name: "Agra Wale", handle: "", logo: "", link: "",
      text: "Local updates and offers for people of Agra." },
    { key: "yap-branding", name: "YAP Branding", handle: "", logo: "assets/media/yap-branding.png", link: "",
      text: "Our branding studio page — logos, identities and design work." }
  ],
  promotions: [
    { type: "Instagram Story", rows: [
        { page: "yash",        prices: [["1 story", "₹150"], ["7 stories", "₹700"], ["Whole month", "₹2,000"]] },
        { page: "agra-outlook", prices: [["1 story", "₹200"], ["7 stories", "₹1,000"], ["Whole month", "₹3,000"]] },
        { page: "agra-people",  prices: [["1 story", "₹100"], ["7 stories", "₹500"], ["Whole month", "₹1,000"]] } ] },
    { type: "Instagram Reel", rows: [
        { page: "yash",        prices: [["1 reel", "₹1,200"], ["3 reels", "₹3,000"], ["10 reels", "₹7,500"]] },
        { page: "agra-outlook", prices: [["1 reel", "₹2,000"], ["3 reels", "₹4,500"], ["10 reels", "₹10,000"]] },
        { page: "agra-people",  prices: [["1 reel", "₹800"], ["3 reels", "₹2,000"], ["10 reels", "₹6,000"]] } ] },
    { type: "Page Collaboration", rows: [
        { page: "agra-outlook",   prices: [["1 collab", "₹800"], ["3 collabs", "₹2,000"], ["5 collabs", "₹2,500"]] },
        { page: "agra-people",    prices: [["1 collab", "₹400"], ["3 collabs", "₹1,000"], ["5 collabs", "₹1,500"]] },
        { page: "agra-lifestyle", prices: [["1 collab", "₹400"], ["3 collabs", "₹1,000"], ["5 collabs", "₹1,500"]] },
        { page: "agra-wale",      prices: [["1 collab", "₹600"], ["3 collabs", "₹1,500"], ["5 collabs", "₹2,200"]] } ] },
    { type: "Sponsorship", rows: [
        { page: "agra-outlook", prices: [["One time", "₹1,000"], ["Every graphic", "₹3,000/month"], ["Every reel", "₹8,000/month"], ["Lifetime", "₹20,000"]] },
        { page: "agra-people",  prices: [["One time", "₹500"], ["Every graphic", "₹1,000/month"], ["Every reel", "₹3,000/month"], ["Lifetime", "₹10,000"]] } ] },
    { type: "Subscription", note: "Offer videos only · max 15 per month", rows: [
        { page: "agra-people", prices: [["1 month", "₹2,000"], ["2 months", "₹3,000"], ["3 months", "₹4,000"], ["6 months", "₹6,000"], ["1 year", "₹10,000"]] } ] }
  ],

  /* ---------- 6. USP + TERMS ---------- */
  usp: [
    { title: "3 free changes", text: "No extra charges for up to 3 rounds of changes on any work." },
    { title: "Free extras", text: "A complimentary service with every paid service you take." },
    { title: "Free consulting", text: "Talk to us about your marketing any time — no charge for advice." },
    { title: "No GST", text: "No GST charges on any of our services. The price you see is the price you pay." }
  ],
  terms: [
    "70% advance payment to start any work.",
    "Monthly plans: full payment for the first month; 50% advance for 3-month plans.",
    "Complimentary services apply only with a paid service.",
    "Up to 3 changes are free on every job.",
    "Please cooperate with us (timely approvals, content access) for the best results.",
    "We deal directly with you — no middleman is involved in our dealings."
  ],

  /* ---------- 7. CLIENTS ---------- */
  stats: [
    { value: 19,  suffix: "+", label: "Brands served" },
    { value: 108, suffix: "+", label: "Reels delivered" },
    { value: 5,   suffix: "", label: "Own Agra media pages" },
    { value: 2.5, suffix: " yrs", label: "Shooting & editing for brands" }
  ],
  clientCategories: [
    { name: "Restaurants, Cafés & Nightlife", count: 9 },
    { name: "Hotels & Hospitality",          count: 3 },
    { name: "Health & Fitness",              count: 2 },
    { name: "Retail & Products",             count: 2 },
    { name: "Education & Arts",              count: 2 },
    { name: "Finance & Investing",           count: 1 }
  ],
  /* logo: assets/clients/<file>.png  (khaali = naam dikhega) */
  clients: [
    { name: "Barista Coffee",              logo: "assets/clients/barista.png",        category: "Café" },
    { name: "London Coffee",               logo: "assets/clients/london-coffee.png",  category: "Café" },
    { name: "Fakira Club · Lounge · Bar",   logo: "assets/clients/fakira.png",         category: "Rooftop Lounge" },
    { name: "Heer Ranjha Restaurant",      logo: "assets/clients/heer-ranjha.png",    category: "Restaurant & Café" },
    { name: "The Workout Zone",            logo: "assets/clients/workout-zone.png",   category: "Gym & Fitness" },
    { name: "ऐरापआ Rooftop & Lounge",       logo: "assets/clients/rooftop-lounge.png", category: "Rooftop Lounge" },
    { name: "Magical Market",              logo: "assets/clients/magical-market.png", category: "By CA Lalit Shah" },
    { name: "Heartbeat Musicals & Classes", logo: "assets/clients/heartbeat.png",      category: "Music Academy" },
    { name: "Kangra Traders",              logo: "assets/clients/kangra-traders.png", category: "Sanitary Ware" },
    { name: "Wheat Crust",                 logo: "assets/clients/wheat-crust.png",    category: "Momos · Pizza · Pasta" },
    { name: "Pizza Workshop Agra",         logo: "", category: "Café" },
    { name: "Momo Cult",                   logo: "", category: "Café" },
    { name: "Brij Bhog",                   logo: "", category: "Sweet Shop" },
    { name: "Clarks Inn Suites",           logo: "", category: "Hotel" },
    { name: "Bhawna Clarks Inn",           logo: "", category: "Hotel" },
    { name: "Hotel Taj Heights",           logo: "", category: "Hotel" },
    { name: "Fat to Fit (Herbalife)",      logo: "", category: "Wellness" },
    { name: "Navcci Perfume",              logo: "", category: "Perfume" },
    { name: "Melon Seeds Preschool",       logo: "", category: "Preschool" }
  ],
  /* Testimonials — asli quotes daalo; khaali [] = section hide */
  testimonials: [
    { quote: "Replace this with a real line from a happy client — what changed after working with YAP.", name: "Client name", role: "Owner, Brand name" },
    { quote: "Short, specific testimonials work best: a number, a result, a feeling.", name: "Client name", role: "Founder, Brand name" }
  ],

  /* ---------- 8. PORTFOLIO ----------
     Do tareeke:
     (a) Yahan haath se items add karo, ya
     (b) Photos/videos assets/portfolio/<category>/ me daalo aur
         `python3 tools/portfolio_builder.py` chalao — yeh assets/js/portfolio-data.js bana dega
         aur woh items yahan wale items ki jagah apne aap use honge.
     Fields: title, client, category, image, clip (apni mp4 file), video (YouTube/Instagram link), link, desc, tags
     NOTE: abhi assets/js/portfolio-data.js (57 projects) use ho raha hai, isliye neeche wali list sirf backup hai. */
  portfolioCategories: ["Graphic Design", "Reels & Videos", "Photography", "Branding", "Websites"],
  portfolio: [
    { title: "Your project title", client: "Client name", category: "Social Media", image: "", desc: "One line about the brief and the result.", tags: ["Instagram", "Content"] },
    { title: "Reel campaign", client: "Client name", category: "Reels", image: "", desc: "Add views, followers or sales numbers here.", tags: ["Reels", "Editing"] },
    { title: "Brand identity", client: "Client name", category: "Branding", image: "", desc: "Logo, colours and brand guidelines.", tags: ["Logo", "Identity"] },
    { title: "Ad creatives", client: "Client name", category: "Ads", image: "", desc: "Meta ad creatives and campaign result.", tags: ["Meta Ads"] },
    { title: "Business website", client: "Client name", category: "Websites", image: "", desc: "Fast, mobile-first website with WhatsApp leads.", tags: ["Web"] },
    { title: "Festive post series", client: "Client name", category: "Design", image: "", desc: "Festive and offer creatives.", tags: ["Design"] }
  ],

  /* ---------- 9. PROCESS ---------- */
  process: [
    { title: "Consult", text: "A free consulting call to understand your business, audience and goals." },
    { title: "Plan", text: "Platforms, content ideas, offers and a clear monthly calendar." },
    { title: "Create", text: "We shoot, design and edit — with up to 3 free changes before anything goes live." },
    { title: "Grow", text: "We post, promote on our city pages, run ads and improve every month." }
  ],

  /* ---------- 10. WHY YAP ---------- */
  why: [
    { title: "Founder-led", text: "You work directly with Yash Agarwal — no middleman, no getting lost in an agency queue." },
    { title: "Our own city pages", text: "Agra Outlook, Agra People and more — instant local reach that other agencies have to buy." },
    { title: "Shoot to post", text: "Content, design, editing, ads and websites under one roof." },
    { title: "Honest pricing", text: "Clear rates, no GST and a free extra with every paid service." }
  ],

  /* ---------- 11. FAQ ---------- */
  faq: [
    { q: "How do payments work?", a: "70% advance to start any work. For monthly plans, the first month is paid in full; 3-month plans need 50% in advance." },
    { q: "Do you charge GST?", a: "No. There is no GST on any of our services." },
    { q: "How many changes can I ask for?", a: "Up to 3 rounds of changes are free on every job." },
    { q: "What are complimentary services?", a: "With any paid service you can pick one free extra — like an Insta story on our pages, a free graphic, a QR code or a video edit, depending on your order." },
    { q: "Can you promote my business on Agra pages?", a: "Yes. We run Agra Outlook, Agra People, Agra Lifestyles and more. See the promotion packages on our Media page." },
    { q: "Do you work outside Agra?", a: "Yes. Design, editing, ads, websites and social media management work for clients anywhere. Shoots are mainly in and around Agra." }
  ]
};
