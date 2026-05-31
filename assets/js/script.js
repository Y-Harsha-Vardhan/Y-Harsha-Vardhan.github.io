'use strict';

/* =========================================================
   Portfolio — interactions
   ========================================================= */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Footer year + last-updated ---------- */
const yearEl = $('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const updatedEl = $('[data-last-updated]');
if (updatedEl) {
  // document.lastModified reflects the file's mtime on most static hosts (GH Pages,
  // Netlify, Vercel, file://). Falls back to "now" if the header is missing/zero.
  const raw = Date.parse(document.lastModified);
  const d = Number.isFinite(raw) && raw > 0 ? new Date(raw) : new Date();
  updatedEl.textContent = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  updatedEl.dateTime = d.toISOString().slice(0, 10);
}

/* ---------- Mouse spotlight ---------- */
(() => {
  if (prefersReduced) return;
  const glow = $('.cursor-glow');
  if (!glow) return;
  let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
  let tx = rx, ty = ry;
  const w = 520;
  window.addEventListener('pointermove', (e) => {
    tx = e.clientX; ty = e.clientY;
  }, { passive: true });
  const tick = () => {
    rx += (tx - rx) * 0.12;
    ry += (ty - ry) * 0.12;
    glow.style.setProperty('--mx', `${rx - w / 2}px`);
    glow.style.setProperty('--my', `${ry - w / 2}px`);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

/* ---------- Spotlight cards (per-card mouse pos) ---------- */
(() => {
  const groups = $$('[data-spotlight-group]');
  groups.forEach(group => {
    group.addEventListener('pointermove', (e) => {
      $$('[data-spotlight]', group).forEach(card => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty('--sx', `${x}%`);
        card.style.setProperty('--sy', `${y}%`);
      });
    });
  });
})();

/* ---------- Scroll progress + sticky header state ---------- */
(() => {
  const bar = $('.scroll-progress');
  const header = $('.site-header');
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = `${pct}%`;
    if (header) header.classList.toggle('is-scrolled', h.scrollTop > 8);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Scroll-spy + nav indicator ---------- */
(() => {
  const links = $$('[data-nav]');
  const indicator = $('.nav-indicator');
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
    const active = links.find(a => a.getAttribute('href') === `#${id}`);
    if (active && indicator && getComputedStyle(indicator).display !== 'none') {
      const r = active.getBoundingClientRect();
      const nav = indicator.parentElement.getBoundingClientRect();
      indicator.style.transform = `translateX(${r.left - nav.left}px)`;
      indicator.style.width = `${r.width}px`;
      indicator.style.opacity = '1';
    }
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));

  const refreshActive = () => {
    const active = links.find(a => a.classList.contains('is-active'));
    if (active) setActive(active.getAttribute('href').slice(1));
  };
  window.addEventListener('resize', refreshActive);
  window.addEventListener('load', refreshActive);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshActive);
})();

/* ---------- Reveal on scroll ---------- */
(() => {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window) || prefersReduced) {
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // small stagger when multiple enter at once
        setTimeout(() => e.target.classList.add('in-view'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));

  // Safety net: any reveal still hidden after 2.5s (above-the-fold deep-link,
  // observer never fires, JS error elsewhere) gets force-shown so the page
  // can never end up invisible.
  setTimeout(() => {
    $$('.reveal:not(.in-view)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in-view');
    });
  }, 2500);
  // And on full load, anything currently in viewport
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      $$('.reveal:not(.in-view)').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) el.classList.add('in-view');
      });
    });
  });

})();

/* ---------- Resume tabs ---------- */
(() => {
  const tabs = $$('.resume-tab');
  const panels = $$('.resume-panel');
  const indicator = $('.resume-tab-indicator');
  if (!tabs.length) return;

  const move = (tab) => {
    if (!indicator) return;
    indicator.style.width = `${tab.offsetWidth}px`;
    indicator.style.transform = `translateX(${tab.offsetLeft - 6}px)`;
  };

  const activate = (tab) => {
    tabs.forEach(t => { t.classList.toggle('is-active', t === tab); t.setAttribute('aria-selected', String(t === tab)); });
    const id = tab.dataset.tab;
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === id));
    move(tab);
  };

  tabs.forEach(t => t.addEventListener('click', () => activate(t)));

  const reposition = () => {
    const active = tabs.find(t => t.classList.contains('is-active')) || tabs[0];
    if (active && active.offsetWidth) move(active);
  };

  // Initial position — wait for layout
  requestAnimationFrame(reposition);
  // Web fonts settle after first paint; recompute when they're ready
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reposition);
  // ion-icon mounts asynchronously; ResizeObserver catches the resulting size change
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(reposition);
    tabs.forEach(t => ro.observe(t));
  }
  window.addEventListener('load', reposition);
  window.addEventListener('resize', reposition);
})();

