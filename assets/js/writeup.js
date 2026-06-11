/* Smooth back navigation from writeup pages.
   When the user arrived from the portfolio in this session, use history.back()
   so the browser restores their exact scroll position (and bfcache, when
   available, makes the return instant). Falls through to the link's href as
   a fallback for direct-link / cross-origin visits. */
(() => {
  const back = document.querySelector('[data-back]');
  if (!back) return;

  back.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    if (history.length <= 1) return;
    try {
      const ref = document.referrer;
      if (!ref) return;
      if (new URL(ref, location.href).origin !== location.origin) return;
    } catch (_) { return; }

    e.preventDefault();
    history.back();
  });
})();

(() => {
  const btn = document.querySelector('[data-copy-link]');
  if (!btn) return;
  const label = btn.querySelector('span');
  const icon = btn.querySelector('ion-icon');
  const originalLabel = label ? label.textContent : '';
  const originalIcon = icon ? icon.getAttribute('name') : '';
  let resetTimer;

  btn.addEventListener('click', async () => {
    const url = location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
    }
    btn.classList.add('is-copied');
    if (label) label.textContent = 'Copied';
    if (icon) icon.setAttribute('name', 'checkmark-outline');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      btn.classList.remove('is-copied');
      if (label) label.textContent = originalLabel;
      if (icon) icon.setAttribute('name', originalIcon);
    }, 1600);
  });
})();
