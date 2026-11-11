const U = id => `https://images.unsplash.com/${id}?w=900&q=70`;
const services = [
  ["Social Media","Social Media Management","End-to-end organic strategy, calendar scheduling, community engagement, brand voice guidelines, and growth analytics across Instagram, LinkedIn, X and Facebook.",["Custom Monthly Content Calendars","15–30 Strategic Feed Posts & Carousels","Daily Story Engagement & Highlights"],"photo-1611162617474-5b21e879e113"],
  ["Creative","Graphic Designing","World-class marketing graphics, print collateral, display banners, pitch decks, and brand merchandise crafted with obsessive typographic and compositional standards.",["Vector Brand Assets & Visual Systems","Conversion-Optimized Ad Creatives","Corporate Presentations & Pitch Decks"],"photo-1561070791-2526d30994b5"],
  ["Production","Video Editing","High-production-value video editing for YouTube long-form, corporate brand films, customer case studies, commercial spots, and podcast episodes with sound design and motion graphics.",["4K Multi-Cam Narrative Editing","Kinetic Typography & Lower Thirds","Professional Sound Design & Audio Polish"],"photo-1574717024653-61fd2cf4d44d"],
  ["Short-Form","Reels & Shorts Creation","Hook-driven vertical shorts designed to stop the scroll in under 2 seconds. Optimized pacing, captions, audio syncing, and visual b-roll triggers.",["Viral Hook Scriptwriting & Storyboards","Dynamic Captions & Sound Effects","Fast-Paced Motion Transitions"],"photo-1622547748225-3fc4abd2cca0"],
  ["Development","Website Development","Bespoke modern websites, interactive landing pages, and web applications built with cutting-edge tech stacks. Lightning-fast load times, responsive perfection, and SEO baked in.",["Custom Responsive Web Architecture","Smooth Micro-Interactions & Animations","Integrated Lead Capture & WhatsApp Triggers"],"photo-1547658719-da2b51169166"],
  ["Organic Growth","Search Engine Optimization (SEO)","Technical SEO audits, keyword research, on-page optimization, content cluster creation, schema markup, and authoritative backlink building for long-term organic authority.",["In-Depth Competitor Keyword Map","Technical Site Architecture & Speed Audit","High-Intent Content Strategy & Blogs"],"photo-1432888498266-38ffec3eaf0a"],
];
const works = [
  ["branding","Aurora Interiors Studio","Minimalist Monolith Brand System","Complete brand book, premium packaging & stationery, and digital guidelines.","photo-1586717791821-3f44a563fa4c"],
  ["social","Shades & Co. Apparel","Viral Fashion Reels & TikTok Series","Over 1.8M organic views and 28,000+ new followers across 30 days.","photo-1611162616305-c69b3fa7fbe0"],
  ["web","Apexa Coworks","Kinetic Modern Agency Headquarters","100% responsive website with booking flow and immersive photo galleries.","photo-1497366754035-f200968a6e72"],
  ["social","Kinetics Fitness","High-Tempo Workout Reel Campaign","Hyper-local reels that drove 340+ trial bookings in 90 days.","photo-1534438327276-14e5300c3a48"],
  ["branding","Aura Lifestyle & Living","D2C Luxury Rebrand","New identity, packaging and Meta ad creatives that lifted revenue 460%.","photo-1618220179428-22790b461013"],
  ["web","Nova Analytics","SaaS Landing Page & Dashboard UI","Conversion-focused landing page with 3.1x higher demo sign-ups.","photo-1460925895917-afdab827c52f"],
];
const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; };
const sg = document.getElementById("serviceGrid");
services.forEach(([tag,t,d,li,img]) => sg.append(el(`<article class="svc reveal"><div class="thumb img" style="--src:url('${U(img)}')"><span>${tag}</span></div><div class="body"><h3>${t}</h3><p>${d}</p><ul>${li.map(x=>`<li>${x}</li>`).join("")}</ul><a href="#contact" class="more" data-svc="${t}">Explore Service Details &rsaquo;</a></div></article>`)));
const wg = document.getElementById("workGrid");
works.forEach(([c,cl,t,d,img]) => wg.append(el(`<article class="work reveal" data-c="${c}"><div class="thumb img" style="--src:url('${U(img)}')"></div><div class="body"><small>${cl}</small><h3>${t}</h3><p>${d}</p><a href="#contact" class="vp">View Project Breakdown <span>&nearr;</span></a></div></article>`)));
document.getElementById("tabs").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  document.querySelectorAll("#tabs button").forEach(x => x.classList.toggle("active", x === b));
  document.querySelectorAll(".work").forEach(w => w.classList.toggle("hide", b.dataset.f !== "all" && w.dataset.c !== b.dataset.f));
});
// preselect service/plan in form
const sel = document.getElementById("serviceSelect");
document.addEventListener("click", e => {
  const a = e.target.closest("[data-plan],[data-svc]"); if (!a) return;
  const v = a.dataset.plan || a.dataset.svc;
  const opt = [...sel.options].find(o => o.text.startsWith(v.split(" (")[0].replace(/ \(SEO\)/,"")) || v.startsWith(o.text));
  if (opt) sel.value = opt.value;
});
// form -> WhatsApp
document.getElementById("brief").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Hi YAP Digital Marketing!%0A%0AName: ${f.get("name")}%0AEmail: ${f.get("email")}%0APhone: ${f.get("phone")}%0ABrand: ${f.get("brand")||"-"}%0AInterested in: ${f.get("service")}%0ADetails: ${f.get("msg")||"-"}`;
  window.open(`https://wa.me/918218116706?text=${encodeURIComponent(decodeURIComponent(msg))}`, "_blank");
});
// mobile menu
const links = document.getElementById("links");
document.getElementById("burger").onclick = () => links.classList.toggle("open");
links.addEventListener("click", e => e.target.tagName === "A" && links.classList.remove("open"));
// reveal on scroll
document.querySelectorAll(".section h2,.glass,.plan,.case,.about>*,.c-row,.brief").forEach(n => n.classList.add("reveal"));
const io = new IntersectionObserver(es => es.forEach(x => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))), {threshold:.12});
document.querySelectorAll(".reveal").forEach(n => io.observe(n));
document.getElementById("yr").textContent = new Date().getFullYear();
