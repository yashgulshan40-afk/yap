/* ==========================================================
   Yash Agarwal Services Catalog
   SERVICES below is the catalog. Each service pulls its work samples
   from the portfolio data with a `samples` filter.
   Add a price by setting `price: "₹X,XXX"`; null shows "Price on request".
   ========================================================== */
(function () {
  "use strict";
  var Y = window.YA, esc = Y.esc, C = Y.contact;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  var SERVICES = [
    {
      id: "reels", name: "Reel shoot & edit", kind: "Video",
      blurb: "Offer reels, food & drinks reels and nightlife reels, shot on location and edited for Instagram.",
      deliverables: ["On-location shoot", "Hook-first editing", "Trending audio & captions", "Vertical 9:16 export"],
      bestFor: ["Restaurants", "Cafes", "Bars & lounges"],
      price: null,
      samples: function (i) { return i.type === "video" && (i.project === "fakira" || i.project === "heer" || i.project === "london-coffee"); },
    },
    {
      id: "graphics", name: "Graphic designing", kind: "Design",
      blurb: "Festival posts, offer creatives, menu highlights and brand posts that match your page.",
      deliverables: ["Festival & occasion posts", "Offer & combo creatives", "Story & post sizes", "Brand colours & fonts"],
      bestFor: ["Cafes", "Restaurants", "Hotels"],
      price: null,
      samples: function (i) { return i.type === "photo" && /Graphic Designing/.test(i.section + i.group); },
    },
    {
      id: "motion", name: "Graphic videos", kind: "Video",
      blurb: "Animated posts and motion graphics made from your brand's photos and offers.",
      deliverables: ["Animated offer posts", "Text & logo animation", "Music sync", "Reel & post formats"],
      bestFor: ["Cafes", "Retail brands"],
      price: null,
      samples: function (i) { return i.type === "video" && (i.section === "Graphic Videos" || i.project === "barista"); },
    },
    {
      id: "food-photo", name: "Food & beverage photography", kind: "Photo",
      blurb: "Close-up dish, drink and cocktail shots that make people want to order.",
      deliverables: ["Dish & drink close-ups", "Menu photos", "Styled flat lays", "Edited high-res files"],
      bestFor: ["Restaurants", "Cafes", "Sweet shops"],
      price: null,
      samples: function (i) { return i.type === "photo" && /Food|Photos$|Brand & Product/.test(i.section + " " + i.group) && !/Graphic/.test(i.section); },
    },
    {
      id: "venue", name: "Venue, ambience & event stories", kind: "Video",
      blurb: "Ambience, nightlife and event coverage that shows the feel of your place.",
      deliverables: ["Ambience walk-throughs", "Event & DJ night coverage", "Customer review reels", "Same-week delivery"],
      bestFor: ["Rooftops & lounges", "Banquets", "Hotels"],
      price: null,
      samples: function (i) { return /Ambience|Nightlife|Events|Reviews|Event Photography/.test(i.section + " " + i.group); },
    },
    {
      id: "cinematic", name: "Cinematic videos", kind: "Video",
      blurb: "Cinematic storytelling with careful framing, colour and sound.",
      deliverables: ["Concept & shot list", "Cinematic colour grade", "Sound design", "Long & short cuts"],
      bestFor: ["Brands", "Hotels", "Personal brands"],
      price: null,
      samples: function (i) { return i.project === "personal-portfolio" && i.type === "video"; },
    },
    {
      id: "product", name: "Product shoots & creatives", kind: "Photo",
      blurb: "Product photos, promotional creatives and product videos for retail brands.",
      deliverables: ["Product photography", "Promotional creatives", "Product videos", "Marketplace-ready images"],
      bestFor: ["Retail", "Perfume", "Sanitaryware"],
      price: null,
      samples: function (i) { return i.project === "kangra" || i.project === "navcci"; },
    },
    {
      id: "hospitality", name: "Hotel & hospitality creatives", kind: "Design",
      blurb: "Room, restaurant and event creatives for hotels, all in one consistent style.",
      deliverables: ["Room & property posts", "Restaurant & event promos", "Festival creatives", "Story templates"],
      bestFor: ["Hotels", "Resorts", "Banquets"],
      price: null,
      samples: function (i) { return i.project === "hotels"; },
    },
    {
      id: "fitness", name: "Fitness & wellness content", kind: "Video",
      blurb: "Workout videos and promotional creatives for gyms and wellness coaches.",
      deliverables: ["Workout & trainer videos", "Membership offer posts", "Transformation creatives", "Monthly content plan"],
      bestFor: ["Gyms", "Wellness coaches"],
      price: null,
      samples: function (i) { return i.project === "workout-zone" || i.project === "fat-to-fit"; },
    },
    {
      id: "smm", name: "Social media management", kind: "Monthly",
      blurb: "The whole job: planning, shooting, editing, designing and posting, every month.",
      deliverables: ["Monthly content calendar", "Reels + posts + stories", "Captions & hashtags", "Monthly insights"],
      bestFor: ["Food & beverage brands", "Local businesses"],
      price: null,
      samples: function (i) { return i.project === "fakira" && i.type !== "photo"; },
    },
  ];

  // Attach samples (videos first, then items with images)
  SERVICES.forEach(function (s) {
    var all = Y.items.filter(s.samples);
    var vids = all.filter(function (i) { return i.type === "video"; });
    var rest = all.filter(function (i) { return i.type !== "video"; });
    s.items = vids.slice(0, 2).concat(rest.slice(0, 2)).concat(vids.slice(2)).concat(rest.slice(2));
    s.count = all.length;
  });

  /* ---------- State ---------- */
  var KEY = "ya-catalog-enquiry";
  var picked = [];
  try { picked = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { picked = []; }
  picked = picked.filter(function (id) { return SERVICES.some(function (s) { return s.id === id; }); });
  var filter = "All";
  function save() { try { localStorage.setItem(KEY, JSON.stringify(picked)); } catch (e) {} }

  function toast(t) {
    var el = $("#toast"); el.textContent = t; el.classList.remove("opacity-0", "invisible", "translate-y-4");
    clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.add("opacity-0", "invisible", "translate-y-4"); }, 1800);
  }

  /* ---------- Hero ---------- */
  $("#tagline").textContent = Y.profile.tagline;
  $("#eyebrow").textContent = Y.profile.eyebrow;
  $("#stats").innerHTML = Y.profile.stats.concat([{ value: String(Y.projects.length), label: "Clients" }]).map(function (s) {
    return '<div class="rounded-2xl border border-line bg-panel px-4 py-3"><div class="font-display text-2xl font-bold tabular-nums">' + esc(s.value) +
      '</div><div class="text-xs uppercase tracking-wider text-muted">' + esc(s.label) + "</div></div>";
  }).join("");
  var heroVid = (Y.project("fakira") || {}).heroVideo;
  if (heroVid) {
    $("#heroMedia").innerHTML = '<video class="h-full w-full object-cover" muted loop playsinline autoplay preload="metadata" poster="' + esc(Y.src(heroVid.img)) + '" src="' + esc(Y.src(heroVid.video)) + '"></video>';
  }

  /* ---------- Service filters ---------- */
  var kinds = ["All"].concat(SERVICES.map(function (s) { return s.kind; }).filter(function (k, i, a) { return a.indexOf(k) === i; }));
  function renderFilters() {
    $("#filters").innerHTML = kinds.map(function (k) {
      var on = k === filter;
      return '<button data-kind="' + k + '" aria-pressed="' + on + '" class="rounded-full border px-4 py-2 text-sm font-semibold transition ' +
        (on ? "border-accent bg-accent text-on-accent" : "border-line bg-panel hover:border-ink") + '">' + k + "</button>";
    }).join("");
  }

  /* ---------- Service cards ---------- */
  function thumb(it, sid, idx) {
    var badge = it.type === "video" ? "▶" : it.type === "reel" ? "Reel" : "";
    return '<button data-s="' + sid + '" data-i="' + idx + '" class="group relative aspect-[4/5] max-w-full overflow-hidden rounded-xl bg-chip" aria-label="Open ' + esc(it.caption) + '">' +
      '<img loading="lazy" alt="" src="' + esc(Y.src(it.img)) + '" class="h-full w-full object-cover transition duration-300 group-hover:scale-105">' +
      (badge ? '<span class="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">' + badge + "</span>" : "") + "</button>";
  }
  function renderServices() {
    var list = SERVICES.filter(function (s) { return filter === "All" || s.kind === filter; });
    $("#serviceGrid").innerHTML = list.map(function (s) {
      var on = picked.indexOf(s.id) > -1;
      return '<article class="flex flex-col rounded-3xl border border-line bg-panel p-5 shadow-sm">' +
        '<div class="flex items-start justify-between gap-3"><div>' +
        '<span class="text-xs font-semibold uppercase tracking-wider text-accent-ink">' + esc(s.kind) + "</span>" +
        '<h3 class="mt-1 font-display text-2xl font-bold leading-tight">' + esc(s.name) + "</h3></div>" +
        '<span class="whitespace-nowrap rounded-full bg-chip px-3 py-1 text-xs font-semibold">' + (s.price ? esc(s.price) : "Price on request") + "</span></div>" +
        '<p class="mt-2 text-muted">' + esc(s.blurb) + "</p>" +
        '<div class="mt-4 grid grid-cols-4 gap-2">' + s.items.slice(0, 4).map(function (it, i) { return thumb(it, s.id, i); }).join("") + "</div>" +
        '<button data-all="' + s.id + '" class="mt-2 self-start text-sm font-semibold underline underline-offset-4">See ' + s.count + " samples</button>" +
        '<ul class="mt-4 grid gap-1.5 text-sm">' + s.deliverables.map(function (d) {
          return '<li class="flex gap-2"><span class="text-accent-ink">✓</span>' + esc(d) + "</li>";
        }).join("") + "</ul>" +
        '<p class="mt-3 text-xs text-muted">Best for: ' + esc(s.bestFor.join(", ")) + "</p>" +
        '<button data-pick="' + s.id + '" class="mt-5 rounded-full px-5 py-3 font-semibold transition ' +
        (on ? "bg-ink text-paper" : "bg-accent text-on-accent hover:brightness-95") + '">' + (on ? "✓ Added to enquiry" : "+ Add to enquiry") + "</button>" +
        "</article>";
    }).join("");
  }

  /* ---------- Clients wall ---------- */
  $("#clients").innerHTML = Y.categories.map(function (c) {
    return '<div><h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">' + esc(c.name) + '</h3><div class="grid gap-2">' +
      c.projects.map(function (p) {
        return '<button data-client="' + p.id + '" class="flex items-center gap-3 rounded-2xl border border-line bg-panel p-2 pr-4 text-left transition hover:border-ink">' +
          '<img loading="lazy" alt="" src="' + esc(Y.src(p.cover && p.cover.img)) + '" class="h-14 w-14 flex-none rounded-xl object-cover">' +
          '<span class="min-w-0"><b class="block font-semibold leading-tight">' + esc(p.title) + '</b><span class="text-xs text-muted">' + esc(Y.countLabel(p.counts)) + "</span></span></button>";
      }).join("") + "</div></div>";
  }).join("");

  /* ---------- Enquiry basket ---------- */
  function message() {
    var names = picked.map(function (id) { return SERVICES.filter(function (s) { return s.id === id; })[0].name; });
    return "Hi Yash! I saw your catalog and I'm interested in:\n" + names.map(function (n) { return "• " + n; }).join("\n") +
      "\n\nMy business: \nCity: \nPlease share details and pricing.";
  }
  function renderBasket() {
    var n = picked.length;
    $("#count").textContent = n;
    $("#bar").classList.toggle("translate-y-[150%]", n === 0);
    $("#bar").setAttribute("aria-hidden", String(n === 0));
    $("#barText").textContent = n === 1 ? "1 service in your enquiry" : n + " services in your enquiry";
    $("#barList").textContent = picked.map(function (id) { return SERVICES.filter(function (s) { return s.id === id; })[0].name; }).join(" · ");
    $("#sendWa").href = n ? C.waLink(message()) : C.waLink("Hi Yash! I saw your catalog.");
  }

  /* ---------- Contact ---------- */
  $("#waMain").href = C.waLink("Hi Yash! I saw your catalog and want to discuss content for my business.");
  $("#contactRows").innerHTML = [
    ["Phone", C.phonePretty], ["Email", C.email], ["Instagram", C.instagram],
  ].map(function (r) {
    return '<div class="flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel px-4 py-3">' +
      '<div class="min-w-0"><div class="text-xs uppercase tracking-wider text-muted">' + r[0] + '</div><div class="select-all break-words font-semibold">' + esc(r[1]) + "</div></div>" +
      (r[0] === "Instagram"
        ? '<a class="rounded-full border border-line px-3 py-1.5 text-sm font-semibold" href="' + esc(C.instagramUrl) + '" target="_blank" rel="noopener">Open</a>'
        : '<button data-copy="' + esc(r[1]) + '" class="rounded-full border border-line px-3 py-1.5 text-sm font-semibold">Copy</button>') + "</div>";
  }).join("");
  $("#about").textContent = Y.profile.about;
  $("#yr").textContent = new Date().getFullYear();

  /* ---------- Events ---------- */
  document.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-kind]"))) { filter = t.dataset.kind; renderFilters(); renderServices(); return; }
    if ((t = e.target.closest("[data-pick]"))) {
      var id = t.dataset.pick, at = picked.indexOf(id);
      if (at > -1) picked.splice(at, 1); else picked.push(id);
      save(); renderServices(); renderBasket();
      toast(at > -1 ? "Removed from enquiry" : "Added to enquiry");
      return;
    }
    if ((t = e.target.closest("[data-s]"))) {
      var s = SERVICES.filter(function (x) { return x.id === t.dataset.s; })[0];
      Y.lightbox(s.items, +t.dataset.i); return;
    }
    if ((t = e.target.closest("[data-all]"))) {
      var s2 = SERVICES.filter(function (x) { return x.id === t.dataset.all; })[0];
      Y.lightbox(s2.items, 0); return;
    }
    if ((t = e.target.closest("[data-client]"))) { Y.lightbox(Y.project(t.dataset.client).items, 0); return; }
    if ((t = e.target.closest("[data-copy]"))) { Y.copy(t.dataset.copy, function (ok) { toast(ok ? "Copied" : "Select the text to copy"); }); return; }
    if (e.target.closest("#clearBasket")) { picked = []; save(); renderServices(); renderBasket(); toast("Enquiry cleared"); }
  });

  renderFilters();
  renderServices();
  renderBasket();
})();
