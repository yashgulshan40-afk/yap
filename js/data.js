/* ==========================================================
   YAP Digital Marketing — Service Catalog Data
   Edit this file to add, remove or re-price services.
   ========================================================== */

const CURRENCY = "₹";

const CATEGORIES = [
  { id: "all",     name: "All Services",          icon: "✦" },
  { id: "seo",     name: "SEO",                   icon: "🔍" },
  { id: "social",  name: "Social Media",          icon: "📱" },
  { id: "ads",     name: "Paid Ads (PPC)",        icon: "🎯" },
  { id: "content", name: "Content Marketing",     icon: "✍️" },
  { id: "web",     name: "Web Design & Dev",      icon: "💻" },
  { id: "brand",   name: "Branding & Design",     icon: "🎨" },
  { id: "email",   name: "Email & Automation",    icon: "✉️" },
  { id: "video",   name: "Video & Cinematic",     icon: "🎬" },
];

const SERVICES = [
  /* ---------------- SEO ---------------- */
  {
    id: "seo-starter",
    category: "seo",
    name: "Local SEO Starter",
    tagline: "Get found on Google Maps & local search.",
    price: 7999, billing: "month",
    popular: false,
    delivery: "Results in 60–90 days",
    features: [
      "Google Business Profile optimisation",
      "Up to 10 target keywords",
      "On-page SEO for 5 pages",
      "20 local citations / directory listings",
      "Monthly ranking report",
    ],
  },
  {
    id: "seo-growth",
    category: "seo",
    name: "SEO Growth",
    tagline: "Full-funnel SEO for growing businesses.",
    price: 17999, billing: "month",
    popular: true,
    delivery: "Results in 90–120 days",
    features: [
      "Up to 30 target keywords",
      "Technical SEO audit & fixes",
      "On-page SEO for 15 pages",
      "4 SEO blog articles / month",
      "Quality backlink building",
      "Competitor analysis",
      "Bi-weekly reporting + strategy call",
    ],
  },
  {
    id: "seo-audit",
    category: "seo",
    name: "Technical SEO Audit",
    tagline: "A deep, one-time health check of your website.",
    price: 9999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 7 days",
    features: [
      "Crawl & indexation analysis",
      "Core Web Vitals & speed review",
      "Schema / structured data review",
      "Broken links & redirect map",
      "Prioritised action plan (PDF)",
    ],
  },

  /* ---------------- SOCIAL ---------------- */
  {
    id: "smm-basic",
    category: "social",
    name: "Social Media Basic",
    tagline: "Consistent presence on 2 platforms.",
    price: 9999, billing: "month",
    popular: false,
    delivery: "Starts in 5 days",
    features: [
      "2 platforms (Instagram + Facebook)",
      "12 branded posts / month",
      "Caption writing & hashtag research",
      "Content calendar",
      "Monthly insights report",
    ],
  },
  {
    id: "smm-pro",
    category: "social",
    name: "Social Media Pro",
    tagline: "Grow your audience and engagement fast.",
    price: 19999, billing: "month",
    popular: true,
    delivery: "Starts in 5 days",
    features: [
      "3 platforms (IG, FB, LinkedIn)",
      "20 posts + 8 reels / month",
      "Stories & highlight covers",
      "Community management (DMs & comments)",
      "Influencer outreach (2 / month)",
      "Monthly strategy call",
    ],
  },
  {
    id: "smm-setup",
    category: "social",
    name: "Profile Setup & Makeover",
    tagline: "Professional profiles ready to convert.",
    price: 4999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 3 days",
    features: [
      "Setup / revamp of up to 4 profiles",
      "Bio, links & CTA optimisation",
      "Profile & cover graphics",
      "Highlight cover set",
    ],
  },

  /* ---------------- ADS ---------------- */
  {
    id: "ads-google",
    category: "ads",
    name: "Google Ads Management",
    tagline: "Search, Display & Performance Max campaigns.",
    price: 12999, billing: "month",
    popular: true,
    delivery: "Live in 3 days",
    features: [
      "Keyword research & campaign setup",
      "Ad copy + extensions",
      "Conversion tracking (GA4 / GTM)",
      "Weekly bid & budget optimisation",
      "Ad spend up to ₹1,00,000 managed",
      "Monthly ROI report",
    ],
    note: "Ad spend paid separately to Google.",
  },
  {
    id: "ads-meta",
    category: "ads",
    name: "Meta Ads (FB + Instagram)",
    tagline: "Lead-gen & sales campaigns that scale.",
    price: 11999, billing: "month",
    popular: false,
    delivery: "Live in 3 days",
    features: [
      "Audience research & pixel setup",
      "6 ad creatives / month",
      "A/B testing of creatives & audiences",
      "Retargeting funnels",
      "Weekly optimisation",
    ],
    note: "Ad spend paid separately to Meta.",
  },
  {
    id: "ads-linkedin",
    category: "ads",
    name: "LinkedIn B2B Ads",
    tagline: "Reach decision-makers by job title & industry.",
    price: 14999, billing: "month",
    popular: false,
    delivery: "Live in 5 days",
    features: [
      "Account & Insight Tag setup",
      "Lead Gen Form campaigns",
      "4 sponsored creatives / month",
      "Audience & ABM list targeting",
      "Monthly lead quality report",
    ],
    note: "Ad spend paid separately to LinkedIn.",
  },

  /* ---------------- CONTENT ---------------- */
  {
    id: "content-blog",
    category: "content",
    name: "Blog Writing Pack",
    tagline: "SEO-optimised articles that rank and convert.",
    price: 5999, billing: "month",
    popular: false,
    delivery: "Weekly delivery",
    features: [
      "4 articles × 1,000 words",
      "Keyword research per article",
      "Meta title & description",
      "Royalty-free images",
      "2 revisions per article",
    ],
  },
  {
    id: "content-copy",
    category: "content",
    name: "Website Copywriting",
    tagline: "Persuasive copy for your key pages.",
    price: 8999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 10 days",
    features: [
      "Up to 5 pages of copy",
      "Brand voice guide",
      "SEO-friendly headings",
      "CTA & conversion copy",
    ],
  },

  /* ---------------- WEB ---------------- */
  {
    id: "web-landing",
    category: "web",
    name: "Landing Page",
    tagline: "A high-converting page for your campaign.",
    price: 9999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 5 days",
    features: [
      "1 responsive landing page",
      "Lead form + WhatsApp integration",
      "Speed-optimised (90+ PageSpeed)",
      "Analytics & pixel setup",
    ],
  },
  {
    id: "web-business",
    category: "web",
    name: "Business Website",
    tagline: "A professional site that builds trust.",
    price: 24999, billing: "one-time",
    popular: true,
    delivery: "Delivered in 14 days",
    features: [
      "Up to 8 pages",
      "Mobile-first responsive design",
      "Basic on-page SEO",
      "Contact forms & Google Maps",
      "1 year hosting + domain",
      "30 days free support",
    ],
  },
  {
    id: "web-ecom",
    category: "web",
    name: "E-commerce Store",
    tagline: "Sell online with Shopify or WooCommerce.",
    price: 49999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 21–30 days",
    features: [
      "Up to 50 products uploaded",
      "Payment gateway integration",
      "Shipping & tax setup",
      "Abandoned cart recovery",
      "Training session for your team",
    ],
  },

  /* ---------------- BRAND ---------------- */
  {
    id: "brand-logo",
    category: "brand",
    name: "Logo Design",
    tagline: "A memorable mark for your business.",
    price: 3999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 4 days",
    features: [
      "3 initial concepts",
      "3 rounds of revisions",
      "All source files (AI, SVG, PNG)",
      "Social media versions",
    ],
  },
  {
    id: "brand-identity",
    category: "brand",
    name: "Complete Brand Identity",
    tagline: "Everything your brand needs to look consistent.",
    price: 19999, billing: "one-time",
    popular: true,
    delivery: "Delivered in 12 days",
    features: [
      "Logo + variations",
      "Colour palette & typography",
      "Brand guidelines book (PDF)",
      "Business card & letterhead",
      "Social media templates (10)",
    ],
  },

  /* ---------------- EMAIL ---------------- */
  {
    id: "email-campaign",
    category: "email",
    name: "Email Marketing",
    tagline: "Newsletters and campaigns that get opened.",
    price: 6999, billing: "month",
    popular: false,
    delivery: "Starts in 5 days",
    features: [
      "4 campaigns / month",
      "Custom HTML templates",
      "List segmentation",
      "A/B subject line testing",
      "Open & click reporting",
    ],
  },
  {
    id: "email-automation",
    category: "email",
    name: "Marketing Automation",
    tagline: "Nurture leads on autopilot.",
    price: 14999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 10 days",
    features: [
      "Welcome & nurture sequences",
      "WhatsApp + email workflows",
      "CRM integration (HubSpot / Zoho)",
      "Lead scoring setup",
    ],
  },

  /* ---------------- VIDEO ---------------- */
  {
    id: "video-reels",
    category: "video",
    name: "Reels & Shorts Pack",
    tagline: "Scroll-stopping short videos.",
    price: 7999, billing: "month",
    popular: true,
    delivery: "Weekly delivery",
    features: [
      "8 edited reels / shorts",
      "Trending audio & captions",
      "Hook-first scripting",
      "Thumbnail / cover design",
    ],
  },
  {
    id: "video-cinematic",
    category: "video",
    name: "Cinematic Brand Film",
    tagline: "A premium shoot that tells your brand story.",
    price: 24999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 10–14 days",
    features: [
      "Concept, script & shot list",
      "1-day professional shoot (Delhi NCR / Agra)",
      "Cinematic colour grading & sound design",
      "1 hero film (60–90s) + 3 short cut-downs",
      "Vertical versions for reels & shorts",
      "2 rounds of revisions",
    ],
    note: "Travel outside Delhi NCR & Agra is quoted separately.",
  },
  {
    id: "video-explainer",
    category: "video",
    name: "Animated Explainer Video",
    tagline: "Explain your product in 60 seconds.",
    price: 14999, billing: "one-time",
    popular: false,
    delivery: "Delivered in 10 days",
    features: [
      "Script & storyboard",
      "Professional voice-over",
      "2D motion graphics (up to 60s)",
      "2 rounds of revisions",
    ],
  },
];

