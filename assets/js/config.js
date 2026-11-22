/* =====================================================================
   YAP. DIGITAL MARKETING — SITE CONFIG
   ---------------------------------------------------------------------
   Website ka saara content isi file se badalta hai.
   Text, number, services, packages, clients, portfolio sab yahan edit karo.
   HTML ko haath lagane ki zaroorat nahi.
   ===================================================================== */

window.YAP = {

  /* ---------- 1. BASIC INFO ---------- */
  site: {
    name: "YAP Digital Marketing",
    short: "yap",
    tagline: "Digital Marketing Agency",
    domain: "yapdigitalmarketing.digital",          // apna final domain yahan likho
    founder: "Yash Agarwal",
    phone: "+91 821 811 6706",                      // dikhne wala number
    whatsapp: "918218116706",                       // country code ke saath, bina + aur space ke
    email: "",                                      // e.g. "hello@yapdigitalmarketing.digital" (khaali = hide)
    location: "India · Serving clients worldwide",
    hours: "Mon – Sat · 10:00 AM – 8:00 PM",
    whatsappGreeting: "Hi YAP! I found you on your website and want to grow my brand.",
    social: {                                       // khaali chhodoge to icon hide ho jayega
      instagram: "",
      linkedin: "",
      youtube: "",
      facebook: "",
      x: ""
    }
  },

  /* ---------- 2. HOME HERO ---------- */
  hero: {
    eyebrow: "Digital Marketing Agency",
    lineA: "Let the internet",
    lineB: "yap about your",
    rotating: ["brand", "reels", "website", "launch", "business"],
    sub: "We build scroll-stopping content, sharp brand identities and performance campaigns that get people talking — and buying.",
    primaryCta: "Start a project",
    secondaryCta: "See our work"
  },

  /* ---------- 3. SERVICES ----------
     icon: niche ICONS list me se koi bhi naam (social, design, video, reels, web, seo, ads, ai, brand, content, influencer, analytics) */
  services: [
    { icon: "social",  title: "Social Media Management", short: "Strategy, content calendars, posting and community — handled end to end.",
      points: ["Monthly content calendar", "Feed posts, carousels & stories", "Community & DM management", "Monthly growth report"] },
    { icon: "reels",   title: "Reels & Short-form Video", short: "Hook-first reels and shorts engineered to stop the scroll in two seconds.",
      points: ["Hook & script writing", "Shoot direction", "Fast-cut editing with captions", "Trend & audio research"] },
    { icon: "design",  title: "Graphic Design", short: "Posts, ads, brochures and decks with obsessive attention to type and layout.",
      points: ["Social creatives", "Ad creatives", "Print & packaging", "Pitch decks"] },
    { icon: "brand",   title: "Branding & Identity", short: "Logos, colour, type and voice — a brand system people remember.",
      points: ["Logo & visual identity", "Brand guidelines", "Tone of voice", "Brand launch kit"] },
    { icon: "video",   title: "Video Editing", short: "YouTube, ads, podcasts and brand films cut with story, sound and motion.",
      points: ["Long-form YouTube edits", "Ad films", "Podcast edits", "Motion graphics"] },
    { icon: "web",     title: "Website Development", short: "Fast, mobile-first websites and landing pages built to convert visitors.",
      points: ["Business websites", "Landing pages", "WhatsApp & lead forms", "Speed & SEO setup"] },
    { icon: "ads",     title: "Meta & Google Ads", short: "Performance campaigns that turn ad spend into leads, sales and ROAS.",
      points: ["Campaign strategy", "Audience research", "Creative testing", "Weekly optimisation"] },
    { icon: "seo",     title: "SEO & Google Business", short: "Rank on Google and get found by customers searching near you.",
      points: ["Keyword research", "On-page SEO", "Google Business Profile", "Local SEO"] },
    { icon: "influencer", title: "Influencer Marketing", short: "The right creators, briefed well, tracked properly.",
      points: ["Creator shortlisting", "Campaign briefs", "Barter & paid collabs", "Performance tracking"] },
    { icon: "ai",      title: "AI & Marketing Automation", short: "Chatbots, WhatsApp flows and automations that work while you sleep.",
      points: ["WhatsApp auto-replies", "Lead capture flows", "CRM setup", "AI content workflows"] }
  ],

  /* ---------- 4. PACKAGES ----------
     Price abhi nahi dikhaya — "price" khaali rakhoge to "Price on request" dikhega.
     Baad me price daalna ho to:  price: "₹10,000", per: "/month"  */
  packages: {
    intro: "Every brand is at a different stage. Pick the package that fits where you are today — we'll tailor it on a quick call.",
    plans: [
      { name: "Starter", for: "Small businesses & new brands getting online",
        price: "", per: "",
        features: ["1–2 platforms (Instagram + Facebook)", "Monthly content calendar", "Designed posts & carousels", "Reels / shorts (basic edits)", "Captions & hashtag strategy", "Monthly report", "WhatsApp support"] },
      { name: "Growth", for: "Growing brands ready to scale reach & leads", featured: true, badge: "Most chosen",
        price: "", per: "",
        features: ["Everything in Starter", "Up to 3 platforms", "More posts & premium reels", "Shoot direction & scripting", "Meta ads setup & management", "Google Business Profile", "Bi-weekly strategy call", "Priority support"] },
      { name: "Premium", for: "Established brands that want full-stack marketing",
        price: "", per: "",
        features: ["Everything in Growth", "All platforms incl. YouTube & LinkedIn", "High-volume content & ad creatives", "Meta + Google ads", "SEO & content strategy", "Influencer campaigns", "Dedicated account manager", "Weekly reporting"] },
      { name: "Custom", for: "One-time projects or a mix of services",
        price: "", per: "", custom: true,
        features: ["Logo & branding projects", "Website / landing page", "Single ad campaign", "Product shoot & editing", "Event or launch promotion", "Build-your-own service mix"] }
    ],
    /* Chhoti / single services — "price" khaali = "On request" */
    addons: [
      { name: "Logo design", price: "" },
      { name: "Brand identity kit", price: "" },
      { name: "Single reel edit", price: "" },
      { name: "Social post design (per post)", price: "" },
      { name: "Landing page", price: "" },
      { name: "Business website", price: "" },
      { name: "Google Business setup", price: "" },
      { name: "Ad campaign setup", price: "" },
      { name: "YouTube video edit", price: "" },
      { name: "Product photoshoot", price: "" }
    ]
  },

  /* ---------- 5. CLIENTS ----------
     ⚠ NUMBERS ABHI SAMPLE HAIN — apne asli numbers daalo.  */
  stats: [
    { value: 50,  suffix: "+", label: "Clients served" },
    { value: 12,  suffix: "+", label: "Industries" },
    { value: 1000, suffix: "+", label: "Creatives delivered" },
    { value: 5,   suffix: "M+", label: "Organic views generated" }
  ],
  clientCategories: [
    { name: "Fashion & Apparel",     count: 8 },
    { name: "Restaurants & Cafés",   count: 7 },
    { name: "Real Estate",           count: 5 },
    { name: "Gyms & Fitness",        count: 6 },
    { name: "Salons & Beauty",       count: 6 },
    { name: "Education & Coaching",  count: 5 },
    { name: "Healthcare & Clinics",  count: 4 },
    { name: "E-commerce / D2C",      count: 5 },
    { name: "Jewellery",             count: 3 },
    { name: "Personal Brands",       count: 4 }
  ],
  /* Client naam / logo — logo: "assets/clients/abc.png" (khaali = naam dikhega) */
  clients: [
    { name: "Client One", logo: "", category: "Fashion & Apparel" },
    { name: "Client Two", logo: "", category: "Restaurants & Cafés" },
    { name: "Client Three", logo: "", category: "Real Estate" },
    { name: "Client Four", logo: "", category: "Gyms & Fitness" },
    { name: "Client Five", logo: "", category: "Salons & Beauty" },
    { name: "Client Six", logo: "", category: "Education & Coaching" }
  ],
  /* Testimonials — khaali array [] rakhoge to section hide */
  testimonials: [
    { quote: "Replace this with a real line from a happy client — what changed after working with YAP.", name: "Client name", role: "Owner, Brand name" },
    { quote: "Short, specific testimonials work best: a number, a result, a feeling.", name: "Client name", role: "Founder, Brand name" }
  ],

  /* ---------- 6. PORTFOLIO ----------
     Do tareeke:
     (a) Yahan haath se items add karo, ya
     (b) Photos/videos assets/portfolio/<category>/ me daalo aur
         `python3 tools/portfolio_builder.py` chalao — yeh assets/js/portfolio-data.js bana dega
         aur woh items yahan wale items ki jagah apne aap use honge.
     Fields: title, client, category, image, video (YouTube/Instagram link), link, desc, tags */
  portfolioCategories: ["Social Media", "Reels", "Branding", "Design", "Websites", "Ads"],
  portfolio: [
    { title: "Your project title", client: "Client name", category: "Social Media", image: "", desc: "One line about the brief and the result.", tags: ["Instagram", "Content"] },
    { title: "Reel campaign", client: "Client name", category: "Reels", image: "", desc: "Add views, followers or sales numbers here.", tags: ["Reels", "Editing"] },
    { title: "Brand identity", client: "Client name", category: "Branding", image: "", desc: "Logo, colours and brand guidelines.", tags: ["Logo", "Identity"] },
    { title: "Ad creatives", client: "Client name", category: "Ads", image: "", desc: "Meta ad creatives and campaign result.", tags: ["Meta Ads"] },
    { title: "Business website", client: "Client name", category: "Websites", image: "", desc: "Fast, mobile-first website with WhatsApp leads.", tags: ["Web"] },
    { title: "Festive post series", client: "Client name", category: "Design", image: "", desc: "Festive and offer creatives.", tags: ["Design"] }
  ],

  /* ---------- 7. PROCESS ---------- */
  process: [
    { title: "Discover", text: "A free call to understand your business, audience, competitors and goals." },
    { title: "Plan", text: "A clear strategy: platforms, content pillars, calendar and targets." },
    { title: "Create", text: "Our team shoots, designs, edits and writes — you approve before anything goes live." },
    { title: "Grow", text: "We publish, run ads, track results and improve every month." }
  ],

  /* ---------- 8. WHY YAP ---------- */
  why: [
    { title: "Founder-led", text: "You work directly with the founder — no hand-offs, no getting lost in an agency queue." },
    { title: "Content that talks", text: "Hooks, stories and visuals made for how people actually scroll in India today." },
    { title: "Results you can see", text: "Simple monthly reports with reach, leads and sales — not vanity numbers." },
    { title: "One team, every service", text: "Design, video, ads, web and SEO under one roof, working together." }
  ],

  /* ---------- 9. FAQ ---------- */
  faq: [
    { q: "How soon can we start?", a: "Usually within 3–5 working days after the strategy call and onboarding." },
    { q: "Do you work with small businesses?", a: "Yes. Our Starter package and single services are built for small and new businesses." },
    { q: "Is there a long-term contract?", a: "No lock-ins. Packages run month to month, and you can upgrade any time." },
    { q: "Do you handle shoots as well?", a: "Yes, we plan and direct shoots, and can arrange on-site shoots depending on location." },
    { q: "How do we communicate?", a: "WhatsApp for day-to-day updates, plus scheduled calls for strategy and reports." }
  ]
};
