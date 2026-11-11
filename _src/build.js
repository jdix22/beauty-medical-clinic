/* Builds every page of the site from content.js.  Run: node _src/build.js */
const fs = require('fs');
const path = require('path');
const { FACTS: F, CATEGORIES, REVIEWS, ZONES, T, bySlug, REDIRECTS } = require('./content');

const ROOT = path.join(__dirname, '..');
// Live on beautymedical.ca (Cloudflare Worker). The GitHub Pages copy points its canonical here.
const SITE = 'https://beautymedical.ca/';
const NOINDEX = false;
const VERSION = '4';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (name, alt, w, h, o = {}) => `<img src="${o.p || ''}assets/img/${name}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${o.eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}${o.cls ? ` class="${o.cls}"` : ''}${o.sizes ? ` sizes="${o.sizes}"` : ''}${o.srcset ? ` srcset="${o.srcset}"` : ''}>`;

// Image sizes (for width/height attributes)
const DIM = {};
for (const f of fs.readdirSync(path.join(ROOT, 'assets/img'))) {
  const b = fs.readFileSync(path.join(ROOT, 'assets/img', f));
  // WebP VP8/VP8L/VP8X header parse
  const fourcc = b.toString('ascii', 12, 16);
  let w, h;
  if (fourcc === 'VP8 ') { w = b.readUInt16LE(26) & 0x3fff; h = b.readUInt16LE(28) & 0x3fff; }
  else if (fourcc === 'VP8L') { const n = b.readUInt32LE(21); w = (n & 0x3fff) + 1; h = ((n >> 14) & 0x3fff) + 1; }
  else if (fourcc === 'VP8X') { w = 1 + b.readUIntLE(24, 3); h = 1 + b.readUIntLE(27, 3); }
  DIM[f.replace('.webp', '')] = [w, h];
}
const pic = (name, alt, o = {}) => { const [w, h] = DIM[name] || [800, 600]; return img(name, alt, w, h, o); };

const icon = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.4 7H19.6z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2 6.1 20.5l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>'
};

const logo = (p) => `<a class="logo" href="${p}" aria-label="Beauty Medical Clinic, home">
  <svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M14 10.5h7.2c3.6 0 5.6 1.7 5.6 4.5 0 2-1.1 3.3-2.9 3.9 2.4.5 3.8 2.1 3.8 4.4 0 3.3-2.4 5.2-6.4 5.2H14z M17.4 13.3v4.6h3.4c1.8 0 2.7-.8 2.7-2.3s-.9-2.3-2.7-2.3z M17.4 20.6v5.1h3.8c2 0 3-.9 3-2.6s-1-2.5-3-2.5z" fill="currentColor"/></svg>
  <span class="logo-type"><span class="logo-name">Beauty</span><span class="logo-sub">Medical Clinic</span></span></a>`;

function treatmentsMenu(p) {
  return CATEGORIES.map(c => `<div class="mega-col"><p class="mega-h">${c.name}</p><ul>${T.filter(t => t.cat === c.id).map(t => `<li><a href="${p}${t.slug}/">${t.short}</a></li>`).join('')}</ul></div>`).join('');
}

