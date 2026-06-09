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

/* ---------- Project preview popover (anchored, smart-placed) ---------- */
(() => {
  const pop = document.getElementById('project-preview');
  if (!pop) return;

  const titleEl   = pop.querySelector('[data-preview-title]');
  const tagEl     = pop.querySelector('[data-preview-tag]');
  const summaryEl = pop.querySelector('[data-preview-summary]');
  const writeupEl = pop.querySelector('[data-preview-writeup]');
  const sourceEl  = pop.querySelector('[data-preview-source]');
  const closeBtn  = pop.querySelector('[data-preview-close]');
  const arrowEl   = pop.querySelector('.preview-arrow');

  let anchorCard = null;
  const GAP = 12;      // distance between card and popover
  const MARGIN = 16;   // viewport edge buffer

  const supportsPopover = typeof pop.showPopover === 'function';

  // Compute and apply position relative to anchor card
  function position() {
    if (!anchorCard) return;
    const r = anchorCard.getBoundingClientRect();
    const pw = pop.offsetWidth;
    const ph = pop.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Vertical placement: prefer below, fall back to above, then squeeze
    let top, placement;
    if (r.bottom + GAP + ph + MARGIN <= vh) {
      top = r.bottom + GAP;
      placement = 'bottom';
    } else if (r.top - GAP - ph >= MARGIN) {
      top = r.top - GAP - ph;
      placement = 'top';
    } else {
      // viewport-constrained: pin to bottom of viewport
      top = Math.max(MARGIN, vh - ph - MARGIN);
      placement = 'bottom';
    }

    // Horizontal: center on card, clamp inside viewport
    const cardCenterX = r.left + r.width / 2;
    let left = cardCenterX - pw / 2;
    left = Math.max(MARGIN, Math.min(left, vw - pw - MARGIN));

    pop.style.left = `${left}px`;
    pop.style.top  = `${top}px`;
    pop.dataset.placement = placement;

    // Arrow horizontal offset relative to popover
    const arrowX = Math.max(16, Math.min(pw - 16, cardCenterX - left));
    arrowEl.style.left = `${arrowX}px`;
    arrowEl.style.marginLeft = `-6px`;
  }

  function openPreview(card) {
    anchorCard = card;

    const link    = card.querySelector('a[href]');
    const writeup = link ? link.getAttribute('href') : '#';
    const source  = card.dataset.source || writeup;
    const title   = card.querySelector('h3')?.textContent?.trim() || 'Project';
    const tag     = card.querySelector('.project-tag')?.textContent?.trim() || '';
    const summary = card.dataset.summary || card.querySelector('.project-body p')?.textContent?.trim() || '';

    titleEl.textContent   = title;
    tagEl.textContent     = tag;
    tagEl.style.display   = tag ? '' : 'none';
    summaryEl.textContent = summary;
    writeupEl.setAttribute('href', writeup);
    sourceEl.setAttribute('href', source);

    // Place off-screen first to measure without flicker
    pop.style.left = '-9999px';
    pop.style.top  = '-9999px';

    if (supportsPopover) {
      pop.showPopover();
    } else {
      pop.classList.add('is-open');
      pop.setAttribute('data-open', '');
    }

    // Now we can measure and position
    requestAnimationFrame(position);
    // Re-position after the entry transition in case width settled
    setTimeout(position, 60);
  }

  function closePreview() {
    if (supportsPopover && pop.matches(':popover-open')) {
      pop.hidePopover();
    } else {
      pop.classList.remove('is-open');
      pop.removeAttribute('data-open');
    }
    anchorCard = null;
  }

  // Wire up card clicks
  document.querySelectorAll('.project-card').forEach(card => {
    const link = card.querySelector('a[href]');
    if (!link) return;
    link.addEventListener('click', (e) => {
      // Cmd/Ctrl/Shift/middle-click → let browser open writeup in new tab
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      openPreview(card);
    });
  });

  closeBtn?.addEventListener('click', closePreview);

  // Reposition while open; close if the anchor card scrolls fully out of view
  const onReposition = () => {
    if (!anchorCard) return;
    const r = anchorCard.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) {
      closePreview();
      return;
    }
    position();
  };
  window.addEventListener('resize', onReposition);
  window.addEventListener('scroll', onReposition, { passive: true });

  // Close the popover after clicking an action — feels cleaner than leaving it open
  [writeupEl, sourceEl].forEach(btn => {
    btn?.addEventListener('click', () => {
      // Slight delay so the navigation/new-tab-open is committed first
      setTimeout(closePreview, 80);
    });
  });

  // Light-dismiss is built into popover="auto" — but for fallback browsers,
  // catch outside clicks
  if (!supportsPopover) {
    document.addEventListener('click', (e) => {
      if (!anchorCard) return;
      if (pop.contains(e.target)) return;
      if (e.target.closest('.project-card a')) return;
      closePreview();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && anchorCard) closePreview();
    });
  }

  // Clear anchorCard when popover closes via native light-dismiss
  pop.addEventListener('toggle', (e) => {
    if (e.newState === 'closed') anchorCard = null;
  });
})();

/* ---------- Scroll memory across writeup navigation ---------- */
(() => {
  const KEY = 'portfolio-scroll';
  const html = document.documentElement;

  const clearMask = () => {
    // Remove the "page hidden during restore" mask set by the inline head script
    html.classList.remove('restoring-scroll');
  };

  // Save scroll position on any nav to a writeup
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="assets/writeups/"]');
    if (a) sessionStorage.setItem(KEY, String(window.scrollY));
  }, true);

  // Restore on return (handles non-bfcache back-nav; bfcache restores natively)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      // bfcache already restored everything (including scroll) — just unhide
      clearMask();
      return;
    }

    const stored = sessionStorage.getItem(KEY);
    if (stored === null) {
      // Fresh load with nothing to restore — unhide if mask was set spuriously
      clearMask();
      return;
    }
    const y = parseInt(stored, 10);
    sessionStorage.removeItem(KEY);
    if (Number.isNaN(y)) { clearMask(); return; }

    // Stop browser scroll-restoration from fighting us
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    // Pre-reveal everything so the page is the same height it was when we left —
    // otherwise the scroll target may overshoot before reveal observers fire.
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));

    // Two RAFs: first frame applies layout + scroll, second frame fades the page in
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
      requestAnimationFrame(clearMask);
    });
  });

  // Belt-and-suspenders: never let the mask linger past page load
  window.addEventListener('load', () => setTimeout(clearMask, 400));
})();
