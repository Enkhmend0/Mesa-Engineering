(function () {
  let currentLang = localStorage.getItem('mesaLang') || 'mn';

  function updateButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const text = btn.textContent.trim().toUpperCase();
      btn.classList.toggle('active', text === (lang === 'mn' ? 'МОН' : 'ENG'));
    });
  }

  window.setLang = function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('mesaLang', lang);
    updateButtons(lang);
    document.querySelectorAll('[data-mn][data-en]').forEach((el) => {
      const next = el.getAttribute('data-' + lang);
      if (next != null) el.innerHTML = next;
    });
    document.documentElement.lang = lang;
  };

  window.toggleMobile = function toggleMobile() {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;
    menu.classList.toggle('open');
  };

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach((el) => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    items.forEach((el) => obs.observe(el));
  }

  function initScrollState() {
    const onScroll = () => document.body.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMenuClose() {
    document.querySelectorAll('#mobileMenu a').forEach((a) => {
      a.addEventListener('click', () => {
        const menu = document.getElementById('mobileMenu');
        if (menu) menu.classList.remove('open');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const menu = document.getElementById('mobileMenu');
        if (menu) menu.classList.remove('open');
      }
    });
  }

  function initCarouselTouch() {
    var wrap = document.querySelector('.clients-slider-wrap');
    if (!wrap) return;
    var track = wrap.querySelector('.clients-slider-track');
    if (!track) return;
    wrap.addEventListener('touchstart', function () {
      track.style.animationPlayState = 'paused';
    }, { passive: true });
    wrap.addEventListener('touchend', function () {
      track.style.animationPlayState = '';
    }, { passive: true });
  }

  function initSun() {
    if (!document.body.classList.contains('page-home')) return;
    if (window.matchMedia && window.matchMedia('(max-width: 860px)').matches) return;
    var sun = document.createElement('div');
    sun.className = 'sun-bg';
    sun.setAttribute('aria-hidden', 'true');
    document.body.prepend(sun);

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      var vw = window.innerWidth;
      var max = document.documentElement.scrollHeight - vh;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Sunset motion: drifts from upper-right to lower-left, settling
      // toward the horizon as the page is scrolled.
      var x = (0.18 - 0.7 * p) * vw;
      var y = (0 + 0.55 * p) * vh;
      document.documentElement.style.setProperty('--sun-x', x + 'px');
      document.documentElement.style.setProperty('--sun-y', y + 'px');
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.setLang(currentLang);
    initReveal();
    initScrollState();
    initMenuClose();
    initCarouselTouch();
    initSun();
  });
})();
