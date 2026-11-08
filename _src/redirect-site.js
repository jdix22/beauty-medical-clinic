// Builds the beautymedicalclinic.com forwarding site: one page per old address, each sending visitors to its exact new page.
const fs = require('fs'), path = require('path');
const SRC = 'C:/Users/jorda/OneDrive/Desktop/Websties/beauty-medical-clinic';
const OUT = 'C:/Users/jorda/OneDrive/Desktop/Websties/beautymedicalclinic-redirect';
const { REDIRECTS } = require(SRC + '/_src/content.js');
const NEW = 'https://beautymedical.ca/';
const old = ['', 'home','training','hyaluronic-acid-dermal-fillers','news','herbal-peel-pre-and-post-treatment-instructions','micro-needling-pre-and-post-treatment-instructions','lets-laugh','services','contact','about','faq','your-perfect-lips','cinderella-facelift','privacy-policy','botox-dysport-faq','hyaluronic-acid','dermal-fillers','prp-rejuvenation','organic-peel','microneedling','salt-and-silk-facial','skin-boosters','radio-frequency-skin-tightening','mesotherapy','sclerotherapy','botox-dysport','radiofrequency-skin-tightening','forma-faq','lumeca','lumecca-faq','body-fx','bodyfx-faq','hair-loss-and-thinning-treatment','maintenance','face-treatment','promotions','endospheres-therapy', ...Object.keys(REDIRECTS)];
const page = (to) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Beauty Medical Clinic has moved to beautymedical.ca</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)});</script>
</head><body style="font-family:system-ui,sans-serif;padding:2rem">
<p>Beauty Medical Clinic has moved to <a href="${to}">beautymedical.ca</a>.</p>
</body></html>
`;
const done = new Set();
for (const slug of old) {
  if (done.has(slug)) continue; done.add(slug);
  const target = slug === '' ? '' : (slug in REDIRECTS ? REDIRECTS[slug] : slug + '/');
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(NEW + target));
}
// Any other old address (images, odd links): keep the path and let the new site sort it out.
fs.writeFileSync(path.join(OUT, '404.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Beauty Medical Clinic has moved to beautymedical.ca</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<script>location.replace("https://beautymedical.ca" + location.pathname + location.search + location.hash);</script>
</head><body style="font-family:system-ui,sans-serif;padding:2rem">
<p>Beauty Medical Clinic has moved to <a href="https://beautymedical.ca/">beautymedical.ca</a>.</p>
</body></html>
`);
fs.writeFileSync(path.join(OUT, 'CNAME'), 'beautymedicalclinic.com\n');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\n');
fs.writeFileSync(path.join(OUT, 'README.md'), `# beautymedicalclinic.com forwarding

GitHub Pages site that forwards Victoria's old domain to https://beautymedical.ca/.
Every old WordPress address has its own page that sends visitors (and Google) to the matching new page;
anything else falls through to 404.html, which keeps the path.

DNS at her host (privatesystems.net cPanel), set by her:
- MX for beautymedicalclinic.com must point to mail.beautymedicalclinic.com (her server) BEFORE the A records change.
- @ A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; @ AAAA removed.
- www CNAME: jdix22.github.io

Once DNS points here, turn on "Enforce HTTPS" in the repo's Pages settings.
Regenerate from the main site's redirect map with the gen-redirect script if old addresses change.
`);
console.log('pages:', done.size);
