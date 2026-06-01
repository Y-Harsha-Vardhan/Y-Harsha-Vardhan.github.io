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