/* Bundled packages shown in the "Packages" section.
   The "Save X%" badge is calculated automatically from the included services. */
const PACKAGES = [
  {
    id: "pkg-startup",
    name: "Startup Launch",
    price: 19999, billing: "month",
    description: "Perfect for new businesses getting online.",
    includes: ["smm-basic", "seo-starter", "content-blog"],
  },
  {
    id: "pkg-growth",
    name: "Growth Engine",
    price: 39999, billing: "month",
    description: "For businesses ready to scale leads & sales.",
    includes: ["smm-pro", "seo-growth", "ads-meta"],
    featured: true,
  },
  {
    id: "pkg-dominate",
    name: "Market Leader",
    price: 59999, billing: "month",
    description: "Full-service marketing team on demand.",
    includes: ["smm-pro", "seo-growth", "ads-google", "ads-meta", "video-reels", "content-blog"],
  },
];

/* SAMPLE testimonials (placeholders) — replace with real client reviews before going live */
const TESTIMONIALS = [
  { name: "Riya Sharma", role: "Founder, Bloom Café", text: "YAP took our Instagram from 800 to 12k followers in five months. Weekend footfall has nearly doubled." },
  { name: "Arjun Mehta", role: "Director, Mehta Realty", text: "Their Google Ads setup cut our cost per lead by 42%. Transparent reports every week." },
  { name: "Neha Kapoor", role: "Owner, Kapoor Fashions", text: "Our new Shopify store and Meta campaigns paid for themselves in the first month." },
];

/* Contact details — update these */
const CONTACT = {
  phone: "+91 90000 00000",
  whatsapp: "919000000000",            // digits only, with country code
  email: "hello@yapdigital.example",
  address: "India",
};