function header(p, current) {
  const cur = k => current === k ? ' aria-current="page"' : '';
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-head" data-head>
  <div class="wrap head-row">
    ${logo(p)}
    <nav class="nav" aria-label="Main">
      <button class="nav-tr" type="button" aria-expanded="false" aria-controls="mega" data-mega-btn>Treatments <span aria-hidden="true">+</span></button>
      <a href="${p}about/"${cur('about')}>About Rebecca</a>
      <a href="${p}#results">Results</a>
      <a href="${p}training/"${cur('training')}>Training</a>
      <a href="${p}contact/"${cur('contact')}>Contact</a>
    </nav>
    <div class="head-cta">
      <a class="head-tel" href="${F.tel}">${icon.phone}<span>${F.phone}</span></a>
      <a class="btn btn-sm" href="${p}contact/#book">Book a consultation</a>
      <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer" data-burger><span></span><span></span></button>
    </div>
  </div>
  <div class="mega" id="mega" hidden data-mega>
    <div class="wrap mega-in">${treatmentsMenu(p)}<div class="mega-col mega-note"><p class="mono">Not sure where to start?</p><p>Tap the face map on the home page, or ask Rebecca at a consultation.</p><a class="link" href="${p}services/">All treatments ${icon.arrow}</a></div></div>
  </div>
</header>
<div class="drawer" id="drawer" hidden data-drawer>
    <div class="drawer-in">
      <a href="${p}services/" class="drawer-big">All treatments</a>
      ${CATEGORIES.map(c => `<details><summary>${c.name}</summary><ul>${T.filter(t => t.cat === c.id).map(t => `<li><a href="${p}${t.slug}/">${t.short}</a></li>`).join('')}</ul></details>`).join('')}
      <a href="${p}about/" class="drawer-big">About Rebecca</a>
      <a href="${p}#results" class="drawer-big">Results</a>
      <a href="${p}training/" class="drawer-big">Training</a>
      <a href="${p}contact/" class="drawer-big">Contact</a>
      <a class="btn" href="${p}contact/#book">Book a consultation</a>
    </div>
</div>`;
}

function footer(p) {
  return `<footer class="site-foot">
  <div class="wrap foot-grid">
    <div class="foot-brand">${logo(p)}<p class="foot-tag mono">${F.tagline}</p><p>${F.about}</p></div>
    <div><p class="foot-h">Visit</p><address>${F.building}<br>${F.street}<br>${F.city}, ${F.region} ${F.postal}<br><span class="muted">Near ${F.intersection}</span></address><a class="link" href="${F.mapsUrl}" rel="noopener" target="_blank">Get directions ${icon.arrow}</a></div>
    <div><p class="foot-h">Contact</p><ul class="foot-list"><li><a href="${F.tel}">${F.phone}</a></li><li><a href="${F.sms}">Text us</a> · <a href="${F.whatsapp}" rel="noopener" target="_blank">WhatsApp</a></li><li><a href="mailto:${F.email}">${F.email}</a></li></ul></div>
    <div><p class="foot-h">Treatments</p><ul class="foot-list cols2">${T.map(t => `<li><a href="${p}${t.slug}/">${t.short}</a></li>`).join('')}</ul></div>
  </div>
  <div class="wrap foot-base"><p>© <span data-year>2026</span> ${F.name}. Treatment results vary from person to person; a consultation decides what is right for you.</p><p><a href="${p}privacy-policy/">Privacy</a> · Website designed by <a href="https://jdix.ca" rel="noopener">jdix.ca</a></p></div>
</footer>
<nav class="dock" aria-label="Quick contact">
  <a href="${F.tel}">${icon.phone}<span>Call</span></a>
  <a href="${F.sms}">${icon.chat}<span>Text</span></a>
  <a href="${F.whatsapp}" rel="noopener" target="_blank">${icon.wa}<span>WhatsApp</span></a>
  <a class="dock-book" href="${p}contact/#book"><span>Book</span></a>
</nav>`;
}

const biz = {
  '@type': 'MedicalClinic',
  '@id': SITE + '#business',
  name: F.name,
  slogan: 'Where art meets science',
  description: F.about,
  url: SITE,
  telephone: F.phoneIntl,
  email: F.email,
  image: SITE + 'assets/og.png',
  logo: SITE + 'assets/logo.png',
  address: { '@type': 'PostalAddress', streetAddress: F.street, addressLocality: F.city, addressRegion: F.region, postalCode: F.postal, addressCountry: 'CA' },
  areaServed: [{ '@type': 'City', name: 'Thornhill' }, { '@type': 'City', name: 'Toronto' }],
  founder: { '@id': SITE + '#victoria' },
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Treatments', itemListElement: T.map(t => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: t.name, url: SITE + t.slug + '/' } })) }
};
const person = {
  '@type': 'Person', '@id': SITE + '#victoria', name: F.owner, jobTitle: F.ownerTitle,
  worksFor: { '@id': SITE + '#business' }, image: SITE + 'assets/img/rebecca-victoria-adam-rn.webp', url: SITE + 'about/',
  knowsAbout: ['Botox and Dysport injections', 'Dermal fillers', 'Sclerotherapy', 'PRP', 'Mesotherapy', 'Medical aesthetics training']
};
const website = { '@type': 'WebSite', '@id': SITE + '#website', url: SITE, name: F.name, publisher: { '@id': SITE + '#business' }, inLanguage: 'en-CA' };
const crumbs = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it[0], item: SITE + it[1] })) });
const faqLd = (faq) => faq.length ? [{ '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] : [];

function page({ file, p, title, desc, canonical, ogImg = 'assets/og.png', ogAlt = 'Beauty Medical Clinic, Thornhill: where art meets science', ld, body, current, bodyClass = '' }) {
  const html = `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${canonical}">
<meta name="theme-color" content="#F7F2EB">
${NOINDEX ? '<meta name="robots" content="noindex">\n' : ''}<meta property="og:type" content="website">
<meta property="og:site_name" content="${F.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogAlt)}">
<meta property="og:url" content="${SITE}${canonical}">
<meta property="og:locale" content="en_CA">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${p}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${p}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..600;1,300..600&family=Jost:wght@300..600&display=swap">
<link rel="stylesheet" href="${p}assets/site.css?v=${VERSION}">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld })}</script>
</head>
<body class="${bodyClass}">
${header(p, current)}
<main id="main">
${body}
</main>
${footer(p)}
<script src="${p}assets/site.js?v=${VERSION}" defer></script>
</body>
</html>
`;
  const out = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  return out;
}

const card = (t, p, i) => `<a class="tcard" href="${p}${t.slug}/">
  <span class="tcard-img">${pic(t.img, t.imgAlt, { p, sizes: '(max-width: 700px) 90vw, 360px' })}</span>
  <span class="tcard-body"><span class="mono tcard-n">${String(i).padStart(2, '0')} · ${CATEGORIES.find(c => c.id === t.cat).name}</span><span class="tcard-h">${t.name}</span><span class="tcard-p">${t.card}</span><span class="tcard-go">Learn more ${icon.arrow}</span></span></a>`;

const ctaBand = (p, h = 'Ready when you are.', sub = 'Every treatment starts with a conversation. Call, text or WhatsApp, or send a note and Rebecca will be in touch.') => `<section class="cta-band"><div class="wrap cta-in">
  <div><p class="mono eyebrow">Book a consultation</p><h2>${h}</h2><p>${sub}</p></div>
  <div class="cta-actions"><a class="btn" href="${p}contact/#book">Request an appointment</a><a class="btn btn-ghost" href="${F.tel}">${icon.phone} ${F.phone}</a><a class="btn btn-ghost" href="${F.whatsapp}" rel="noopener" target="_blank">${icon.wa} WhatsApp</a></div>