/* ---------- Live Codeforces rating ---------- */
(() => {
  const slot = $('[data-cf-handle]');
  if (!slot) return;
  const handle = slot.dataset.cfHandle;
  const ratingEl = $('[data-cf-rating]', slot);
  const rankEl = $('[data-cf-rank]', slot);

  // Official CF rank → color. Tuned slightly for dark-bg legibility.
  const RANK_COLOR = {
    'newbie':                    '#9aa0a6',
    'pupil':                     '#34d399',
    'specialist':                '#22d3ee',
    'expert':                    '#60a5fa',
    'candidate master':          '#c084fc',
    'master':                    '#fb923c',
    'international master':      '#fb923c',
    'grandmaster':               '#f87171',
    'international grandmaster': '#ef4444',
    'legendary grandmaster':     '#dc2626',
  };
  const titleCase = (s) => s.replace(/\b\w/g, c => c.toUpperCase());

  const render = (user) => {
    if (!user || typeof user.rating !== 'number') {
      slot.dataset.state = 'unrated';
      ratingEl.textContent = '—';
      rankEl.textContent = `Codeforces · @${handle}`;
      return;
    }
    const rank = (user.rank || 'unrated').toLowerCase();
    const color = RANK_COLOR[rank] || '#9aa0a6';
    slot.style.setProperty('--cf-color', color);
    slot.dataset.state = 'ok';
    ratingEl.textContent = user.rating;
    rankEl.textContent = `Codeforces · ${titleCase(user.rank)}`;
  };

  const renderError = () => {
    slot.dataset.state = 'error';
    ratingEl.textContent = 'CF';
    rankEl.textContent = `Codeforces · @${handle}`;
  };

  // Serve from cache instantly, then refresh in background
  const cacheKey = `cf:${handle}`;
  const ttl = 60 * 60 * 1000; // 1 hour
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (cached && cached.t && Date.now() - cached.t < ttl) {
      render(cached.user);
    } else {
      slot.dataset.state = 'loading';
    }
  } catch { slot.dataset.state = 'loading'; }

  fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`, { cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(json => {
      if (json.status !== 'OK' || !json.result || !json.result[0]) throw 0;
      const user = json.result[0];
      render(user);
      try { localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), user })); } catch {}
    })
    .catch(() => {
      // If cache already populated the slot, keep that view. Otherwise, show fallback.
      if (slot.dataset.state !== 'ok') renderError();
    });
})();

/* ---------- Back to top ---------- */
(() => {
  const btn = $('[data-to-top]');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 600);
  document.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
  onScroll();
})();

/* ---------- Project filters ---------- */
(() => {
  const btns = $$('.filter-btn');
  const cards = $$('.project-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      btns.forEach(b => b.classList.toggle('is-active', b === btn));
      cards.forEach(c => {
        const match = f === 'all' || c.dataset.category === f;
        c.classList.toggle('is-hidden', !match);
      });
    });
  });
})();

/* ---------- Mobile menu ---------- */
(() => {
  const btn = $('[data-menu-btn]');
  const nav = $('.nav');
  if (!btn || !nav) return;
  const close = () => { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
  $$('[data-nav]').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) close();
  });
})();

/* ---------- Contact form ---------- */
(() => {
  const form = $('[data-form]');
  if (!form) return;
  const inputs = $$('[data-form-input]', form);
  const btn = $('[data-form-btn]', form);
  const success = $('.form-success');

  const check = () => {
    const ok = inputs.every(i => i.checkValidity() && i.value.trim().length > 0);
    btn.disabled = !ok;
  };
  inputs.forEach(i => i.addEventListener('input', check));
  check();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (btn.disabled) return;
    btn.disabled = true;
    const original = btn.innerHTML;
    btn.innerHTML = '<span>Sending…</span>';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        if (success) success.hidden = false;
        btn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Sent</span>';
      } else {
        btn.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon><span>Try again</span>';
        btn.disabled = false;
      }
    } catch {
      btn.innerHTML = original;
      btn.disabled = false;
    }
  });
})();

/* ---------- Avatar tilt ---------- */
(() => {
  if (prefersReduced) return;
  const stage = $('[data-tilt]');
  if (!stage) return;
  let raf = null;
  const onMove = (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      stage.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
    });
  };
  const reset = () => { stage.style.transform = ''; };
  stage.addEventListener('pointermove', onMove);
  stage.addEventListener('pointerleave', reset);
})();

/* ---------- Smooth in-page scroll with header offset ---------- */
(() => {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });
})();
