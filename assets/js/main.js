/* =====================================================================
   yap. — site engine
   Header, menu, footer, WhatsApp widget aur saare sections
   config.js ke data se yahi file banati hai. Content badalna ho to
   config.js edit karo, yeh file nahi.
   ===================================================================== */
(function () {
  "use strict";
  const C = window.YAP;
  const S = C.site;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const page = document.body.dataset.page || "home";
  document.documentElement.classList.remove("no-js");

  /* Portfolio: tools/portfolio_builder.py se bana data (agar hai) pehle */
  const PORTFOLIO = (Array.isArray(window.YAP_PORTFOLIO) && window.YAP_PORTFOLIO.length) ? window.YAP_PORTFOLIO : C.portfolio;

  /* ---------- WhatsApp link helper ---------- */
  const wa = (text) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text || S.whatsappGreeting)}`;
  window.yapWhatsApp = wa;

  /* ---------- icons (inline SVG, stroke) ---------- */
  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    ne: '<path d="M7 17L17 7M8 7h9v9"/>',
    social: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
    reels: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 8h18M8 3l3 5M14 3l3 5"/><path d="M10 12v5l4.5-2.5z" fill="currentColor"/>',
    design: '<path d="M12 3l9 9-9 9-9-9z"/><circle cx="12" cy="12" r="2.4"/>',
    brand: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 7l3 3"/><circle cx="19" cy="19" r="1.6" fill="currentColor"/>',
    video: '<rect x="2.5" y="5" width="14" height="14" rx="3"/><path d="M16.5 10l5-3v10l-5-3"/>',
    web: '<rect x="2.5" y="4" width="19" height="16" rx="3"/><path d="M2.5 9h19M6 6.5h.01M9 6.5h.01"/><path d="M9 13l-2 2 2 2M15 13l2 2-2 2"/>',
    ads: '<path d="M3 11v3a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z"/><path d="M15 9a4 4 0 010 6M18 6a8 8 0 010 12"/>',
    seo: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M7.5 12l2-2 2 1.5 2.5-3"/>',
    influencer: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M17 4.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z"/>',
    ai: '<rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9.5 15.5h5M2.5 12v3M21.5 12v3"/>',
    content: '<path d="M5 4h10l4 4v12H5z"/><path d="M14 4v5h5M8 13h8M8 17h5"/>',
    analytics: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
    send: '<path d="M4 12l16-8-6 16-2.5-6.5z" fill="currentColor"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7h.01M12 17v-4a2 2 0 014 0v4M12 10v7"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9v6l5-3z" fill="currentColor"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || P.content}</svg>`;
  const WA_SVG = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.1c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.2 1.3-4-.3-.4a10.4 10.4 0 01-1.6-5.6C5.5 9.8 10.2 5.2 16 5.2s10.5 4.6 10.5 10.4S21.8 26.1 16 26.1zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.7-.4z"/></svg>';
  const logo = '<span class="logo" aria-label="yap.">yap<i></i></span>';

  /* ---------- navigation ---------- */
  const NAV = [
    ["home", "Home", "index.html"],
    ["about", "About Us", "about.html"],
    ["services", "Services", "services.html"],
    ["portfolio", "Portfolio", "portfolio.html"],
    ["packages", "Packages", "packages.html"],
    ["clients", "Clients", "clients.html"],
    ["contact", "Contact", "contact.html"]
  ];

  function header() {
    const el = $("#site-header");
    if (!el) return;
    el.className = "site-header";
    el.innerHTML = `<div class="wrap nav">
      <a href="index.html" class="logo-lockup" aria-label="${esc(S.name)} home">${logo}<small>Digital Marketing<br>Agency</small></a>
      <nav class="nav-links" aria-label="Main">${NAV.map(([k, t, h]) => `<a href="${h}" class="${k === page ? "active" : ""}">${t}</a>`).join("")}</nav>
      <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="menu">Menu <span class="burger"><span></span><span></span></span></button>
    </div>`;

    const menu = document.createElement("div");
    menu.className = "menu"; menu.id = "menu"; menu.setAttribute("aria-hidden", "true");
    menu.innerHTML = `<nav class="menu-main" aria-label="Menu">
        ${NAV.map(([k, t, h], i) => `<a href="${h}" class="${k === page ? "active" : ""}"><small>0${i + 1}</small>${t}<span class="d"></span></a>`).join("")}
      </nav>
      <aside class="menu-side">
        <div><h4>Talk to us</h4><a class="big" href="${wa()}" target="_blank" rel="noopener">WhatsApp ↗</a><br><a class="big" href="tel:${S.phone.replace(/\s/g, "")}">${esc(S.phone)}</a>${S.email ? `<br><a class="big" href="mailto:${esc(S.email)}">${esc(S.email)}</a>` : ""}</div>
        <div><h4>Founder</h4><p>${esc(S.founder)}</p></div>
        <div><h4>Studio</h4><p>${esc(S.location)}</p></div>
        ${socials()}
      </aside>`;
    document.body.appendChild(menu);

    const btn = $("#menuBtn");
    const toggle = (open) => {
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open);
      menu.setAttribute("aria-hidden", !open);
      btn.firstChild.textContent = open ? "Close " : "Menu ";
    };
    btn.addEventListener("click", () => toggle(!document.body.classList.contains("menu-open")));
    document.addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => toggle(false)));

    let last = 0;
    const onScroll = () => {
      const y = scrollY;
      el.classList.toggle("scrolled", y > 30);
      el.classList.toggle("hide", y > 400 && y > last && !document.body.classList.contains("menu-open"));
      last = y;
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  function socials() {
    const list = Object.entries(S.social || {}).filter(([, v]) => v);
    if (!list.length) return "";
    return `<div class="socials">${list.map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener" aria-label="${k}">${icon(k)}</a>`).join("")}</div>`;
  }

  function footer() {
    const el = $("#site-footer");
    if (!el) return;
    el.className = "site-footer";
    el.innerHTML = `<div class="wrap">
      <div class="f-top">
        <div>${logo}<p>We make brands people talk about — content, design, ads and websites under one roof.</p>${socials()}</div>
        <div><h4>Explore</h4>${NAV.map(([, t, h]) => `<a href="${h}">${t}</a>`).join("")}</div>
        <div><h4>Services</h4>${C.services.slice(0, 7).map((s) => `<a href="services.html#${slug(s.title)}">${esc(s.title)}</a>`).join("")}</div>
        <div><h4>Contact</h4>
          <a href="${wa()}" target="_blank" rel="noopener">WhatsApp ${esc(S.phone)}</a>
          <a href="tel:${S.phone.replace(/\s/g, "")}">Call ${esc(S.phone)}</a>
          ${S.email ? `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>` : ""}
          <p style="margin:12px 0 0">${esc(S.location)}<br>${esc(S.hours)}</p>
        </div>
      </div>
      <div class="f-giant" aria-hidden="true">yap<i></i></div>
      <div class="f-bottom"><span>© ${new Date().getFullYear()} ${esc(S.name)}. All rights reserved.</span><span>Founded by ${esc(S.founder)} · ${esc(S.domain)}</span></div>
    </div>`;
  }

  /* ---------- WhatsApp chat widget ---------- */
  function whatsappWidget() {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const quick = ["I want to grow my Instagram", "I need reels / video editing", "I need a website", "I want to run ads", "Send me your packages"];
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="wa-box" id="waBox" role="dialog" aria-label="Chat on WhatsApp">
        <div class="wa-head"><div class="av">${logo}</div><div><b>${esc(S.name)}</b><small>Typically replies within minutes</small></div><button id="waClose" aria-label="Close chat">×</button></div>
        <div class="wa-body">
          <div class="wa-msg">Hi there! 👋<br>Welcome to <b>yap.</b> — how can we help your brand grow?<small>${now}</small></div>
          <div class="wa-msg" style="animation-delay:.3s">Pick a topic or type your message below. It opens straight in WhatsApp.<small>${now}</small></div>
          <div class="wa-quick">${quick.map((q) => `<button type="button">${q}</button>`).join("")}</div>
        </div>
        <form class="wa-foot" id="waForm"><input id="waInput" placeholder="Type a message…" aria-label="Message"><button aria-label="Send on WhatsApp">${icon("send")}</button></form>
      </div>
      <button class="wa-fab" id="waFab" aria-label="Chat with us on WhatsApp">${WA_SVG}<span class="badge">1</span></button>`;
    document.body.append(...wrap.children);
    const box = $("#waBox"), fab = $("#waFab");
    const open = (v) => { box.classList.toggle("open", v); if (v) $(".badge", fab)?.remove(); };
    fab.addEventListener("click", () => open(!box.classList.contains("open")));
    $("#waClose").addEventListener("click", () => open(false));
    const go = (t) => window.open(wa(`Hi YAP! ${t}`), "_blank", "noopener");
    $$(".wa-quick button", box).forEach((b) => b.addEventListener("click", () => go(b.textContent)));
    $("#waForm").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#waInput").value.trim(); go(v || S.whatsappGreeting); });
  }

  /* ---------- helpers ---------- */
  const slug = (s) => String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const initials = (s) => String(s).split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const isVideo = (p) => /\.(mp4|webm|mov)$/i.test(p || "");

  /* ---------- renderers (HTML me data-render="..." wale elements) ---------- */
  const R = {};

  R["hero-rotator"] = (el) => {
    const words = C.hero.rotating;
    el.innerHTML = words.map((w, i) => `<span class="${i === 0 ? "on" : ""}">${esc(w)}<span class="dot">.</span></span>`).join("");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0; const spans = $$(":scope > span", el);
    setInterval(() => {
      const cur = spans[i]; i = (i + 1) % spans.length; const nxt = spans[i];
      cur.classList.remove("on"); cur.classList.add("out");
      nxt.classList.remove("out"); nxt.classList.add("on");
      setTimeout(() => cur.classList.remove("out"), 700);
    }, 2400);
  };

  R["marquee"] = (el) => {
    const items = C.services.map((s) => s.title.replace(/ & .*/, ""));
    const row = items.map((t) => `<span>${esc(t)}</span>`).join("");
    el.innerHTML = `<div class="marquee-track">${row}${row}</div>`;
  };

  R["services-list"] = (el) => {
    const n = +el.dataset.limit || C.services.length;
    el.innerHTML = C.services.slice(0, n).map((s, i) => `
      <a class="svc-row rv" href="services.html#${slug(s.title)}">
        <span class="svc-n">${String(i + 1).padStart(2, "0")}</span>
        <h3>${icon(s.icon)}${esc(s.title)}</h3>
        <span class="svc-short">${esc(s.short)}</span>
        <span class="svc-go">${icon("ne")}</span>
      </a>`).join("");
  };

  R["services-grid"] = (el) => {
    el.innerHTML = C.services.map((s, i) => `
      <article class="svc-card rv" id="${slug(s.title)}">
        <div class="top"><span class="ico">${icon(s.icon)}</span><span class="num">${String(i + 1).padStart(2, "0")}</span></div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.short)}</p>
        <ul class="ticks">${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="foot">
          <a class="btn btn-sm btn-gold" href="${wa(`Hi YAP! I'm interested in ${s.title}. Please share details.`)}" target="_blank" rel="noopener">Enquire on WhatsApp</a>
          <a class="btn btn-sm btn-line" href="contact.html?service=${encodeURIComponent(s.title)}">Send brief</a>
        </div>
      </article>`).join("");
  };

  R["why"] = (el) => {
    el.innerHTML = C.why.map((w, i) => `<div class="rv"><span class="n">0${i + 1}</span><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></div>`).join("");
  };

  R["process"] = (el) => {
    el.innerHTML = C.process.map((p) => `<div class="step rv"><h3>${esc(p.title)}<span class="dot">.</span></h3><p>${esc(p.text)}</p></div>`).join("");
  };

  function workCard(p, i) {
    const clip = p.clip || (isVideo(p.image) ? p.image : "");
    const poster = isVideo(p.image) ? "" : p.image;
    const media = clip
      ? `<video src="${esc(clip)}" ${poster ? `poster="${esc(poster)}"` : ""} muted loop playsinline preload="${poster ? "none" : "metadata"}" aria-label="${esc(p.title)}"></video>`
      : poster ? `<img src="${esc(poster)}" alt="${esc(p.title)}" loading="lazy">`
      : `<div class="ph"><small>${esc(p.category)}</small><b>${esc(initials(p.client || p.title))}<i></i></b></div>`;
    const hasPlay = clip || p.video;
    return `<button class="work rv" data-cat="${esc(p.category)}" data-i="${i}">
      <div class="media"><span class="chip">${esc(p.category)}</span>${media}${hasPlay ? `<span class="play">${icon("play")}</span>` : ""}</div>
      <div class="meta"><div><h3>${esc(p.title)}</h3><small>${esc(p.client || "")}</small></div>
      <div class="tags">${(p.tags || []).slice(0, 2).map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
    </button>`;
  }

  R["portfolio"] = (el) => {
    const limit = +el.dataset.limit || PORTFOLIO.length;
    let items = PORTFOLIO;
    if (el.dataset.mix !== undefined) {
      /* home page: har category se baari-baari ek item */
      const byCat = {};
      PORTFOLIO.forEach((p) => (byCat[p.category] = byCat[p.category] || []).push(p));
      const order = C.portfolioCategories || [];
      const lists = Object.keys(byCat).sort((x, y) => (order.indexOf(x) + 1 || 99) - (order.indexOf(y) + 1 || 99)).map((k) => byCat[k]); items = [];
      for (let r = 0; items.length < PORTFOLIO.length; r++) lists.forEach((l) => l[r] && items.push(l[r]));
    }
    items = items.slice(0, limit);
    if (!items.length) { el.innerHTML = `<div class="empty-note">Portfolio coming soon. Add projects in <code>assets/js/config.js</code>.</div>`; return; }
    el.innerHTML = items.map((p) => workCard(p, PORTFOLIO.indexOf(p))).join("");
    $$("video", el).forEach((v) => { const w = v.closest(".work"); w.addEventListener("mouseenter", () => v.play().catch(() => {})); w.addEventListener("mouseleave", () => v.pause()); });
    $$(".work", el).forEach((w) => w.addEventListener("click", () => lightbox(PORTFOLIO[+w.dataset.i])));
  };

  R["portfolio-filters"] = (el) => {
    const cats = [...new Set([...(C.portfolioCategories || []), ...PORTFOLIO.map((p) => p.category)])].filter((c) => PORTFOLIO.some((p) => p.category === c));
    el.innerHTML = `<button class="on" data-f="*">All<sup>${PORTFOLIO.length}</sup></button>` +
      cats.map((c) => `<button data-f="${esc(c)}">${esc(c)}<sup>${PORTFOLIO.filter((p) => p.category === c).length}</sup></button>`).join("");
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", el).forEach((x) => x.classList.toggle("on", x === b));
      $$(".work").forEach((w) => w.classList.toggle("hide", b.dataset.f !== "*" && w.dataset.cat !== b.dataset.f));
    });
  };

  function lightbox(p) {
    let lb = $("#lightbox");
    if (!lb) {
      lb = document.createElement("div"); lb.className = "lightbox"; lb.id = "lightbox";
      lb.innerHTML = `<button class="lb-close" aria-label="Close">×</button><div class="lb-inner"></div>`;
      document.body.appendChild(lb);
      lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest(".lb-close")) closeLb(); });
      document.addEventListener("keydown", (e) => e.key === "Escape" && closeLb());
    }
    const clip = p.clip || (isVideo(p.image) ? p.image : "");
    const media = clip ? `<video src="${esc(clip)}" ${p.image && !isVideo(p.image) ? `poster="${esc(p.image)}"` : ""} controls autoplay playsinline></video>`
      : p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}">`
      : `<div class="work"><div class="ph"><small>${esc(p.category)}</small><b>${esc(initials(p.client || p.title))}<i></i></b></div></div>`;
    $(".lb-inner", lb).innerHTML = `<div class="lb-media">${media}</div>
      <div class="lb-body"><span class="eyebrow" style="margin:0">${esc(p.category)}</span><h3>${esc(p.title)}</h3>
      ${p.client ? `<p class="muted">Client: ${esc(p.client)}</p>` : ""}<p>${esc(p.desc || "")}</p>
      <div class="chips">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:auto">
        ${p.video ? `<a class="btn btn-sm btn-gold" href="${esc(p.video)}" target="_blank" rel="noopener">Watch video ↗</a>` : ""}
        ${p.link ? `<a class="btn btn-sm btn-line" href="${esc(p.link)}" target="_blank" rel="noopener">View live ↗</a>` : ""}
        <a class="btn btn-sm btn-wa" href="${wa(`Hi YAP! I saw "${p.title}" in your portfolio and want something similar.`)}" target="_blank" rel="noopener">Want this? WhatsApp</a>
      </div></div>`;
    lb.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closeLb() { const lb = $("#lightbox"); if (!lb) return; lb.classList.remove("open"); document.body.style.overflow = ""; $$("video", lb).forEach((v) => v.pause()); }

  R["packages"] = (el) => {
    el.innerHTML = C.packages.plans.map((p) => `
      <article class="plan rv ${p.featured ? "featured" : ""} ${p.custom ? "custom" : ""}">
        <div class="tier"><h3>${esc(p.name)}</h3>${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}</div>
        <p class="for">${esc(p.for)}</p>
        <div class="price ${p.price ? "" : "req"}">${p.price ? `${esc(p.price)} <small>${esc(p.per || "")}</small>` : (p.custom ? "Tailored quote" : "Price on request")}</div>
        <ul class="ticks">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <a class="btn ${p.featured ? "" : (p.custom ? "btn-line" : "btn-gold")} btn-block" href="${wa(`Hi YAP! I'm interested in the ${p.name} package. Please share pricing and details.`)}" target="_blank" rel="noopener">${p.custom ? "Build my package" : `Get ${esc(p.name)} quote`}</a>
      </article>`).join("");
  };

  R["addons"] = (el) => {
    el.innerHTML = C.packages.addons.map((a) => `<div class="addon"><b>${esc(a.name)}</b>${a.price ? `<span>${esc(a.price)}</span>` : `<a href="${wa(`Hi YAP! Please share the price for: ${a.name}`)}" target="_blank" rel="noopener">Ask price ↗</a>`}</div>`).join("");
  };

  R["packages-intro"] = (el) => { el.textContent = C.packages.intro; };

  R["stats"] = (el) => {
    el.innerHTML = C.stats.map((s) => `<div class="stat rv"><b><span data-count="${s.value}">0</span><em>${esc(s.suffix)}</em></b><span>${esc(s.label)}</span></div>`).join("");
  };

  R["categories"] = (el) => {
    el.innerHTML = C.clientCategories.map((c) => `<div class="cat rv"><b>${c.count}<small>+</small></b><span>${esc(c.name)}</span></div>`).join("");
  };

  R["logos"] = (el) => {
    if (!C.clients.length) { el.closest("section")?.remove(); return; }
    el.innerHTML = C.clients.map((c) => `<div>${c.logo ? `<img src="${esc(c.logo)}" alt="${esc(c.name)}" loading="lazy">` : `<div><b>${esc(c.name)}</b><small>${esc(c.category || "")}</small></div>`}</div>`).join("") +
      `<a href="${wa("Hi YAP! I'd like my brand to be your next client.")}" target="_blank" rel="noopener" class="logo-next"><div><b>Your brand<span class="dot">.</span></b><small>Could be next →</small></div></a>`;
  };

  R["testimonials"] = (el) => {
    if (!C.testimonials.length) { el.closest("section")?.remove(); return; }
    el.innerHTML = C.testimonials.map((t) => `<figure class="quote rv"><p>${esc(t.quote)}</p><figcaption class="by"><span class="av">${esc(initials(t.name))}</span><div><b>${esc(t.name)}</b><small>${esc(t.role)}</small></div></figcaption></figure>`).join("");
  };

  R["faq"] = (el) => {
    el.innerHTML = C.faq.map((f, i) => `<details ${i === 0 ? "open" : ""}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
  };

  R["contact-items"] = (el) => {
    const tel = S.phone.replace(/\s/g, "");
    el.innerHTML = `
      <a class="c-item wa" href="${wa()}" target="_blank" rel="noopener"><span class="ci">${WA_SVG}</span><div><small>WhatsApp · fastest</small><b>${esc(S.phone)}</b></div></a>
      <a class="c-item" href="tel:${tel}"><span class="ci">${icon("phone")}</span><div><small>Call directly</small><b>${esc(S.phone)}</b></div></a>
      ${S.email ? `<a class="c-item" href="mailto:${esc(S.email)}"><span class="ci">${icon("mail")}</span><div><small>Email</small><b>${esc(S.email)}</b></div></a>` : ""}
      <div class="c-item"><span class="ci">${icon("pin")}</span><div><small>Studio</small><b>${esc(S.location)}</b></div></div>
      <div class="c-item"><span class="ci">${icon("clock")}</span><div><small>Hours</small><b>${esc(S.hours)}</b></div></div>`;
  };

  R["contact-form"] = (form) => {
    const svcBox = $("#f-services", form);
    const pre = new URLSearchParams(location.search).get("service");
    if (svcBox) svcBox.innerHTML = C.services.map((s, i) => `<label><input type="checkbox" name="services" value="${esc(s.title)}" id="svc-${i}" ${pre === s.title ? "checked" : ""}><span>${esc(s.title)}</span></label>`).join("");
    const pk = $("#f-package", form);
    if (pk) pk.innerHTML = `<option value="">Not sure yet</option>` + C.packages.plans.map((p) => `<option>${esc(p.name)}</option>`).join("");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form), err = $(".form-err", form);
      const name = (f.get("name") || "").trim(), phone = (f.get("phone") || "").trim();
      if (!name || !phone) { err.textContent = "Please add your name and WhatsApp number so we can reply."; err.classList.add("show"); return; }
      err.classList.remove("show");
      const lines = [
        "Hi YAP! New project enquiry from your website:", "",
        `Name: ${name}`, `Phone: ${phone}`,
        f.get("business") && `Business: ${f.get("business")}`,
        f.get("industry") && `Industry: ${f.get("industry")}`,
        f.getAll("services").length && `Services: ${f.getAll("services").join(", ")}`,
        f.get("package") && `Package: ${f.get("package")}`,
        f.get("message") && `Details: ${f.get("message")}`
      ].filter(Boolean);
      window.open(wa(lines.join("\n")), "_blank", "noopener");
    });
  };

  R["year"] = (el) => { el.textContent = new Date().getFullYear(); };
  R["site"] = (el) => { el.textContent = S[el.dataset.key] ?? ""; };
  R["wa-link"] = (el) => { el.href = wa(el.dataset.msg); el.target = "_blank"; el.rel = "noopener"; };
  R["tel-link"] = (el) => { el.href = "tel:" + S.phone.replace(/\s/g, ""); };

  /* ---------- interactions ---------- */
  function reveal() {
    const els = $$(".rv");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      const sib = [...en.target.parentElement.children].filter((c) => c.classList.contains("rv"));
      en.target.style.transitionDelay = Math.min(sib.indexOf(en.target), 6) * 70 + "ms";
      en.target.classList.add("in"); io.unobserve(en.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => io.observe(e));
    /* safety: kuch bhi chhupa na reh jaye */
    setTimeout(() => els.forEach((e) => { if (e.getBoundingClientRect().top < innerHeight) e.classList.add("in"); }), 1200);
  }

  function counters() {
    const els = $$("[data-count]");
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, end = +el.dataset.count, t0 = performance.now(), dur = 1600;
      const dec = (String(el.dataset.count).split(".")[1] || "").length;
      const fmt = (n) => n.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec });
      const tick = (t) => { const p = Math.min((t - t0) / dur, 1); el.textContent = fmt(end * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); io.unobserve(el);
    }), { threshold: 0.4 });
    els.forEach((e) => io.observe(e));
  }

  function statement() {
    const el = $(".statement[data-scrub]"); if (!el) return;
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span> `).join("");
    const words = $$(".w", el);
    const run = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.4), 0), 1);
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("lit", i < n));
    };
    addEventListener("scroll", run, { passive: true }); run();
  }

  function cursor() {
    if (matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const c = document.createElement("div"); c.className = "cursor"; document.body.appendChild(c);
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; c.style.opacity = 1; });
    document.addEventListener("mouseleave", () => (c.style.opacity = 0));
    (function loop() { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", (e) => c.classList.toggle("big", !!e.target.closest("a,button,.work,summary,label")));
  }

  /* ---------- SEO: page meta + structured data ---------- */
  function seo() {
    const ld = { "@context": "https://schema.org", "@type": "ProfessionalService", name: S.name, url: `https://${S.domain}/`, telephone: S.phone, founder: { "@type": "Person", name: S.founder }, image: `https://${S.domain}/assets/img/og-image.png`, areaServed: "IN", description: C.hero.sub };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
  }

  /* ---------- boot ---------- */
  header();
  $$("[data-render]").forEach((el) => { const fn = R[el.dataset.render]; if (fn) fn(el); });
  footer();
  whatsappWidget();
  reveal(); counters(); statement(); cursor(); seo();
})();