</div></section>`;

const quoteBlock = (q) => `<figure class="quote"><blockquote><p>${q[0]}</p></blockquote><figcaption>${q[1]}</figcaption></figure>`;

/* ───────── HOME ───────── */
function home() {
  const p = '';
  const zoneBtns = ZONES.map((z, i) => `<button class="zone" type="button" style="--x:${z.x}%;--y:${z.y}%" data-zone="${z.id}" aria-pressed="${i === 7 ? 'true' : 'false'}" aria-label="${esc(z.label)}"><span class="zone-dot"></span><span class="zone-tag mono">${String(i + 1).padStart(2, '0')} ${z.label}</span></button>`).join('');
  const zonePanels = ZONES.map((z, i) => `<div class="zp" data-panel="${z.id}"${i === 7 ? '' : ' hidden'}><p class="mono zp-n">${String(i + 1).padStart(2, '0')} / ${String(ZONES.length).padStart(2, '0')}</p><h3>${z.label}</h3><p class="zp-c">${z.concern}</p><ul>${z.t.map(s => `<li><a href="${s}/"><span>${bySlug[s].name}</span>${icon.arrow}</a></li>`).join('')}</ul></div>`).join('');
  const chips = ZONES.map((z, i) => `<button type="button" class="chip" data-zone="${z.id}" aria-pressed="${i === 7 ? 'true' : 'false'}">${z.label}</button>`).join('');

  const SIG_IMG = {
    'hair-loss-and-thinning-treatment': ['hair-mesotherapy-scalp-injection', 'A gloved practitioner giving hair-growth mesotherapy injections to a client’s scalp'],
    'endospheres-therapy': ['endospheres-body-back', 'A man relaxing face-down as a therapist glides the Endospheres roller over his back'],
    'cinderella-facelift': ['lip-filler-injection', 'Close-up of a fine needle placing a plumping injection in the lip']
  };
  const signature = [
    ['hair-loss-and-thinning-treatment', 'Clinic exclusive', 'Hair growth mesotherapy <span class="pl">+</span> PRP', 'A combination of ingredients you won’t find elsewhere, built to slow shedding and restart growth.'],
    ['endospheres-therapy', 'New from Italy', 'Endospheres body & face', 'Compressive microvibration for cellulite, fluid retention, muscle tension and a lifted contour.'],
    ['cinderella-facelift', 'One of the first in Toronto', 'Cinderella facelift & lips', 'A one-evening saline plump for weddings, parties and photos, or to try a look before filler.']
  ];
  const results = [
    ['dermal-fillers-before-after-1', 'dermal-fillers', 'Dermal fillers'], ['lip-filler-before-after', 'your-perfect-lips', 'Lip filler'], ['microneedling-before-after-1', 'microneedling', 'Microneedling'],
    ['forma-before-after-1', 'radiofrequency-skin-tightening', 'Forma'], ['hair-loss-before-after-1', 'hair-loss-and-thinning-treatment', 'Hair treatment'], ['microneedling-before-after-4', 'microneedling', 'Microneedling'],
    ['dermal-fillers-before-after-4', 'dermal-fillers', 'Dermal fillers'], ['organic-peel-before-after', 'organic-peel', 'Organic peel'], ['bodyfx-before-after-thighs', 'body-fx', 'BodyFX'],
    ['salt-and-silk-facial-before-after', 'salt-and-silk-facial', 'Salt & Silk facial'], ['forma-before-after-3', 'radiofrequency-skin-tightening', 'Forma'], ['microneedling-before-after-2', 'microneedling', 'Microneedling']
  ];
  const resAlt = n => { for (const t of T) for (const g of t.gallery) if (g[0] === n) return g[1]; return 'Before and after treatment at Beauty Medical Clinic'; };
  const homeFaq = [
    ['Who performs the treatments?', 'Rebecca Victoria Adam, a Registered Nurse and Certified Advanced Cosmetic Injector with more than 30 years in medicine. She also trains doctors and nurses in Botox, dermal fillers and sclerotherapy.'],
    ['Where is Beauty Medical Clinic?', 'In the Medical Arts building at 7131 Bathurst St., Unit 103, Thornhill, ON L4J 7Z1, near Steeles Ave and Bathurst St.'],
    ['How do I book?', 'Call or text 416-728-5697, message on WhatsApp, email info@beautymedicalclinic.com, or send the request form on the contact page.'],
    ['How long does Botox last?', 'Usually three to five months. Results start within a few days and peak at about two weeks.'],
    ['Will I look “done”?', 'No. Rebecca’s reputation rests on natural, youthful results. Clients often mention that she prefers to under-treat rather than over-treat.'],
    ['What is the best age to start?', 'There is no upper limit, and treatments are for adults 18 and over. Starting a maintenance plan earlier makes results easier to keep later.'],
    ['Do you treat men?', 'Yes. Rebecca helps both women and men, and treatments like Endospheres, Botox and the hair-loss protocol are popular with men.']
  ];

  const body = `
<section class="hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="mono eyebrow">Thornhill · Bathurst &amp; Steeles</p>
      <h1><span class="h1-brand">Beauty Medical Clinic</span> <span class="h1-main">Non-surgical anti-aging, <em>where art meets science.</em></span></h1>
      <p class="lede">Botox, fillers, skin renewal, spider veins, body contouring and hair restoration, every treatment performed by Registered Nurse Rebecca Victoria Adam, who teaches these techniques to doctors and nurses.</p>
      <div class="hero-actions"><a class="btn" href="contact/#book">Book a consultation</a><a class="btn btn-ghost" href="${F.tel}">${icon.phone} ${F.phone}</a></div>
      <ul class="hero-proof">
        <li><b>30<span class="pl">+</span></b><span>years in medicine</span></li>
        <li><b>RN</b><span>Certified Advanced Cosmetic Injector</span></li>
        <li><b class="stars" aria-label="Rated Excellent on Google">${icon.star.repeat(5)}</b><span>Rated “Excellent” · ${F.googleCount} Google reviews</span></li>
      </ul>
    </div>
    <div class="hero-media">
      ${pic('serum-dropper-skin', 'A woman with her eyes closed letting a drop of golden serum fall onto her cheek', { eager: true, sizes: '(max-width: 900px) 100vw, 50vw' })}
      <a class="hero-card" href="about/">${pic('rebecca-victoria-adam-rn', 'Rebecca Victoria Adam, RN', { sizes: '64px' })}<span><b>Rebecca Victoria Adam, RN</b>Every treatment, performed by Rebecca herself</span></a>
    </div>
  </div>
</section>

<section class="strip" aria-label="What we treat">
  <div class="marquee"><div class="marquee-in">${[...T, ...T].map(t => `<a href="${t.slug}/">${t.short}</a>`).join('<span aria-hidden="true">◆</span>')}</div></div>
</section>

<section class="section intro">
  <div class="wrap intro-grid">
    <div class="intro-copy">
      <p class="mono eyebrow">Our philosophy</p>
      <p class="intro-big">Thirty years of medicine and an artist’s eye, for results that <em>still look like you.</em></p>
      <p class="intro-small">Rebecca’s reputation rests on natural, youthful results built on anatomy, science and an artist’s eye. Clients say she would rather under-treat than over-treat, and every plan begins with a pressure-free conversation.</p>
      <a class="link" href="about/">Meet Rebecca ${icon.arrow}</a>
    </div>
    <figure class="intro-photo">${pic('clinical-skin-care-gloves', 'A relaxed client lying back as a gloved practitioner treats her cheek with a fine instrument', { sizes: '(max-width: 900px) 90vw, 40vw' })}</figure>
  </div>
