/* ==========================================================
   YAP Digital Marketing — Catalog App Logic
   ========================================================== */
(() => {
  "use strict";

  const GST_RATE = 0.18;
  const STORAGE_KEY = "yap-quote-basket";
  const THEME_KEY = "yap-theme";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const state = {
    category: "all",
    search: "",
    billing: "all",
    sort: "featured",
    cart: loadCart(),
  };

  /* ---------- Helpers ---------- */
  const money = (n) => CURRENCY + Math.round(n).toLocaleString("en-IN");
  const billingLabel = (b) => (b === "month" ? "/month" : "one-time");
  const categoryName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const findItem = (id) => SERVICES.find((s) => s.id === id) || PACKAGES.find((p) => p.id === id);

  function safeStorage(fn, fallback) {
    try { return fn(); } catch { return fallback; }
  }
  function loadCart() {
    const ids = safeStorage(() => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [], []);
    return Array.isArray(ids) ? ids.filter((id) => findItem(id)) : [];
  }
  function saveCart() {
    safeStorage(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart)));
  }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* ---------- Category chips ---------- */
  function renderChips() {
    $("#categoryChips").innerHTML = CATEGORIES.map((c) => {
      const count = c.id === "all" ? SERVICES.length : SERVICES.filter((s) => s.category === c.id).length;
      return `<button class="chip ${state.category === c.id ? "active" : ""}" data-cat="${c.id}" role="tab"
                aria-selected="${state.category === c.id}">${c.icon} ${esc(c.name)} <small>${count}</small></button>`;
    }).join("");
  }

  /* ---------- Filtering ---------- */
  function filteredServices() {
    const q = state.search.trim().toLowerCase();
    let list = SERVICES.filter((s) => {
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
    return `<button class="btn btn-primary ${extraClass} ${inCart ? "added" : ""}" data-add="${id}">
              ${inCart ? "✓ Added" : "+ Add to quote"}</button>`;
  }

  function serviceCard(s, i) {
    const shown = s.features.slice(0, 4);
    const extra = s.features.length - shown.length;
    return `
      <article class="card" style="animation-delay:${i * 40}ms">
        ${s.popular ? '<span class="ribbon">★ Popular</span>' : ""}
        <span class="cat">${esc(categoryName(s.category))}</span>
        <h3>${esc(s.name)}</h3>
        <p class="tagline">${esc(s.tagline)}</p>
        <div class="price">${money(s.price)} <small>${billingLabel(s.billing)}</small></div>
        <ul class="features">
          ${shown.map((f) => `<li>${esc(f)}</li>`).join("")}
          ${extra > 0 ? `<li class="more">${extra} more included</li>` : ""}
        </ul>
        <p class="meta">⏱ ${esc(s.delivery)}</p>
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

  /* ---------- Testimonials & contact ---------- */
  function renderTestimonials() {
    $("#testimonialGrid").innerHTML = TESTIMONIALS.map((t) => `
      <figure class="quote">
        <div class="stars">★★★★★</div>
        <p>“${esc(t.text)}”</p>
        <figcaption class="who">
          <span class="avatar">${esc(t.name.charAt(0))}</span>
          <span><b>${esc(t.name)}</b><small>${esc(t.role)}</small></span>
        </figcaption>
      </figure>`).join("");
  }

  function renderContact() {
    $("#contactList").innerHTML = `
      <li><a href="tel:${CONTACT.phone.replace(/\s/g, "")}"><i>📞</i>${esc(CONTACT.phone)}</a></li>
      <li><a href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener"><i>💬</i>Chat on WhatsApp</a></li>
      <li><a href="mailto:${CONTACT.email}"><i>✉️</i>${esc(CONTACT.email)}</a></li>
      <li><span><i>📍</i>${esc(CONTACT.address)}</span></li>`;

    $("#interestSelect").innerHTML =
      `<option value="">Select a service…</option>` +
      CATEGORIES.filter((c) => c.id !== "all").map((c) =>
        `<optgroup label="${esc(c.name)}">${SERVICES.filter((s) => s.category === c.id)
          .map((s) => `<option>${esc(s.name)}</option>`).join("")}</optgroup>`).join("") +
      `<optgroup label="Packages">${PACKAGES.map((p) => `<option>${esc(p.name)} Package</option>`).join("")}</optgroup>`;
  }

  /* ---------- Modal ---------- */
  function openModal(id) {
    const s = SERVICES.find((x) => x.id === id);
    if (!s) return;
    $("#modalBody").innerHTML = `
      <span class="cat" style="color:var(--primary);font-weight:600;font-size:.8rem;text-transform:uppercase">${esc(categoryName(s.category))}</span>
      <h3 id="modalTitle">${esc(s.name)}</h3>
      <p class="tagline">${esc(s.tagline)}</p>
      <div class="price">${money(s.price)} <small>${billingLabel(s.billing)} + GST</small></div>
      <ul class="features">${s.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <p class="meta">⏱ ${esc(s.delivery)}</p>
      ${s.note ? `<p class="note">ℹ️ ${esc(s.note)}</p>` : ""}
      <div class="card-actions">${addButton(s.id)}</div>`;
    $("#modalOverlay").hidden = false;
    document.body.classList.add("no-scroll");
    $("#modalClose").focus();
  }
  function closeModal() {
    $("#modalOverlay").hidden = true;
    document.body.classList.remove("no-scroll");
  }

  /* ---------- Cart / quote basket ---------- */
  function toggleCart(id) {
    const item = findItem(id);
    if (!item) return;
    if (state.cart.includes(id)) {
      state.cart = state.cart.filter((x) => x !== id);
      toast(`Removed “${item.name}”`);
    } else {
      state.cart.push(id);
      toast(`Added “${item.name}” to your quote`);
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
      : `<div class="cart-empty"><p>🧾 Your quote basket is empty.</p><p><small>Add services from the catalog to build a custom plan.</small></p></div>`;

    $("#cartTotals").innerHTML = t.items.length ? `
      ${t.monthly ? `<div><span>Monthly retainers</span><span>${money(t.monthly)}/mo</span></div>` : ""}
      ${t.oneTime ? `<div><span>One-time projects</span><span>${money(t.oneTime)}</span></div>` : ""}
      <div><span>GST (18%)</span><span>${money(t.gst)}</span></div>
      <div class="grand"><span>First invoice (est.)</span><span>${money(t.total)}</span></div>` : "";

    ["#sendWhatsApp", "#sendEmail", "#printQuote", "#clearCart"].forEach((sel) => ($(sel).disabled = !t.items.length));
  }

  function quoteText() {
    const t = totals();
    const lines = t.items.map((i) => `• ${i.name} — ${money(i.price)} ${billingLabel(i.billing)}`);
    return [
      "Hi YAP Digital Marketing! I'd like a quote for:",
      "",
      ...lines,
      "",
      t.monthly ? `Monthly: ${money(t.monthly)}/mo` : "",
      t.oneTime ? `One-time: ${money(t.oneTime)}` : "",
      `Estimated first invoice incl. GST: ${money(t.total)}`,
    ].filter((l, idx, arr) => l !== "" || arr[idx - 1] !== "").join("\n");
  }

  function openCart() {
    $("#cartDrawer").classList.add("open");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    $("#cartOverlay").hidden = false;
    document.body.classList.add("no-scroll");
  }
  function closeCart() {
    $("#cartDrawer").classList.remove("open");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    $("#cartOverlay").hidden = true;
    document.body.classList.remove("no-scroll");
  }

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    $("#themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
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
      msg.textContent = "Please fill in your name, a valid phone number and email.";
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    const body = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nInterested in: ${data.interest || "-"}\n\n${data.message || ""}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("New enquiry from " + data.name)}&body=${encodeURIComponent(body)}`;
    msg.className = "form-msg ok";
    msg.textContent = "Thanks! Your email app should open — hit send and we'll reply within 24 hours.";
    form.reset();
  }

  /* ---------- Events ---------- */
  function bindEvents() {
    $("#categoryChips").addEventListener("click", (e) => {
      const chip = e.target.closest("[data-cat]");
      if (!chip) return;
      state.category = chip.dataset.cat;
      renderChips();
      renderServices();
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

    // Delegated clicks for add / details / remove
    document.addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      if (add) return toggleCart(add.dataset.add);
      const det = e.target.closest("[data-details]");
      if (det) return openModal(det.dataset.details);
      const rem = e.target.closest("[data-remove]");
      if (rem) return toggleCart(rem.dataset.remove);
    });

    $("#modalClose").addEventListener("click", closeModal);
    $("#modalOverlay").addEventListener("click", (e) => { if (e.target.id === "modalOverlay") closeModal(); });

    $("#cartOpen").addEventListener("click", openCart);
    $("#cartClose").addEventListener("click", closeCart);
    $("#cartOverlay").addEventListener("click", closeCart);
    $("#clearCart").addEventListener("click", () => {
      state.cart = []; saveCart(); refreshAddButtons(); renderCart(); toast("Quote basket cleared");
    });
    $("#sendWhatsApp").addEventListener("click", () => {
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(quoteText())}`, "_blank", "noopener");
    });
    $("#sendEmail").addEventListener("click", () => {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(quoteText())}`;
    });
    $("#printQuote").addEventListener("click", () => window.print());

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("#modalOverlay").hidden) closeModal();
      else if ($("#cartDrawer").classList.contains("open")) closeCart();
    });

    $("#themeToggle").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      safeStorage(() => localStorage.setItem(THEME_KEY, next));
    });

    $("#menuToggle").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
    $$("#navLinks a").forEach((a) => a.addEventListener("click", () => $("#navLinks").classList.remove("open")));

    $("#contactForm").addEventListener("submit", handleForm);
  }

  /* ---------- Init ---------- */
  function init() {
    const savedTheme = safeStorage(() => localStorage.getItem(THEME_KEY), null);
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

    $("#year").textContent = new Date().getFullYear();
    renderChips();
    renderServices();
    renderPackages();
    renderTestimonials();
    renderContact();
    renderCart();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
