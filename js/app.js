/* ==========================================================
   YAP Digital Marketing Agency: site logic
   Services catalog, work samples, quote basket, contact form.
   ========================================================== */
(() => {
  "use strict";

  const GST_RATE = 0.18;
  const STORAGE_KEY = "yap-quote-basket";
  const YA = window.YA || null;            // portfolio data (optional)

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const state = { category: "all", search: "", billing: "all", sort: "featured", work: "all", cart: loadCart() };

  /* ---------- Helpers ---------- */
  const money = (n) => CURRENCY + Math.round(n).toLocaleString("en-IN");
  const billingLabel = (b) => (b === "month" ? "/month" : "one-time");
  const categoryName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const findItem = (id) => SERVICES.find((s) => s.id === id) || PACKAGES.find((p) => p.id === id);
  const igUrl = "https://instagram.com/" + CONTACT.instagram;
  const waLink = (text) => `https://wa.me/${CONTACT.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;

  function safeStorage(fn, fallback) { try { return fn(); } catch { return fallback; } }
  function loadCart() {
    const ids = safeStorage(() => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [], []);
    return Array.isArray(ids) ? ids.filter((id) => findItem(id)) : [];
  }
  function saveCart() { safeStorage(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart))); }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function copyText(text, okMsg = "Copied") {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      toast(ok ? okMsg : "Copy failed. Select the text manually.");
    };
    try { navigator.clipboard.writeText(text).then(() => toast(okMsg), fallback); } catch { fallback(); }
  }

  // Client projects only (the personal portfolio is not a client)
  const brands = () => (YA ? YA.projects.filter((p) => p.id !== "personal-portfolio") : []);

  /* ---------- Hero ---------- */
  function renderHero() {
    const stats = [{ v: SERVICES.length, l: "Services" }];
    if (YA) {
      stats.push({ v: brands().length, l: "Brands served" });
      stats.push({ v: YA.totals.video + YA.totals.reel, l: "Reels & videos" });
      stats.push({ v: YA.items.length, l: "Pieces created" });
    } else {
      stats.push({ v: "2", l: "Cities" }, { v: "24h", l: "Quote turnaround" }, { v: "1", l: "Team for everything" });
    }
    $("#heroStats").innerHTML = stats.map((s) => `<li><strong>${esc(s.v)}</strong><span>${esc(s.l)}</span></li>`).join("");
    $("#heroHandle").textContent = "@" + CONTACT.instagram;

    const media = $("#heroMedia");
    const reel = YA && (YA.items.find((i) => i.type === "video" && /Holi 2k25/.test(i.caption)) || (YA.project("fakira") || {}).heroVideo);
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reel) {
      media.innerHTML = `<video muted loop playsinline ${reduce ? "" : "autoplay"} preload="metadata"
        poster="${esc(YA.src(reel.img))}" src="${esc(YA.src(reel.video))}"></video>`;
    } else {
      media.innerHTML = `<span class="wordmark">yap<i class="dot"></i></span>`;
    }
  }

  /* ---------- Client marquee ---------- */
  function renderMarquee() {
    if (!YA) return;
    const names = brands().map((p) => p.title);
    const row = names.map((n) => `<span>${esc(n)}</span>`).join("");
    $("#marquee").innerHTML = row + row;     // doubled for a seamless loop
    $("#marqueeWrap").hidden = false;
  }

  /* ---------- Category chips ---------- */
  function renderChips() {
    $("#categoryChips").innerHTML = CATEGORIES.map((c) => {
      const count = c.id === "all" ? SERVICES.length : SERVICES.filter((s) => s.category === c.id).length;
      const on = state.category === c.id;
      return `<button class="chip ${on ? "active" : ""}" data-cat="${c.id}" role="tab" aria-selected="${on}">${esc(c.name)} <small>${count}</small></button>`;
    }).join("");
  }

  /* ---------- Filtering ---------- */
  function filteredServices() {
    const q = state.search.trim().toLowerCase();
    const list = SERVICES.filter((s) => {
      if (state.category !== "all" && s.category !== state.category) return false;
      if (state.billing !== "all" && s.billing !== state.billing) return false;
      if (!q) return true;
      const hay = [s.name, s.tagline, categoryName(s.category), ...s.features].join(" ").toLowerCase();
      return q.split(/\s+/).every((word) => hay.includes(word));
    });
    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
      featured: (a, b) => Number(b.popular) - Number(a.popular),
    };
    return [...list].sort(sorters[state.sort]);
  }

  /* ---------- Service cards ---------- */
  function addButton(id, extraClass = "") {
    const inCart = state.cart.includes(id);
    return `<button class="btn ${inCart ? "added" : "btn-gold"} ${extraClass}" data-add="${id}">${inCart ? "✓ Added" : "+ Add to quote"}</button>`;
  }

  function serviceCard(s) {
    const shown = s.features.slice(0, 4);
    const extra = s.features.length - shown.length;
    return `
      <article class="card">
        ${s.popular ? '<span class="ribbon">Popular</span>' : ""}
        <span class="cat">${esc(categoryName(s.category))}</span>
        <h3>${esc(s.name)}</h3>
        <p class="tagline">${esc(s.tagline)}</p>
        <div class="price">${money(s.price)} <small>${billingLabel(s.billing)}</small></div>
        <ul class="features">
          ${shown.map((f) => `<li>${esc(f)}</li>`).join("")}
          ${extra > 0 ? `<li class="more">${extra} more included</li>` : ""}
        </ul>
        <p class="meta">${esc(s.delivery)}</p>
        <div class="card-actions">
          <button class="btn btn-ghost" data-details="${s.id}">Details</button>
          ${addButton(s.id)}
        </div>
      </article>`;
  }

  function renderServices() {
    const list = filteredServices();
    $("#serviceGrid").innerHTML = list.map(serviceCard).join("");
    $("#emptyState").hidden = list.length > 0;
    $("#resultCount").textContent = `Showing ${list.length} of ${SERVICES.length} services`;
  }

  /* ---------- Work (from the portfolio) ---------- */
  const WORK_LIMIT = 12;
  let workList = [];
  function pickWork() {
    // A mix per brand: videos first, then graphics, a few from each client
    const pool = state.work === "all" ? YA.projects : YA.projects.filter((p) => p.category === state.work);
    const out = [];
    for (let round = 0; out.length < WORK_LIMIT && round < 6; round++) {
      pool.forEach((p) => {
        const ordered = p.items.filter((i) => i.type === "video").concat(p.items.filter((i) => i.type !== "video"));
        if (ordered[round] && out.length < WORK_LIMIT) out.push(ordered[round]);
      });
    }
    return out;
  }
  function renderWorkChips() {
    const cats = ["all", ...YA.categories.map((c) => c.name)];
    $("#workChips").innerHTML = cats.map((c) => {
      const on = state.work === c;
      return `<button class="chip ${on ? "active" : ""}" data-work="${esc(c)}">${c === "all" ? "All work" : esc(c)}</button>`;
    }).join("");
  }
  function renderWork() {
    workList = pickWork();
    $("#workGrid").innerHTML = workList.map((it, i) => `
      <button class="work" data-w="${i}" aria-label="Open ${esc(it.caption)}">
        <img loading="lazy" alt="" src="${esc(YA.src(it.img))}" />
        ${it.type === "video" ? '<span class="play">▶</span>' : ""}
        <span class="shade"><small>${esc(it.projectTitle)}</small><b>${esc(it.caption)}</b></span>
      </button>`).join("");
  }
  function initWork() {
    if (!YA) return;
    $("#work").hidden = false;
    $("#workIntro").textContent = `${brands().length} brands across restaurants, cafes, hotels, gyms and retail. Tap any piece to view it.`;
    renderWorkChips();
    renderWork();
  }

  /* ---------- Packages ---------- */
  function renderPackages() {
    $("#packageGrid").innerHTML = PACKAGES.map((p) => {
      const items = p.includes.map(findItem).filter(Boolean);
      const original = items.reduce((sum, s) => sum + s.price, 0);
      return `
        <article class="package ${p.featured ? "featured" : ""}">
          ${original > p.price ? `<span class="save">Save ${Math.round((1 - p.price / original) * 100)}%</span>` : ""}
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.description)}</p>
          <div class="price">${money(p.price)} <small>${billingLabel(p.billing)}</small>
            ${original > p.price ? `<span class="old">${money(original)}</span>` : ""}</div>
          <ul>${items.map((s) => `<li>${esc(s.name)}</li>`).join("")}</ul>
          ${addButton(p.id, "block")}
        </article>`;
    }).join("");
  }

  /* ---------- Instagram ---------- */
  function renderInstagram() {
    $("#igTitle").textContent = "@" + CONTACT.instagram;
    ["#igFollow", "#igTop"].forEach((s) => ($(s).href = igUrl));
    const tiles = YA ? YA.items.filter((i) => i.type !== "video" && i.img).filter((_, i) => i % 7 === 0).slice(0, 9) : [];
    $("#igTiles").innerHTML = tiles.length
      ? tiles.map((t) => `<img loading="lazy" alt="" src="${esc(YA.src(t.img))}" />`).join("")
      : Array.from({ length: 9 }, () => '<div class="ph"></div>').join("");
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    const rows = [
      { k: "WhatsApp", v: CONTACT.phone, href: waLink("Hi YAP! I want to grow my brand online."), act: "Chat" },
      { k: "Instagram", v: "@" + CONTACT.instagram, href: igUrl, act: "Follow" },
      { k: "Phone", v: CONTACT.phone },
      { k: "Email", v: CONTACT.email },
      { k: "Location", v: CONTACT.address, none: true },
    ];
    $("#contactList").innerHTML = rows.map((r) => `
      <li><span class="k">${r.k}</span><span class="v">${esc(r.v)}</span>
        ${r.href ? `<a class="act" href="${esc(r.href)}" target="_blank" rel="noopener">${r.act}</a>`
          : r.none ? "<span></span>" : `<button class="act" data-copy="${esc(r.v)}">Copy</button>`}
      </li>`).join("");

    $("#interestSelect").innerHTML =
      `<option value="">Select a service…</option>` +
      CATEGORIES.filter((c) => c.id !== "all").map((c) =>
        `<optgroup label="${esc(c.name)}">${SERVICES.filter((s) => s.category === c.id)
          .map((s) => `<option>${esc(s.name)}</option>`).join("")}</optgroup>`).join("") +
      `<optgroup label="Packages">${PACKAGES.map((p) => `<option>${esc(p.name)} package</option>`).join("")}</optgroup>`;
  }

  /* ---------- Modal ---------- */
  function openModal(id) {
    const s = SERVICES.find((x) => x.id === id);
    if (!s) return;
    $("#modalBody").innerHTML = `
      <span class="kicker">${esc(categoryName(s.category))}</span>
      <h3 id="modalTitle">${esc(s.name)}</h3>
      <p class="tagline">${esc(s.tagline)}</p>
      <div class="price">${money(s.price)} <small>${billingLabel(s.billing)} + GST</small></div>
      <ul class="features">${s.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <p class="meta">${esc(s.delivery)}</p>
      ${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}
      <div class="card-actions">${addButton(s.id)}</div>`;
    $("#modalOverlay").hidden = false;
    document.body.classList.add("no-scroll");
    $("#modalClose").focus();
  }
  function closeModal() {
    $("#modalOverlay").hidden = true;
    document.body.classList.remove("no-scroll");
  }

  /* ---------- Quote basket ---------- */
  function toggleCart(id) {
    const item = findItem(id);
    if (!item) return;
    if (state.cart.includes(id)) {
      state.cart = state.cart.filter((x) => x !== id);
      toast(`Removed ${item.name}`);
    } else {
      state.cart.push(id);
      toast(`Added ${item.name}`);
      const badge = $("#cartCount");
      badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");
    }
    saveCart();
    refreshAddButtons();
    renderCart();
  }

  function refreshAddButtons() {
    $$("[data-add]").forEach((btn) => {
      const inCart = state.cart.includes(btn.dataset.add);
      btn.classList.toggle("added", inCart);
      btn.classList.toggle("btn-gold", !inCart);
      btn.textContent = inCart ? "✓ Added" : "+ Add to quote";
    });
  }

  function totals() {
    const items = state.cart.map(findItem).filter(Boolean);
    const monthly = items.filter((i) => i.billing === "month").reduce((s, i) => s + i.price, 0);
    const oneTime = items.filter((i) => i.billing !== "month").reduce((s, i) => s + i.price, 0);
    const subtotal = monthly + oneTime;
    const gst = subtotal * GST_RATE;
    return { items, monthly, oneTime, subtotal, gst, total: subtotal + gst };
  }

  function quoteText() {
    const t = totals();
    const lines = t.items.map((i) => `• ${i.name}: ${money(i.price)} ${billingLabel(i.billing)}`);
    return [
      "Hi YAP Digital Marketing Agency! I'd like a quote for:",
      "",
      ...lines,
      "",
      t.monthly ? `Monthly: ${money(t.monthly)}/mo` : "",
      t.oneTime ? `One-time: ${money(t.oneTime)}` : "",
      `Estimated first invoice incl. GST: ${money(t.total)}`,
    ].filter((l, idx, arr) => l !== "" || arr[idx - 1] !== "").join("\n");
  }

  function renderCart() {
    const t = totals();
    $("#cartCount").textContent = t.items.length;
    $("#cartItems").innerHTML = t.items.length
      ? t.items.map((i) => `
          <div class="cart-item">
            <div><b>${esc(i.name)}</b><small>${i.category ? esc(categoryName(i.category)) : "Package"}</small></div>
            <div class="right">
              <b>${money(i.price)}</b><small>${billingLabel(i.billing)}</small><br />
              <button class="remove" data-remove="${i.id}">Remove</button>
            </div>
          </div>`).join("")
      : `<div class="cart-empty"><p>Your quote basket is empty.</p><p><small>Add services or a package to build your plan.</small></p></div>`;

    $("#cartTotals").innerHTML = t.items.length ? `
      ${t.monthly ? `<div><span>Monthly plans</span><span>${money(t.monthly)}/mo</span></div>` : ""}
      ${t.oneTime ? `<div><span>One-time projects</span><span>${money(t.oneTime)}</span></div>` : ""}
      <div><span>GST (18%)</span><span>${money(t.gst)}</span></div>
      <div class="grand"><span>First invoice (est.)</span><span>${money(t.total)}</span></div>` : "";

    ["#copyQuote", "#clearCart"].forEach((sel) => ($(sel).disabled = !t.items.length));
    const wa = $("#sendWhatsApp");
    wa.href = t.items.length ? waLink(quoteText()) : "#";
    wa.classList.toggle("is-disabled", !t.items.length);
    wa.setAttribute("aria-disabled", String(!t.items.length));
  }

  function openCart() {
    $("#cartDrawer").classList.add("open");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    $("#cartOverlay").hidden = false;
    document.body.classList.add("no-scroll");
    $("#cartClose").focus();
  }
  function closeCart() {
    $("#cartDrawer").classList.remove("open");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    $("#cartOverlay").hidden = true;
    document.body.classList.remove("no-scroll");
  }

  /* ---------- Contact form ---------- */
  function handleForm(e) {
    e.preventDefault();
    const form = e.target;
    const msg = $("#formMsg");
    let valid = true;
    $$("input[required]", form).forEach((input) => {
      const ok = input.value.trim() && input.checkValidity();
      input.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      msg.className = "form-msg err";
      msg.textContent = "Please add your name and a phone number.";
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const body = `Hi YAP! New enquiry:\nName: ${d.name}\nPhone: ${d.phone}\nBusiness: ${d.business || "-"}\nInterested in: ${d.interest || "-"}\n\n${d.message || ""}`;
    msg.className = "form-msg ok";
    msg.innerHTML = `Your enquiry is ready. <a href="${esc(waLink(body))}" target="_blank" rel="noopener">Tap here to send it on WhatsApp</a>.`;
  }

  /* ---------- Events ---------- */
  function bindEvents() {
    $("#categoryChips").addEventListener("click", (e) => {
      const chip = e.target.closest("[data-cat]");
      if (!chip) return;
      state.category = chip.dataset.cat;
      renderChips(); renderServices();
    });

    let searchTimer;
    $("#searchInput").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { state.search = e.target.value; renderServices(); }, 150);
    });
    $("#billingFilter").addEventListener("change", (e) => { state.billing = e.target.value; renderServices(); });
    $("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; renderServices(); });
    $("#resetFilters").addEventListener("click", () => {
      Object.assign(state, { category: "all", search: "", billing: "all", sort: "featured" });
      $("#searchInput").value = ""; $("#billingFilter").value = "all"; $("#sortSelect").value = "featured";
      renderChips(); renderServices();
    });

    document.addEventListener("click", (e) => {
      let t;
      if ((t = e.target.closest("[data-add]"))) return toggleCart(t.dataset.add);
      if ((t = e.target.closest("[data-details]"))) return openModal(t.dataset.details);
      if ((t = e.target.closest("[data-remove]"))) return toggleCart(t.dataset.remove);
      if ((t = e.target.closest("[data-copy]"))) return copyText(t.dataset.copy);
      if ((t = e.target.closest("[data-work]"))) { state.work = t.dataset.work; renderWorkChips(); renderWork(); return; }
      if ((t = e.target.closest("[data-w]")) && YA) return YA.lightbox(workList, +t.dataset.w);
    });

    $("#modalClose").addEventListener("click", closeModal);
    $("#modalOverlay").addEventListener("click", (e) => { if (e.target.id === "modalOverlay") closeModal(); });

    $("#cartOpen").addEventListener("click", openCart);
    $("#cartClose").addEventListener("click", closeCart);
    $("#cartOverlay").addEventListener("click", closeCart);
    $("#clearCart").addEventListener("click", () => {
      state.cart = []; saveCart(); refreshAddButtons(); renderCart(); toast("Quote basket cleared");
    });
    $("#sendWhatsApp").addEventListener("click", (e) => { if (!state.cart.length) e.preventDefault(); });
    $("#copyQuote").addEventListener("click", () => copyText(quoteText(), "Quote copied"));

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("#modalOverlay").hidden) closeModal();
      else if ($("#cartDrawer").classList.contains("open")) closeCart();
    });

    const menu = $("#menuToggle");
    menu.addEventListener("click", () => {
      const open = $("#navLinks").classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    $$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
      $("#navLinks").classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }));

    $("#contactForm").addEventListener("submit", handleForm);
  }

  /* ---------- Init ---------- */
  function init() {
    $("#year").textContent = new Date().getFullYear();
    renderHero();
    renderMarquee();
    renderChips();
    renderServices();
    initWork();
    renderPackages();
    renderInstagram();
    renderContact();
    renderCart();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