</section>

<section class="section fm-sec" id="face-map">
  <div class="wrap fm-sec-grid facemap" data-facemap>
    <div class="fm-copy">
      <p class="mono eyebrow">The face map</p>
      <h2>Find your treatment, <em>area by area.</em></h2>
      <p class="fm-intro">Tap a point on the face, or choose an area below, to see what Rebecca uses to treat it.</p>
      <div class="fm-panel" aria-live="polite">${zonePanels}</div>
      <div class="fm-chips" role="group" aria-label="Choose an area">${chips}</div>
    </div>
    <div class="fm-stage">
      <picture>${img('face-map-consultation', 'A woman’s face framed by an injector’s gloved hands, marked with the facial zones the clinic treats', 1340, 1200, { srcset: 'assets/img/face-map-consultation-720.webp 720w, assets/img/face-map-consultation.webp 1340w', sizes: '(max-width: 900px) 100vw, 50vw' })}</picture>
      ${zoneBtns}
      <p class="fm-hint mono">Tap a point · see what treats it</p>
    </div>
  </div>
</section>

<section class="section" id="treatments">
  <div class="wrap">
    <div class="sec-head"><p class="mono eyebrow">Treatments</p><h2>Sixteen treatments, one trusted pair of hands.</h2><p>From a ten-minute Botox appointment to a six-week skin-tightening course, each plan is built around your face, your goals and what will look natural on you.</p></div>
    <div class="cat-tabs" role="tablist" aria-label="Treatment categories"><button role="tab" aria-selected="true" data-cat="all">All</button>${CATEGORIES.map(c => `<button role="tab" aria-selected="false" data-cat="${c.id}">${c.name}</button>`).join('')}</div>
    <div class="tgrid" data-tgrid>${T.map((t, i) => card(t, p, i + 1).replace('<a class="tcard"', `<a class="tcard" data-c="${t.cat}"`)).join('')}</div>
  </div>
</section>

<section class="section signature">
  <div class="wrap">
    <div class="sec-head"><p class="mono eyebrow">Most requested</p><h2>The treatments people travel for.</h2></div>
    <div class="sig-grid">${signature.map(([s, tag, h, txt]) => `<a class="sig" href="${s}/">${pic(SIG_IMG[s][0], SIG_IMG[s][1], { sizes: '(max-width: 800px) 90vw, 33vw' })}<span class="sig-body"><span class="mono sig-tag">${tag}</span><span class="sig-h">${h}</span><span class="sig-p">${txt}</span><span class="tcard-go">Learn more ${icon.arrow}</span></span></a>`).join('')}</div>
  </div>
</section>

<section class="section meet">
  <div class="wrap meet-grid">
    <figure class="meet-photo">${pic('rebecca-victoria-adam-rn', 'Rebecca Victoria Adam, Registered Nurse and founder of Beauty Medical Clinic, in red-framed glasses and pearls, resting her chin on her hand', { sizes: '(max-width: 800px) 90vw, 40vw' })}<figcaption class="mono">Rebecca Victoria Adam, RN · Founder</figcaption></figure>
    <div class="meet-copy">
      <p class="mono eyebrow">Meet your injector</p>
      <h2>A nurse first. An artist always.</h2>
      <p>Rebecca began her career as a Registered Nurse on a bone-marrow transplant unit at one of Israel’s leading hospitals, then worked as a wound-care nurse and educator for Johnson &amp; Johnson. In Canada she re-qualified as an RN and spent several years as a visiting nurse before moving into medical aesthetics, where she trained alongside leading dermatologists and plastic surgeons.</p>
      <p>Today she is one of Canada’s sought-after aesthetics trainers. For more than ten years she has taught hands-on Botox, dermal filler and sclerotherapy technique to doctors and registered nurses, and hundreds of professionals from Australia, Europe and North America have learned from her.</p>
      <ul class="cred"><li><b>30<span class="pl">+</span> yrs</b><span>in medicine</span></li><li><b>10<span class="pl">+</span> yrs</b><span>training MDs &amp; RNs</span></li><li><b>100s</b><span>of professionals taught worldwide</span></li></ul>
      <a class="link" href="about/">Rebecca’s story and approach ${icon.arrow}</a>
    </div>
  </div>
</section>

<section class="section results" id="results">
  <div class="wrap">
    <div class="sec-head"><p class="mono eyebrow">Real clients · real results</p><h2>Before &amp; after, from the clinic’s own files.</h2><p>Every photo below is a Beauty Medical Clinic client, from the clinic’s own records. Results vary from person to person.</p></div>
    <div class="res-grid">${results.map(([n, s, label]) => `<a class="res" href="${s}/"><span class="res-img">${pic(n, resAlt(n), { sizes: '(max-width: 700px) 45vw, 25vw' })}</span><span class="res-cap"><span>${label}</span>${icon.arrow}</span></a>`).join('')}</div>
  </div>
</section>

<section class="section reviews">
  <div class="wrap">
    <div class="sec-head center"><p class="mono eyebrow">${icon.star.repeat(5)} Rated “Excellent” on Google · ${F.googleCount} reviews</p><h2>“Would not trust anyone else with my face.”</h2></div>
    <div class="rev-track" data-reviews>${REVIEWS.map(r => `<figure class="rev"><span class="stars" aria-label="5 out of 5 stars">${icon.star.repeat(5)}</span><blockquote><p>${r.text}</p></blockquote><figcaption><b>${r.name}</b><span class="mono">Google review</span></figcaption></figure>`).join('')}</div>
    <div class="rev-ctrl"><button type="button" data-rev="-1" aria-label="Previous reviews">←</button><button type="button" data-rev="1" aria-label="Next reviews">→</button></div>
  </div>
</section>

