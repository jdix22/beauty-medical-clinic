/* Beauty Medical Clinic — site behaviour (no dependencies) */
(() => {
  // Set FORM_ENDPOINT to a form service URL (e.g. Formspree) to send requests directly; empty = opens email.
  const FORM_ENDPOINT = '';
  const CLINIC_EMAIL = 'info@beautymedicalclinic.com';

  document.documentElement.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  $$('[data-year]').forEach(n => { n.textContent = new Date().getFullYear(); });

  // Header shadow on scroll
  const head = $('[data-head]');
  const onScroll = () => head && head.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Mega menu
  const megaBtn = $('[data-mega-btn]'), mega = $('[data-mega]');
  if (megaBtn && mega) {
    const set = open => { megaBtn.setAttribute('aria-expanded', open); mega.hidden = !open; };
    megaBtn.addEventListener('click', () => set(mega.hidden));
    document.addEventListener('click', e => { if (!mega.hidden && !mega.contains(e.target) && e.target !== megaBtn && !megaBtn.contains(e.target)) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }

  // Mobile drawer
  const burger = $('[data-burger]'), drawer = $('[data-drawer]');
  if (burger && drawer) {
    const set = open => { burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); drawer.hidden = !open; document.body.style.overflow = open ? 'hidden' : ''; };
    burger.addEventListener('click', () => set(drawer.hidden));
    $$('a', drawer).forEach(a => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) set(false); });
  }

  // Face map
  const fm = $('[data-facemap]');
  if (fm) {
    const pick = id => {
      $$('[data-zone]', fm).forEach(b => b.setAttribute('aria-pressed', b.dataset.zone === id));
      $$('[data-panel]', fm).forEach(p => { p.hidden = p.dataset.panel !== id; });
      const chip = $(`.chip[data-zone="${id}"]`, fm);
      if (chip && chip.parentElement.scrollWidth > chip.parentElement.clientWidth) chip.parentElement.scrollTo({ left: chip.offsetLeft - 24, behavior: 'smooth' });
    };
    $$('[data-zone]', fm).forEach(b => b.addEventListener('click', () => { pick(b.dataset.zone); stop(); }));
    // Gentle auto-tour until the visitor interacts
    const ids = $$('.zone', fm).map(b => b.dataset.zone);
    let i = ids.indexOf('lips'), timer = null;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stop = () => { clearInterval(timer); timer = null; };
    if (!reduce) {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && timer === null && !fm.dataset.touched) timer = setInterval(() => { i = (i + 1) % ids.length; pick(ids[i]); }, 3200);
        else if (!e.isIntersecting) stop();
      }, { threshold: .4 });
      io.observe(fm);
      fm.addEventListener('pointerdown', () => { fm.dataset.touched = 1; stop(); });
      fm.addEventListener('focusin', () => { fm.dataset.touched = 1; stop(); });
    }
  }

  // Treatment category tabs
  const tabs = $$('.cat-tabs [data-cat]'), grid = $('[data-tgrid]');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.setAttribute('aria-selected', x === t));
    $$('.tcard', grid).forEach(c => { c.hidden = t.dataset.cat !== 'all' && c.dataset.c !== t.dataset.cat; });
  }));

  // Reviews carousel
  const track = $('[data-reviews]');
  $$('[data-rev]').forEach(b => b.addEventListener('click', () => {
    const card = track.firstElementChild; if (!card) return;
    track.scrollBy({ left: (card.offsetWidth + 20) * +b.dataset.rev, behavior: 'smooth' });
  }));

  // Table-of-contents highlight
  const tocLinks = $$('.t-toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(tocLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { tocLinks.forEach(a => a.classList.remove('on')); const a = map.get(e.target.id); if (a) a.classList.add('on'); }
    }), { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  // Reveal on scroll
  const rv = $$('.sec-head, .intro-copy, .intro-photo, .fm-copy, .tcard, .sig, .res, .rev, .meet-photo, .meet-copy, .vlist li, .t-sec, .quote, .trow, .train, .visit-photo');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(n => { if (n.getBoundingClientRect().top > innerHeight) { n.classList.add('rv'); io.observe(n); } });
  }

  // Contact form: preselect treatment from ?t=slug, then send by email (or FORM_ENDPOINT)
  const form = $('[data-form]');
  if (form) {
    const want = new URLSearchParams(location.search).get('t');
    if (want) { const o = $(`option[data-slug="${CSS.escape(want)}"]`, form); if (o) o.selected = true; }
    const msg = $('[data-form-msg]');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      if (!d.name || !d.email || !/^\S+@\S+\.\S+$/.test(d.email)) { msg.textContent = 'Please add your name and a valid email.'; (d.name ? form.email : form.name).focus(); return; }
      const subject = `Appointment request: ${d.treatment || 'consultation'}`;
      const text = `Name: ${d.name}\nPhone: ${d.phone || '-'}\nEmail: ${d.email}\nInterested in: ${d.treatment || 'Not sure yet'}\nBest way to reach me: ${d.via}\n\n${d.message || ''}`;
      if (FORM_ENDPOINT) {
        try {
          const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, _subject: subject }) });
          if (!r.ok) throw 0;
          form.reset(); msg.textContent = 'Thank you. Rebecca will be in touch shortly.'; return;
        } catch { /* fall through to email */ }
      }
      location.href = `mailto:${CLINIC_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      msg.textContent = 'Your email app should open with your request ready to send. If it doesn’t, call or text 416-728-5697.';
    });
  }
})();
