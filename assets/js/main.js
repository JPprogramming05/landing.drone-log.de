(function () {
  const btn = document.querySelector('[data-burger]');
  const panel = document.querySelector('[data-mobile-nav]');
  const desktopNav = document.querySelector('.nav');
  if (!btn || !panel) return;

  // Build mobile nav once by cloning desktop links
  if (desktopNav && !panel.dataset.built) {
    const links = Array.from(desktopNav.querySelectorAll('a')).map(a => ({
      href: a.getAttribute('href'),
      label: a.textContent.trim()
    }));

    panel.innerHTML = `
      <div class="mobile-panel">
        <div class="mobile-actions">
          <a class="btn" href="https://drone-log.de/" target="_blank" rel="noopener">Login</a>
          <a class="btn primary" href="anfragen.html">Jetzt anfragen</a>
        </div>
        <div class="mobile-links">
          ${links.map(l => `<a class="mobile-link" href="${l.href}">${l.label}</a>`).join('')}
        </div>
      </div>
    `;
    panel.dataset.built = "true";
  }

  function setOpen(nextOpen){
    panel.setAttribute('data-open', String(nextOpen));
    panel.classList.toggle('open', nextOpen);
    btn.setAttribute('aria-expanded', String(nextOpen));
    btn.setAttribute('aria-label', nextOpen ? 'Menü schließen' : 'Menü öffnen');
    document.body.classList.toggle('menu-open', nextOpen);
  }

  btn.addEventListener('click', () => {
    const open = panel.getAttribute('data-open') === 'true';
    setOpen(!open);
  });

  panel.addEventListener('click', (e) => {
    if (e.target.matches('a')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // Active menu highlighting (desktop + mobile)
  function markActive(container){
    if (!container) return;
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    container.querySelectorAll('a').forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      const target = href === '' ? 'index.html' : href;
      const isActive = (current === target) || (current === '' && target === 'index.html');
      a.classList.toggle('active', isActive);
      a.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  markActive(desktopNav);
  markActive(panel);
})();


/* YouTube embeds: load iframe only on http(s); show thumbnail+link on file:// */
(function(){
  const embeds = document.querySelectorAll('.video-embed[data-youtube-id]');
  if(!embeds.length) return;

  const isFile = location.protocol === 'file:';
  embeds.forEach(el => {
    const id = el.getAttribute('data-youtube-id');
    if(!id) return;

    if(isFile){
      el.innerHTML = `
        <div class="yt-local">
          <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">
            <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="YouTube Video">
            <span>Video auf YouTube öffnen</span>
          </a>
          <div class="yt-hint">Hinweis: YouTube-Embeds funktionieren lokal (file://) oft nicht. Bitte über GitHub Pages oder einen lokalen Webserver testen.</div>
        </div>
      `;
    }else{
      const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
      el.innerHTML = `
        <iframe src="${src}" title="YouTube Video" loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      `;
    }
  });
})();

