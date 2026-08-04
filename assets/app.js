(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  const mq = window.matchMedia('(max-width: 1060px)');
  const navHome = nav ? nav.parentElement : null;

  const ensureBackdrop = () => {
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('button');
      backdrop.type = 'button';
      backdrop.className = 'nav-backdrop';
      backdrop.setAttribute('aria-label', 'Close navigation');
      backdrop.addEventListener('click', () => setNavOpen(false));
      document.body.appendChild(backdrop);
    }
    return backdrop;
  };

  const placeNavForViewport = () => {
    if (!nav || !navHome) return;
    if (mq.matches) {
      if (nav.parentElement !== document.body) {
        document.body.appendChild(nav);
      }
      if (navCta && navCta.parentElement !== document.body) {
        document.body.appendChild(navCta);
      }
      ensureBackdrop();
    } else {
      if (nav.parentElement !== navHome) {
        const toggle = navHome.querySelector('.menu-toggle');
        if (toggle) navHome.insertBefore(nav, toggle);
        else navHome.appendChild(nav);
      }
      if (navCta && navCta.parentElement !== navHome) {
        const toggle = navHome.querySelector('.menu-toggle');
        if (toggle) navHome.insertBefore(navCta, toggle);
        else navHome.appendChild(navCta);
      }
      setNavOpen(false);
    }
  };

  const setNavOpen = (open) => {
    if (!nav || !menuButton) return;
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    ensureBackdrop();
  };

  if (menuButton && nav) {
    placeNavForViewport();
    menuButton.addEventListener('click', () => {
      placeNavForViewport();
      setNavOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNavOpen(false)));
    if (navCta) {
      navCta.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNavOpen(false)));
    }
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setNavOpen(false);
    });
    const onViewportChange = () => placeNavForViewport();
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onViewportChange);
    else if (typeof mq.addListener === 'function') mq.addListener(onViewportChange);
    window.addEventListener('orientationchange', onViewportChange);
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
