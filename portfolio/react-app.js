/* ==========================================================
   Yash Agarwal Media Library: React 18 + htm (no build step)
   Components: App > Sidebar, FilterBar, Grid > Card, Lightbox
   ========================================================== */
(function () {
  "use strict";
  var React = window.React;
  var html = window.htm.bind(React.createElement);
  var useState = React.useState, useMemo = React.useMemo, useEffect = React.useEffect, useRef = React.useRef, useCallback = React.useCallback;
  var Y = window.YA;
  var PAGE = 48;

  var TYPES = [
    { id: "all", label: "All" },
    { id: "video", label: "Videos" },
    { id: "reel", label: "Reels" },
    { id: "photo", label: "Photos" },
  ];
  var TYPE_LABEL = { video: "▶ Video", reel: "Reel", photo: "Photo" };

  function readPref(key, fallback) {
    try { var v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; }
  }
  function isDark() {
    var t = document.documentElement.dataset.theme;
    return t ? t === "dark" : !!(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function writePref(key, v) { try { localStorage.setItem(key, v); } catch (e) {} }

  /* ---------- Sidebar ---------- */
  function Sidebar(props) {
    var C = Y.contact, P = Y.profile;
    var rows = [
      { k: "WhatsApp", v: C.phonePretty, href: C.waLink("Hi Yash, I browsed your media library."), label: "Chat" },
      { k: "Phone", v: C.phonePretty },
      { k: "Email", v: C.email },
      { k: "Instagram", v: C.instagram, href: C.instagramUrl, label: "Open" },
    ];
    return html`
      <aside class="side">
        <div class="panel">
          <div class="avatar" aria-hidden="true">YA</div>
          <h1>${P.name}</h1>
          <p class="role">${P.eyebrow}</p>
          <div class="kpis">
            ${P.stats.slice(0, 2).map(function (s) { return html`<div class="kpi" key=${s.label}><b>${s.value}</b><span>${s.label}</span></div>`; })}
            <div class="kpi"><b>${Y.totals.video}</b><span>Videos here</span></div>
            <div class="kpi"><b>${Y.projects.length}</b><span>Clients</span></div>
          </div>
        </div>
        <div class="panel">
          <h2>Clients</h2>
          <div class="clients">
            <button class=${props.client === "all" ? "on" : ""} onClick=${function () { props.setClient("all"); }}>
              All clients <span>${Y.items.length}</span>
            </button>
            ${Y.projects.map(function (p) {
              return html`<button key=${p.id} class=${props.client === p.id ? "on" : ""} onClick=${function () { props.setClient(p.id); }}>
                ${p.title} <span>${p.total}</span></button>`;
            })}
          </div>
        </div>
        <div class="panel contact">
          <h2>Contact</h2>
          ${rows.map(function (r) {
            return html`<div class="c" key=${r.k}>
              <div><small>${r.k}</small><b>${r.v}</b></div>
              ${r.href
                ? html`<a class=${"mini" + (r.k === "WhatsApp" ? " hot" : "")} href=${r.href} target="_blank" rel="noopener">${r.label}</a>`
                : html`<button class="mini" onClick=${function () { props.copy(r.v); }}>Copy</button>`}
            </div>`;
          })}
        </div>
      </aside>`;
  }

  /* ---------- Filter bar ---------- */
  function FilterBar(props) {
    return html`
      <div class="bar" role="search">
        <label class="search">
          <span aria-hidden="true">⌕</span>
          <input id="q" type="search" placeholder="Search captions, e.g. coffee, offer, gym…" value=${props.q}
            onChange=${function (e) { props.setQ(e.target.value); }} aria-label="Search" />
        </label>
        <div class="seg" role="tablist" aria-label="Media type">
          ${TYPES.map(function (t) {
            return html`<button key=${t.id} role="tab" aria-selected=${props.type === t.id} class=${props.type === t.id ? "on" : ""}
              onClick=${function () { props.setType(t.id); }}>${t.label} ${t.id !== "all" ? Y.totals[t.id] : ""}</button>`;
          })}
        </div>
        <select id="industry" value=${props.industry} onChange=${function (e) { props.setIndustry(e.target.value); }} aria-label="Industry">
          <option value="all">All industries</option>
          ${Y.categories.map(function (c) { return html`<option key=${c.name} value=${c.name}>${c.name}</option>`; })}
        </select>
        <select id="sort" value=${props.sort} onChange=${function (e) { props.setSort(e.target.value); }} aria-label="Sort">
          <option value="client">Sort: by client</option>
          <option value="videos">Videos first</option>
          <option value="az">Caption A → Z</option>
        </select>
        <button class="icon" title="Bigger or smaller tiles" aria-label="Change tile size" onClick=${props.cycleSize}>⊞</button>
        <button class="icon" title="Light or dark" aria-label="Switch light or dark" onClick=${props.toggleTheme}>${props.dark ? "☀" : "☾"}</button>
      </div>`;
  }

  /* ---------- Card ---------- */
  function Card(props) {
    var it = props.item;
    var _h = useState(false), hover = _h[0], setHover = _h[1];
    var canHover = useMemo(function () { return window.matchMedia && matchMedia("(hover: hover)").matches; }, []);
    return html`
      <button class="card" onClick=${props.onOpen} aria-label=${"Open " + it.caption}
        onMouseEnter=${function () { if (canHover && it.type === "video") setHover(true); }}
        onMouseLeave=${function () { setHover(false); }}>
        <div class="thumb">
          <img loading="lazy" alt="" src=${Y.src(it.img)} />
          ${hover ? html`<video src=${Y.src(it.video)} muted autoPlay loop playsInline></video>` : null}
          <span class=${"badge " + it.type}>${TYPE_LABEL[it.type]}</span>
        </div>
        <div class="meta"><b>${it.caption}</b><span>${it.projectTitle}${it.section ? " · " + it.section : it.group ? " · " + it.group : ""}</span></div>
      </button>`;
  }

  /* ---------- Lightbox ---------- */
  function Lightbox(props) {
    var it = props.list[props.index];
    var closeRef = useRef(null);
    useEffect(function () {
      function onKey(e) {
        if (e.key === "Escape") props.onClose();
        if (e.key === "ArrowRight") props.onStep(1);
        if (e.key === "ArrowLeft") props.onStep(-1);
      }
      document.addEventListener("keydown", onKey);
      document.documentElement.style.overflow = "hidden";
      return function () { document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
    }, [props.onClose, props.onStep]);
    useEffect(function () { if (closeRef.current) closeRef.current.focus(); }, []);
    var touch = useRef(null);
    var p = Y.project(it.project);
    return html`
      <div class="lb" role="dialog" aria-modal="true" aria-label="Media viewer"
        onTouchStart=${function (e) { touch.current = e.touches[0].clientX; }}
        onTouchEnd=${function (e) { if (touch.current === null) return; var dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) props.onStep(dx < 0 ? 1 : -1); touch.current = null; }}>
        <div class="stage">
          ${it.type === "video"
            ? html`<video key=${it.id} src=${Y.src(it.video)} poster=${Y.src(it.img)} controls autoPlay playsInline></video>`
            : html`<img key=${it.id} src=${Y.src(it.img)} alt=${it.caption} />`}
          ${props.list.length > 1 ? html`<button class="nav l" aria-label="Previous" onClick=${function () { props.onStep(-1); }}>‹</button>
            <button class="nav r" aria-label="Next" onClick=${function () { props.onStep(1); }}>›</button>` : null}
        </div>
        <aside>
          <div style=${{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
            <span class="k">${TYPE_LABEL[it.type]} · ${props.index + 1} / ${props.list.length}</span>
            <button ref=${closeRef} class="mini" style=${{ color: "#fff", borderColor: "rgba(255,255,255,.3)" }} onClick=${props.onClose}>Close ✕</button>
          </div>
          <h3>${it.caption}</h3>
          <div><div class="k">Client</div>${it.projectTitle}</div>
          <div><div class="k">Industry</div>${it.category}</div>
          ${it.group || it.section ? html`<div><div class="k">Collection</div>${[it.group, it.section].filter(Boolean).join(" · ")}</div>` : null}
          ${p && p.summary ? html`<p style=${{ color: "#9aa0ad", fontSize: "14px" }}>${p.summary}</p>` : null}
          <a class="lbtn" target="_blank" rel="noopener"
            href=${Y.contact.waLink("Hi Yash, I liked \"" + it.caption + "\" (" + it.projectTitle + "). Can you make something similar for my brand?")}>
            Want something like this? WhatsApp</a>
          <button class="mini" style=${{ color: "#fff", borderColor: "rgba(255,255,255,.3)", justifySelf: "start" }}
            onClick=${function () { props.onFilterClient(it.project); }}>See all from ${it.projectTitle}</button>
        </aside>
      </div>`;
  }

  /* ---------- App ---------- */
  var SIZES = ["150px", "200px", "260px"];
  function App() {
    var _q = useState(""), q = _q[0], setQ = _q[1];
    var _t = useState("all"), type = _t[0], setType = _t[1];
    var _c = useState(function () { var h = location.hash.slice(1); return Y.project(h) ? h : "all"; }), client = _c[0], setClientRaw = _c[1];
    var _i = useState("all"), industry = _i[0], setIndustry = _i[1];
    var _s = useState("client"), sort = _s[0], setSort = _s[1];
    var _n = useState(PAGE), limit = _n[0], setLimit = _n[1];
    var _z = useState(function () { var v = +readPref("ya-react-size", 1); return v >= 0 && v < 3 ? v : 1; }), size = _z[0], setSize = _z[1];
    var _o = useState(null), open = _o[0], setOpen = _o[1];
    var _m = useState(""), msg = _m[0], setMsg = _m[1];
    var _d = useState(function () { return isDark(); }), dark = _d[0], setDark = _d[1];

    useEffect(function () {
      var t = readPref("ya-react-theme", "");
      if (t === "dark" || t === "light") { document.documentElement.dataset.theme = t; setDark(isDark()); }
      function onHash() { var h = location.hash.slice(1); setClientRaw(Y.project(h) ? h : "all"); }
      window.addEventListener("hashchange", onHash);
      return function () { window.removeEventListener("hashchange", onHash); };
    }, []);
    useEffect(function () { setLimit(PAGE); }, [q, type, client, industry, sort]);

    var setClient = useCallback(function (id) {
      setClientRaw(id);
      if (id === "all") { if (location.hash) history.replaceState(null, "", location.pathname + location.search); }
      else location.hash = id;
      setIndustry("all");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    var results = useMemo(function () {
      var words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
      var list = Y.items.filter(function (it) {
        if (type !== "all" && it.type !== type) return false;
        if (client !== "all" && it.project !== client) return false;
        if (industry !== "all" && it.category !== industry) return false;
        if (!words.length) return true;
        var hay = (it.caption + " " + it.projectTitle + " " + it.group + " " + it.section + " " + it.category).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) > -1; });
      });
      if (sort === "videos") {
        var rank = { video: 0, reel: 1, photo: 2 };
        list = list.slice().sort(function (a, b) { return rank[a.type] - rank[b.type] || a.id - b.id; });
      } else if (sort === "az") {
        list = list.slice().sort(function (a, b) { return a.caption.localeCompare(b.caption); });
      }
      return list;
    }, [q, type, client, industry, sort]);

    var copy = useCallback(function (text) {
      Y.copy(text, function (ok) { setMsg(ok ? "Copied" : "Select the text to copy"); setTimeout(function () { setMsg(""); }, 1600); });
    }, []);
    var toggleTheme = useCallback(function () {
      var root = document.documentElement;
      root.dataset.theme = isDark() ? "light" : "dark";
      writePref("ya-react-theme", root.dataset.theme);
      setDark(isDark());
    }, []);
    var cycleSize = useCallback(function () { setSize(function (s) { var n = (s + 1) % 3; writePref("ya-react-size", n); return n; }); }, []);
    var onClose = useCallback(function () { setOpen(null); }, []);
    var onStep = useCallback(function (d) { setOpen(function (i) { return i === null ? i : (i + d + results.length) % results.length; }); }, [results.length]);

    var activeClient = client !== "all" ? Y.project(client) : null;
    return html`
      <div class="app">
        <${Sidebar} client=${client} setClient=${setClient} copy=${copy} />
        <main class="main">
          <${FilterBar} q=${q} setQ=${setQ} type=${type} setType=${setType} industry=${industry} setIndustry=${setIndustry}
            sort=${sort} setSort=${setSort} cycleSize=${cycleSize} toggleTheme=${toggleTheme} dark=${dark} />
          <div class="status">
            <span>${results.length} of ${Y.items.length} pieces</span>
            <span style=${{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              ${activeClient ? html`<span class="pill">${activeClient.title}<button aria-label="Clear client" onClick=${function () { setClient("all"); }}>✕</button></span>` : null}
              ${industry !== "all" ? html`<span class="pill">${industry}<button aria-label="Clear industry" onClick=${function () { setIndustry("all"); }}>✕</button></span>` : null}
              ${q ? html`<span class="pill">“${q}”<button aria-label="Clear search" onClick=${function () { setQ(""); }}>✕</button></span>` : null}
            </span>
          </div>
          ${activeClient && activeClient.summary ? html`<div class="panel"><h2 style=${{ fontSize: "22px", marginBottom: "4px" }}>${activeClient.title}</h2>
            <p style=${{ color: "var(--muted)" }}>${activeClient.summary} · ${Y.countLabel(activeClient.counts)}</p></div>` : null}
          ${results.length
            ? html`<div class="grid" style=${{ "--cell": SIZES[size] }}>
                ${results.slice(0, limit).map(function (it, i) {
                  return html`<${Card} key=${it.id} item=${it} onOpen=${function () { setOpen(i); }} />`;
                })}
              </div>`
            : html`<div class="empty"><p>No pieces match these filters.</p>
                <button class="loadmore" style=${{ marginTop: "12px" }} onClick=${function () { setQ(""); setType("all"); setIndustry("all"); setClient("all"); }}>Clear all filters</button></div>`}
          ${results.length > limit ? html`<button class="loadmore" onClick=${function () { setLimit(limit + PAGE); }}>Show ${Math.min(PAGE, results.length - limit)} more</button>` : null}
        </main>
        ${open !== null && results[open] ? html`<${Lightbox} list=${results} index=${open} onClose=${onClose} onStep=${onStep}
          onFilterClient=${function (id) { setOpen(null); setType("all"); setQ(""); setClient(id); }} />` : null}
        ${msg ? html`<div class="toast" role="status">${msg}</div>` : null}
      </div>`;
  }

  ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
})();
