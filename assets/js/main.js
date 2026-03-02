(function () {
  const btn = document.querySelector('[data-burger]');
  const panel = document.querySelector('[data-mobile-nav]');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    const open = panel.getAttribute('data-open') === 'true';
    panel.setAttribute('data-open', String(!open));
    btn.setAttribute('aria-expanded', String(!open));
  });

  // Close menu on click
  panel.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      panel.setAttribute('data-open', 'false');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
