(function () {
  const btn = document.querySelector('[data-burger]');
  const panel = document.querySelector('[data-mobile-nav]');
  if (!btn || !panel) return;

  function setOpen(nextOpen){
    panel.setAttribute('data-open', String(nextOpen));
    panel.classList.toggle('open', nextOpen);
    btn.setAttribute('aria-expanded', String(nextOpen));
    document.body.classList.toggle('menu-open', nextOpen);
  }

  btn.addEventListener('click', () => {
    const open = panel.getAttribute('data-open') === 'true';
    setOpen(!open);
  });

  // Close menu on link click
  panel.addEventListener('click', (e) => {
    if (e.target.matches('a')) setOpen(false);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