<section class="section values">
  <div class="wrap values-grid">
    <div><p class="mono eyebrow">The difference</p><h2>What makes Beauty Medical Clinic different.</h2><p>“The goal is to age as gracefully as possible. If you start investing early enough, we can help you delay the ageing process, and that’s something each of us deserves.”</p><p class="sig-name">Rebecca Victoria Adam</p></div>
    <ol class="vlist"><li><span class="mono">01</span>Relationships built on trust and honesty</li><li><span class="mono">02</span>Compassion and empathy</li><li><span class="mono">03</span>Medical professionalism</li><li><span class="mono">04</span>An individual approach for every face</li><li><span class="mono">05</span>A friendly, pressure-free atmosphere</li></ol>
  </div>
</section>

<section class="section faq-sec">
  <div class="wrap faq-grid">
    <div class="sec-head"><p class="mono eyebrow">Questions</p><h2>Good to know before your first visit.</h2><p>More detail lives on each treatment page, including preparation and aftercare.</p></div>
    <div class="faq">${homeFaq.map(([q, a]) => `<details><summary><h3>${q}</h3></summary><p>${a}</p></details>`).join('')}</div>
  </div>
</section>

${visit(p)}
`;
  return page({
    file: 'index.html', p, canonical: '',
    title: 'Beauty Medical Clinic | Botox, Fillers & Anti-Aging, Thornhill',
    desc: 'Non-surgical anti-aging in Thornhill: Botox, fillers, microneedling, spider veins, BodyFX and hair loss treatment by RN injector Rebecca Victoria Adam. Book today.',
    ld: [biz, person, website, ...faqLd(homeFaq)], body, bodyClass: 'home'
  });
}

function visit(p) {
  return `<section class="section visit" id="visit">
  <div class="wrap visit-grid">
    <div class="visit-copy">
      <p class="mono eyebrow">Visit the clinic</p>
      <h2>Bathurst &amp; Steeles, in the Medical Arts building.</h2>
      <dl class="vdl">
        <div><dt>${icon.pin} Address</dt><dd>${F.building}<br>${F.street}<br>${F.city}, ${F.region} ${F.postal}</dd></div>
        <div><dt>${icon.phone} Phone &amp; text</dt><dd><a href="${F.tel}">${F.phone}</a></dd></div>
        <div><dt>${icon.wa} WhatsApp</dt><dd><a href="${F.whatsapp}" rel="noopener" target="_blank">Message us</a></dd></div>
        <div><dt>${icon.mail} Email</dt><dd><a href="mailto:${F.email}">${F.email}</a></dd></div>
      </dl>
      <div class="hero-actions"><a class="btn" href="${p}contact/#book">Request an appointment</a><a class="btn btn-ghost" href="${F.mapsUrl}" rel="noopener" target="_blank">Get directions</a></div>
    </div>
    <figure class="visit-photo">${pic('medical-arts-centre-7131-bathurst', 'The brick and glass Medical Arts building at 7131 Bathurst Street, Thornhill, with its roadside sign', { p, sizes: '(max-width: 800px) 90vw, 45vw' })}<figcaption class="mono">7131 Bathurst St. · Unit 103</figcaption></figure>
  </div>
</section>`;
}

/* ───────── TREATMENT PAGES ───────── */
function treatment(t, idx) {
  const p = '../';
  const cat = CATEGORIES.find(c => c.id === t.cat);
  const isRes = t.gallery.some(g => /before/i.test(g[2])); const galH = isRes ? 'Results' : 'Gallery';
  const toc = [...t.sections.map(s => [s.id || slugify(s.h), s.h]), ...(t.gallery.length ? [['results', galH]] : []), ...(t.faq.length ? [['faq', 'FAQ']] : [])];
  const body = `
