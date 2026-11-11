/* ==========================================================
   Yash Agarwal Portfolio: shared core
   Reads window.PORTFOLIO (data.js) and exposes window.YA:
   - YA.profile, YA.contact      profile text and parsed contact info
   - YA.projects                 projects in category order, with counts & cover
   - YA.items                    every photo / reel / video, flattened
   - YA.src(path)                resolves a media path (supports inlined posters)
   - YA.lightbox(list, index)    full-screen viewer for photos and videos
   Used by cinematic.html, editorial.html, catalog.html and react.html.
   ========================================================== */
(function () {
  "use strict";
  var P = window.PORTFOLIO;
  if (!P) { console.error("data.js did not load"); return; }

  function src(path) {
    return (path && window.POSTERS && window.POSTERS[path]) || path || "";
  }

  /* ---------- Contact ---------- */
  var contact = { phone: "", whatsapp: "", email: "", instagram: "", instagramUrl: "" };
  P.profile.contact.forEach(function (c) {
    if (c.href.indexOf("tel:") === 0) contact.phone = c.href.slice(4);
    else if (c.href.indexOf("wa.me/") > -1) contact.whatsapp = c.href.split("wa.me/")[1];
    else if (c.href.indexOf("mailto:") === 0) contact.email = c.href.slice(7);
    else if (c.href.indexOf("instagram.com") > -1) {
      contact.instagramUrl = c.href;
      contact.instagram = "@" + c.href.replace(/\/+$/, "").split("/").pop();
    }
  });
  contact.phonePretty = contact.phone.replace(/^\+91/, "+91 ").replace(/(\d{5})(\d{5})$/, "$1 $2");
  contact.waLink = function (text) {
    return "https://wa.me/" + contact.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  };

  /* ---------- Projects & items ---------- */
  var byId = {};
  P.projects.forEach(function (p) { byId[p.id] = p; });

  var items = [];
  var projects = [];
  P.categories.forEach(function (cat) {
    cat.projects.forEach(function (ref) {
      var p = byId[ref.id];
      if (!p) return;
      var counts = { photo: 0, reel: 0, video: 0 };
      var list = [];
      p.groups.forEach(function (g) {
        g.sections.forEach(function (s) {
          s.items.forEach(function (it) {
            counts[it.type]++;
            var full = {
              id: items.length,
              type: it.type,
              caption: it.caption,
              img: it.img,
              video: it.video || null,
              project: p.id,
              projectTitle: p.title,
              category: cat.name,
              group: g.title,
              section: s.title,
            };
            items.push(full);
            list.push(full);
          });
        });
      });
      var cover = list.filter(function (i) { return i.type === "photo"; })[0] || list[0];
      var videos = list.filter(function (i) { return i.type === "video"; });
      projects.push({
        id: p.id,
        title: p.title,
        name: ref.name,
        kind: (ref.meta.split(" · ")[0] || "").trim(),
        meta: ref.meta,
        summary: p.summary,
        category: cat.name,
        groups: p.groups,
        items: list,
        counts: counts,
        total: list.length,
        cover: cover,
        heroVideo: videos[0] || null,
      });
    });
  });

  function countLabel(c) {
    var parts = [];
    if (c.video) parts.push(c.video + (c.video === 1 ? " video" : " videos"));
    if (c.reel) parts.push(c.reel + (c.reel === 1 ? " reel" : " reels"));
    if (c.photo) parts.push(c.photo + (c.photo === 1 ? " photo & graphic" : " photos & graphics"));
    return parts.join(" · ");
  }

  var totals = { photo: 0, reel: 0, video: 0 };
  items.forEach(function (i) { totals[i.type]++; });

  var categories = P.categories.map(function (c) {
    return { name: c.name, projects: projects.filter(function (p) { return p.category === c.name; }) };
  });

  /* ---------- Lightbox (shared by the vanilla-JS versions) ---------- */
  var lb, lbMedia, lbCap, lbMeta, lbList = [], lbIndex = 0, lastFocus = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function buildLightbox() {
    var css = document.createElement("style");
    css.textContent =
      ".ya-lb{position:fixed;inset:0;z-index:1000;background:rgba(8,7,6,.94);display:grid;grid-template-rows:auto 1fr auto;" +
      "padding:calc(12px + env(safe-area-inset-top,0px)) max(12px,env(safe-area-inset-right,0px)) calc(12px + env(safe-area-inset-bottom,0px)) max(12px,env(safe-area-inset-left,0px));color:#f4efe8;font-family:inherit}" +
      ".ya-lb[hidden]{display:none!important}" +
      ".ya-lb-top{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:13px;opacity:.8}" +
      ".ya-lb-stage{display:grid;place-items:center;min-height:0;position:relative}" +
      ".ya-lb-stage img,.ya-lb-stage video{max-width:100%;max-height:100%;object-fit:contain;border-radius:10px;background:#000}" +
      ".ya-lb-cap{text-align:center;padding:12px 8px 4px;font-size:15px}" +
      ".ya-lb button{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:999px;min-width:44px;height:44px;font-size:18px;cursor:pointer}" +
      ".ya-lb button:hover,.ya-lb button:focus-visible{background:rgba(255,255,255,.22);outline:none}" +
      ".ya-lb .ya-nav{position:absolute;top:50%;transform:translateY(-50%)}" +
      ".ya-lb .ya-prev{left:0}.ya-lb .ya-next{right:0}" +
      ".ya-lb .ya-badge{font-size:11px;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(255,255,255,.3);padding:3px 8px;border-radius:999px;margin-right:8px}";
    document.head.appendChild(css);

    lb = document.createElement("div");
    lb.className = "ya-lb";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Media viewer");
    lb.innerHTML =
      '<div class="ya-lb-top"><span class="ya-meta"></span><button class="ya-close" aria-label="Close viewer">✕</button></div>' +
      '<div class="ya-lb-stage"><div class="ya-media" style="display:contents"></div>' +
      '<button class="ya-nav ya-prev" aria-label="Previous">‹</button><button class="ya-nav ya-next" aria-label="Next">›</button></div>' +
      '<div class="ya-lb-cap"></div>';
    document.body.appendChild(lb);
    lbMedia = lb.querySelector(".ya-media");
    lbCap = lb.querySelector(".ya-lb-cap");
    lbMeta = lb.querySelector(".ya-meta");

    lb.querySelector(".ya-close").addEventListener("click", closeLightbox);
    lb.querySelector(".ya-prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".ya-next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("ya-lb-stage")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  function render() {
    var it = lbList[lbIndex];
    var label = it.type === "video" ? "Video" : it.type === "reel" ? "Reel cover" : "Photo";
    lbMeta.innerHTML = '<span class="ya-badge">' + label + "</span>" + esc(it.projectTitle) +
      " · " + (lbIndex + 1) + " / " + lbList.length;
    lbCap.textContent = it.caption;
    if (it.type === "video") {
      lbMedia.innerHTML = '<video controls playsinline autoplay preload="auto"></video>';
      var v = lbMedia.querySelector("video");
      v.poster = src(it.img);
      v.src = src(it.video);
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    } else {
      lbMedia.innerHTML = '<img alt="">';
      var im = lbMedia.querySelector("img");
      im.alt = it.caption;
      im.src = src(it.img);
    }
    var multi = lbList.length > 1;
    lb.querySelector(".ya-prev").hidden = !multi;
    lb.querySelector(".ya-next").hidden = !multi;
  }
  function step(d) {
    lbIndex = (lbIndex + d + lbList.length) % lbList.length;
    render();
  }
  function openLightbox(list, index) {
    if (!lb) buildLightbox();
    lastFocus = document.activeElement;
    lbList = list;
    lbIndex = index || 0;
    lb.hidden = false;
    document.documentElement.style.overflow = "hidden";
    render();
    lb.querySelector(".ya-close").focus();
  }
  function closeLightbox() {
    if (!lb || lb.hidden) return;
    var v = lbMedia.querySelector("video");
    if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    lbMedia.innerHTML = "";
    lb.hidden = true;
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- Copy helper ---------- */
  function copy(text, done) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      ta.remove(); if (done) done(ok);
    }
    try {
      navigator.clipboard.writeText(text).then(function () { if (done) done(true); }, fallback);
    } catch (e) { fallback(); }
  }

  window.YA = {
    profile: P.profile,
    contact: contact,
    categories: categories,
    projects: projects,
    project: function (id) { return projects.filter(function (p) { return p.id === id; })[0] || null; },
    items: items,
    totals: totals,
    countLabel: countLabel,
    src: src,
    esc: esc,
    copy: copy,
    lightbox: openLightbox,
    closeLightbox: closeLightbox,
  };
})();
