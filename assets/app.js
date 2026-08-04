(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  const setNavOpen = (open) => {
    if (!nav || !menuButton) return;
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  if (menuButton && nav) {
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('button');
      backdrop.type = 'button';
      backdrop.className = 'nav-backdrop';
      backdrop.setAttribute('aria-label', 'Close navigation');
      document.body.appendChild(backdrop);
    }

    menuButton.addEventListener('click', () => {
      setNavOpen(!nav.classList.contains('open'));
    });
    backdrop.addEventListener('click', () => setNavOpen(false));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNavOpen(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setNavOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 1061px)').matches) setNavOpen(false);
    });
  }

  const tabButtons = [...document.querySelectorAll('[data-tab]')];
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
      tabButtons.forEach(b => b.classList.toggle('active', b === button));
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === target);
      });
    });
  });

  const form = document.querySelector('[data-demo-form]');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const success = form.querySelector('.form-success');
      if (success) success.classList.add('show');
      form.reset();
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealNodes.forEach(node => observer.observe(node));
  } else {
    revealNodes.forEach(node => node.classList.add('visible'));
  }
})();