<section class="t-hero">
  <div class="wrap t-hero-grid">
    <div>
      <nav class="crumbs mono" aria-label="Breadcrumb"><a href="${p}">Home</a> / <a href="${p}services/">Treatments</a> / <span>${cat.name}</span></nav>
      <h1>${t.name}<span class="t-loc"> in Thornhill</span></h1>
      <p class="lede">${t.lede}</p>
      <div class="hero-actions"><a class="btn" href="${p}contact/?t=${t.slug}#book">Book a consultation</a><a class="btn btn-ghost" href="${F.tel}">${icon.phone} ${F.phone}</a></div>
    </div>
    <figure class="t-hero-img">${pic(t.img, t.imgAlt, { p, eager: true, sizes: '(max-width: 900px) 100vw, 45vw' })}<figcaption class="mono">T—${String(idx).padStart(2, '0')} · ${cat.name}</figcaption></figure>
  </div>
  <div class="wrap"><dl class="facts">${t.facts.map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>
</section>

<div class="wrap t-body">
  <aside class="t-toc"><p class="mono">On this page</p><ol>${toc.map(([id, h]) => `<li><a href="#${id}">${h}</a></li>`).join('')}</ol>
    <div class="toc-card"><p>Questions about ${t.short.toLowerCase()}?</p><a href="${F.tel}">${F.phone}</a><a href="${F.whatsapp}" rel="noopener" target="_blank">WhatsApp</a></div></aside>
  <article class="t-article">
    ${t.sections.map(s => `<section id="${s.id || slugify(s.h)}" class="t-sec"><h2>${s.h}</h2>${s.html}</section>`).join('\n')}
    ${t.gallery.length ? `<section id="results" class="t-sec"><h2>${galH}</h2><div class="gal">${t.gallery.map(g => `<figure>${pic(g[0], g[1], { p, sizes: '(max-width: 700px) 90vw, 360px' })}<figcaption class="mono">${g[2]}</figcaption></figure>`).join('')}</div>${isRes ? '<p class="small muted">Beauty Medical Clinic clients. Individual results vary.</p>' : ''}</section>` : ''}
    ${t.quotes.length ? `<section class="t-quotes">${t.quotes.map(quoteBlock).join('')}</section>` : ''}
    ${t.faq.length ? `<section id="faq" class="t-sec"><h2>${t.short} FAQ</h2><div class="faq">${t.faq.map(([q, a]) => `<details><summary><h3>${q}</h3></summary><p>${a}</p></details>`).join('')}</div></section>` : ''}
    <p class="note small">This page is general information, not medical advice. Your suitability for any treatment is confirmed at a consultation with Rebecca Victoria Adam, RN.</p>
  </article>
</div>

<section class="section related"><div class="wrap"><div class="sec-head"><p class="mono eyebrow">Often paired with</p><h2>Related treatments</h2></div><div class="tgrid three">${t.related.map(s => card(bySlug[s], p, T.indexOf(bySlug[s]) + 1)).join('')}</div></div></section>
${ctaBand(p, `Talk to Rebecca about ${t.short.toLowerCase()}.`)}
`;
  const ld = [
    { '@type': 'Service', '@id': SITE + t.slug + '/#service', name: t.name, serviceType: t.name, description: t.lede, url: SITE + t.slug + '/', provider: { '@id': SITE + '#business' }, areaServed: [{ '@type': 'City', name: 'Thornhill' }, { '@type': 'City', name: 'Toronto' }], image: SITE + 'assets/img/' + t.img + '.webp' },
    { ...biz, hasOfferCatalog: undefined },
    crumbs([['Home', ''], ['Treatments', 'services/'], [t.name, t.slug + '/']]),
    ...faqLd(t.faq)
  ];
  return page({ file: `${t.slug}/index.html`, p, canonical: `${t.slug}/`, title: t.title, desc: t.desc, ld, body });
}
const slugify = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ───────── SERVICES ───────── */
function services() {
  const p = '../';
  const body = `
<section class="p-hero"><div class="wrap">
  <nav class="crumbs mono" aria-label="Breadcrumb"><a href="${p}">Home</a> / <span>Treatments</span></nav>
  <h1>Non-surgical treatments in Thornhill</h1>
  <p class="lede">Sixteen treatments to tackle the signs of aging on several levels: lines and volume, skin quality, the body and the hair. Not sure which you need? That is exactly what a consultation is for.</p>
</div></section>
${CATEGORIES.map(c => `<section class="section cat-sec" id="${c.id}"><div class="wrap"><div class="sec-head row"><h2>${c.name}</h2><p>${c.blurb}</p></div>
<div class="tlist">${T.filter(t => t.cat === c.id).map(t => `<a class="trow" href="${p}${t.slug}/"><span class="trow-img">${pic(t.img, t.imgAlt, { p, sizes: '160px' })}</span><span class="trow-main"><span class="trow-h">${t.name}</span><span class="trow-p">${t.card}</span></span><span class="trow-facts mono">${t.facts.slice(0, 2).map(f => `<span>${f[0]}: ${f[1]}</span>`).join('')}</span><span class="trow-go">${icon.arrow}</span></a>`).join('')}</div></div></section>`).join('')}
${ctaBand(p)}`;
  return page({
    file: 'services/index.html', p, canonical: 'services/', current: 'services',
    title: 'Treatments | Beauty Medical Clinic, Thornhill',
    desc: 'All treatments at Beauty Medical Clinic in Thornhill: Botox, fillers, lips, microneedling, PRP, peels, Lumecca, Forma, BodyFX, Endospheres, sclerotherapy and hair.',
    ld: [{ ...biz }, crumbs([['Home', ''], ['Treatments', 'services/']])], body
  });
}

/* ───────── ABOUT ───────── */
function about() {
  const p = '../';
  const body = `
<section class="p-hero about-hero"><div class="wrap about-grid">
  <div>
    <nav class="crumbs mono" aria-label="Breadcrumb"><a href="${p}">Home</a> / <span>About</span></nav>
    <h1>Meet Rebecca Victoria Adam, RN</h1>
    <p class="lede">Registered Nurse, Certified Advanced Cosmetic Injector, and the founder of Beauty Medical Clinic in Thornhill. More than 30 years in medicine; more than a decade teaching doctors and nurses the techniques she uses on her own clients.</p>
  </div>
  <figure class="meet-photo">${pic('rebecca-victoria-adam-rn', 'Portrait of Rebecca Victoria Adam, RN, founder of Beauty Medical Clinic, in red-framed glasses and a pearl necklace', { p, eager: true, sizes: '(max-width: 800px) 90vw, 40vw' })}</figure>
</div></section>

<section class="section"><div class="wrap prose-grid">
  <div class="prose">
    <h2>From transplant ward to treatment room</h2>
    <p>Rebecca started as a Registered Nurse in the bone-marrow transplantation department of one of Israel’s leading hospitals, then worked as a wound-care nurse and educator with Johnson &amp; Johnson. After moving to Canada she earned her Registered Nurse diploma here and cared for her community as a visiting nurse for several years.</p>
    <p>She moved into medical aesthetics more than 17 years ago, training with some of the finest dermatologists and plastic surgeons, driven by a simple wish: to help women and men look and feel their best.</p>
    <h2>A teacher of teachers</h2>
    <p>Her technique earned her a reputation as one of Canada’s top medical aesthetics trainers. For over ten years she has taught hands-on Botox, dermal filler and sclerotherapy courses for medical doctors and registered nurses, and has trained hundreds of professionals from Australia, Europe and North America. <a href="${p}training/">About training</a>.</p>
    <h2>Anatomy, science and an artist’s eye</h2>
    <p>Rebecca keeps up with a fast-moving field, adopting new techniques and technology so clients get the best care and outcome. Her reputation rests on one thing: a natural, youthful look built on anatomy, science and artistic skill. Many clients notice a change after just one or two visits, depending on the treatment.</p>
  </div>
  <figure class="cert">${pic('rebecca-victoria-adam-certificates', 'Rebecca Victoria Adam’s framed diplomas and certificates on the clinic wall', { p, sizes: '(max-width: 800px) 90vw, 320px' })}<figcaption class="mono">Diplomas &amp; certificates, on the clinic wall</figcaption></figure>
</div></section>

<section class="section vision"><div class="wrap">
  <div class="sec-head"><p class="mono eyebrow">Rebecca’s vision</p><h2>Start young, stay young.</h2></div>
  <div class="vision-grid">
    <div class="prose">
      <p><b>What is the best age to think about medical aesthetics?</b> “There’s no age limit, as long as you are 18 or older, to start looking after what you have. Every age brings its own concerns: acne and acne scars when you’re young, then enlarged pores, then wrinkles. Starting a maintenance program at the right time means it won’t be so hard to get the results you want later.”</p>
      <p>“Invest in your skin. It will be with you, and represent you, for a very long time. Beautiful skin takes commitment, but the results are rewarding.”</p>
    </div>
    <div class="prose">
      <p>“I have wonderful clients I’ve seen since they were in their thirties. They’re in their fifties now, and they look radiant. Taking a good few years off a client’s age is why I’m so passionate about what I do.”</p>
      <p>“The goal is to age as gracefully as possible. If you start early enough, we can help delay the ageing process, and that’s something each of us deserves.”</p>
      <p class="sig-name">Yours, Rebecca Victoria Adam</p>
    </div>
  </div>
</div></section>

<section class="section values"><div class="wrap values-grid">
  <div><p class="mono eyebrow">The difference</p><h2>What clients can expect.</h2></div>
  <ol class="vlist"><li><span class="mono">01</span>Relationships built on trust and honesty</li><li><span class="mono">02</span>Compassion and empathy</li><li><span class="mono">03</span>Medical professionalism</li><li><span class="mono">04</span>An individual approach for every face</li><li><span class="mono">05</span>A friendly, pressure-free atmosphere</li></ol>
</div></section>

<section class="section"><div class="wrap qgrid">${[['Thank you so much for assisting me right through my journey! You are a very special person.', 'Sandra'], ['Am very pleased with the degree of professionalism and knowledge. Exceptional results that are a combination of artistry and skill. I highly recommend Victoria and the clinic.', 'Annette L.'], ['Victoria is a highly professional and gifted practitioner. She is honest, caring, and will always do her absolute best to give you what you are looking for.', 'Karen T., Google review']].map(quoteBlock).join('')}</div></section>
${ctaBand(p, 'Your first step: a conversation.')}`;
  return page({
    file: 'about/index.html', p, canonical: 'about/', current: 'about',
    title: 'About Rebecca Victoria Adam, RN | Beauty Medical Clinic',
    desc: 'Rebecca Victoria Adam, RN and Certified Advanced Cosmetic Injector: 30+ years in medicine and a trainer of doctors and nurses in Botox, fillers and sclerotherapy.',
    ogImg: 'assets/og.png',
    ld: [{ '@type': 'AboutPage', url: SITE + 'about/', about: { '@id': SITE + '#victoria' } }, person, { ...biz, hasOfferCatalog: undefined }, crumbs([['Home', ''], ['About', 'about/']])], body
  });
}

/* ───────── TRAINING ───────── */
function training() {
  const p = '../';
  const body = `
<section class="p-hero"><div class="wrap">
  <nav class="crumbs mono" aria-label="Breadcrumb"><a href="${p}">Home</a> / <span>Training</span></nav>
  <h1>Hands-on aesthetics training for doctors and nurses</h1>
  <p class="lede">Rebecca Victoria Adam, RN has taught medical professionals for more than ten years: hundreds of physicians and registered nurses from Australia, Europe and North America have learned her techniques.</p>
</div></section>
<section class="section"><div class="wrap train-grid">
  ${[['Botox & Dysport', 'Injection technique for the upper face: muscle anatomy, injection points, dosing and avoiding complications such as brow or lid ptosis.'], ['Dermal fillers', 'Hyaluronic acid filler placement for lips, cheeks, folds, chin and jawline, with an emphasis on natural, anatomy-led results.'], ['Sclerotherapy', 'Treating spider and reticular veins: patient selection, technique, compression and aftercare.']].map(([h, p2], i) => `<div class="train"><span class="mono">0${i + 1}</span><h2>${h}</h2><p>${p2}</p></div>`).join('')}
</div></section>
<section class="section"><div class="wrap prose narrow">
  <h2>Course dates and enrolment</h2>
  <p>Training is offered to medical doctors and registered nurses. For upcoming dates, class size and pricing, please call <a href="${F.tel}">${F.phone}</a> or email <a href="mailto:${F.email}?subject=Training%20enquiry">${F.email}</a>.</p>
</div></section>
${ctaBand(p, 'Ask about the next course.', 'Call, text or email Rebecca to hear about upcoming training dates.')}`;
  return page({
    file: 'training/index.html', p, canonical: 'training/', current: 'training',
    title: 'Botox, Filler & Sclerotherapy Training | Beauty Medical Clinic',
    desc: 'Hands-on Botox, dermal filler and sclerotherapy training for doctors and registered nurses with Rebecca Victoria Adam, RN, in Thornhill. Ask about course dates.',
    ld: [{ '@type': 'WebPage', url: SITE + 'training/', name: 'Aesthetics training for doctors and nurses', provider: { '@id': SITE + '#victoria' } }, person, crumbs([['Home', ''], ['Training', 'training/']])], body
  });
}

/* ───────── CONTACT ───────── */
function contact() {
  const p = '../';
  const body = `
<section class="p-hero"><div class="wrap">
  <nav class="crumbs mono" aria-label="Breadcrumb"><a href="${p}">Home</a> / <span>Contact</span></nav>
  <h1>Book a consultation in Thornhill</h1>
  <p class="lede">Call or text <a href="${F.tel}">${F.phone}</a>, message on WhatsApp, or send the form below and Rebecca will get back to you to arrange a time.</p>
</div></section>
<section class="section contact-sec" id="book"><div class="wrap contact-grid">
  <form class="form" data-form novalidate>
    <h2>Request an appointment</h2>
    <div class="f2"><label>Your name<input name="name" autocomplete="name" required></label><label>Phone<input name="phone" type="tel" autocomplete="tel"></label></div>
    <label>Email<input name="email" type="email" autocomplete="email" required></label>
    <label>I’m interested in<select name="treatment"><option value="">Not sure yet / general consultation</option>${CATEGORIES.map(c => `<optgroup label="${c.name}">${T.filter(t => t.cat === c.id).map(t => `<option value="${esc(t.name)}" data-slug="${t.slug}">${t.name}</option>`).join('')}</optgroup>`).join('')}<option value="Training for MDs/RNs">Training (for MDs and RNs)</option></select></label>
    <fieldset><legend>Best way to reach you</legend><label class="radio"><input type="radio" name="via" value="Phone call" checked> Call</label><label class="radio"><input type="radio" name="via" value="Text message"> Text</label><label class="radio"><input type="radio" name="via" value="Email"> Email</label></fieldset>
    <label>Message<textarea name="message" rows="4" placeholder="Days and times that suit you, or any questions."></textarea></label>
    <p class="small muted">Please don’t include detailed medical history here; Rebecca will go over it with you in person.</p>
    <button class="btn" type="submit">Send request</button>
    <p class="form-msg" role="status" data-form-msg></p>
  </form>
  <div class="contact-side">
    <dl class="vdl">
      <div><dt>${icon.phone} Call or text</dt><dd><a href="${F.tel}">${F.phone}</a></dd></div>
      <div><dt>${icon.wa} WhatsApp</dt><dd><a href="${F.whatsapp}" rel="noopener" target="_blank">Chat on WhatsApp</a></dd></div>
      <div><dt>${icon.mail} Email</dt><dd><a href="mailto:${F.email}">${F.email}</a></dd></div>
      <div><dt>${icon.pin} Address</dt><dd>${F.building}<br>${F.street}<br>${F.city}, ${F.region} ${F.postal}<br><span class="muted">Main intersection: ${F.intersection}</span></dd></div>
    </dl>
    <div class="map"><iframe title="Map showing Beauty Medical Clinic at 7131 Bathurst St, Thornhill" src="${F.mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <figure>${pic('medical-arts-centre-7131-bathurst', 'The Medical Arts building at 7131 Bathurst Street, Thornhill', { p, sizes: '(max-width: 800px) 90vw, 40vw' })}<figcaption class="mono">Look for the Medical Arts sign on Bathurst St.</figcaption></figure>
  </div>
</div></section>`;
  return page({
    file: 'contact/index.html', p, canonical: 'contact/', current: 'contact',
    title: 'Contact & Book | Beauty Medical Clinic, Thornhill',
    desc: 'Book at Beauty Medical Clinic, 7131 Bathurst St., Unit 103, Thornhill (Bathurst & Steeles). Call or text 416-728-5697, WhatsApp, or email the clinic.',
    ld: [{ '@type': 'ContactPage', url: SITE + 'contact/', about: { '@id': SITE + '#business' } }, { ...biz, hasOfferCatalog: undefined }, crumbs([['Home', ''], ['Contact', 'contact/']])], body
  });
}

/* ───────── PRIVACY ───────── */
function privacy() {
  const p = '../';
  const body = `<section class="p-hero"><div class="wrap"><h1>Privacy policy</h1><p class="lede">How ${F.name} handles information you share through this website.</p></div></section>
<section class="section"><div class="wrap prose narrow">
  <h2>What we collect</h2><p>This website does not use advertising or tracking cookies. If you send the appointment request form, it opens your own email program addressed to ${F.email} with the details you typed. We receive only what you choose to send: usually your name, phone number, email address, the treatment you are interested in and your message.</p>
  <h2>How we use it</h2><p>We use your details only to reply to you and arrange your appointment. We do not sell or share them. Health information you discuss at the clinic is handled under Ontario’s Personal Health Information Protection Act (PHIPA).</p>
  <h2>Third-party content</h2><p>The contact page shows a Google Map, and some links open WhatsApp or Google Maps. Those services have their own privacy policies.</p>
  <h2>Questions</h2><p>Contact us at <a href="mailto:${F.email}">${F.email}</a> or <a href="${F.tel}">${F.phone}</a>.</p>
</div></section>`;
  return page({ file: 'privacy-policy/index.html', p, canonical: 'privacy-policy/', title: 'Privacy Policy | Beauty Medical Clinic', desc: 'How Beauty Medical Clinic in Thornhill handles the information you send through its website and appointment request form.', ld: [website], body });
}

/* ───────── 404 + redirects ───────── */
function notFound() {
  const p = '/';
  const body = `<section class="p-hero nf"><div class="wrap"><p class="mono eyebrow">404</p><h1>That page has moved.</h1><p class="lede">The clinic’s website has a new look. Try one of these:</p><div class="hero-actions"><a class="btn" href="${p}services/">All treatments</a><a class="btn btn-ghost" href="${p}contact/">Contact</a><a class="btn btn-ghost" href="${p}">Home</a></div></div></section>`;
  // 404 is served at any depth, so links are root-absolute (update when moving to the real domain)
  return page({ file: '404.html', p, canonical: '', title: 'Page not found | Beauty Medical Clinic', desc: 'This page has moved. Browse treatments or contact Beauty Medical Clinic in Thornhill.', ld: [website], body });
}

function redirects() {
  // Cloudflare reads _redirects for real 301s; the stub pages below cover GitHub Pages
  fs.writeFileSync(path.join(ROOT, '_redirects'), Object.entries(REDIRECTS).flatMap(([from, to]) => [`/${from} /${to} 301`, `/${from}/ /${to} 301`]).join('\n') + '\n');
  for (const [from, to] of Object.entries(REDIRECTS)) {
    const html = `<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><title>Moved | ${F.name}</title><meta name="robots" content="noindex"><link rel="canonical" href="${SITE}${to}"><meta http-equiv="refresh" content="0; url=../${to}"></head><body><p>This page has moved to <a href="../${to}">${SITE}${to}</a>.</p></body></html>\n`;
    const out = path.join(ROOT, from, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  }
}

function sitemap() {
  const urls = ['', 'services/', 'about/', 'contact/', 'training/', 'privacy-policy/', ...T.map(t => t.slug + '/')];
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>2026-11-11</lastmod></url>`).join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
}

home(); services(); about(); training(); contact(); privacy(); notFound();
T.forEach((t, i) => treatment(t, i + 1));
redirects(); sitemap();
console.log('built', 7 + T.length, 'pages +', Object.keys(REDIRECTS).length, 'redirects');
