/* ============================================================
   TALLERES CHICOTE — app.js
   Lenis + GSAP + ScrollTrigger. Si las librerías no cargan,
   la web sigue siendo totalmente usable (degradación elegante).
   ============================================================ */
(function () {
  'use strict';

  // ---- Configuración editable (confirmar horario real con el cliente) ----
  // 0 = domingo ... 6 = sábado. null = cerrado. Formato [apertura, cierre] en horas decimales.
  var HOURS = { 0: null, 1: [8.5, 18], 2: [8.5, 18], 3: [8.5, 18], 4: [8.5, 18], 5: [8.5, 18], 6: null };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initOpenStatus();

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sin GSAP (CDN bloqueado / sin conexión): web estática funcional.
  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add('no-gsap');
    document.body.classList.remove('is-loading');
    $$('.pcard').forEach(function (c) { c.classList.add('is-active'); });
    initSpotlight();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add('is-loading');

  // ---------------------------------------------------------
  // LENIS ↔ GSAP
  // ---------------------------------------------------------
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    lenis.stop(); // se libera al terminar el preloader
  }

  // Anclas suaves
  $$('[data-scroll], a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.length < 2 || href.charAt(0) !== '#') return;
    a.addEventListener('click', function (e) {
      var target = $(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.4, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---------------------------------------------------------
  // SPLIT en palabras con máscara (sin dependencias)
  // ---------------------------------------------------------
  function splitWords(el) {
    var inners = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w';
            var i = document.createElement('span'); i.className = 'wi';
            i.textContent = p; w.appendChild(i); frag.appendChild(w); inners.push(i);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    })(el);
    return inners;
  }

  var heroInners = [];
  $$('[data-reveal]').forEach(function (el) {
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', label);
    var inners = splitWords(el);
    inners.forEach(function (n) { n.setAttribute('aria-hidden', 'true'); });
    gsap.set(inners, { yPercent: 110 });

    if (el.getAttribute('data-reveal') === 'hero') { heroInners = inners; return; }

    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: function () {
        gsap.to(inners, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.045 });
      }
    });
  });

  // Fade-up genérico
  $$('[data-fade]').forEach(function (el) {
    if (el.hasAttribute('data-hero-fade')) return;
    gsap.set(el, { opacity: 0, y: 32 });
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: function () { gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }); }
    });
  });

  // Hero fades (esperan al preloader)
  var heroFades = $$('[data-hero-fade]');
  gsap.set(heroFades, { opacity: 0, y: 24 });
  gsap.set('.nav', { yPercent: -160, opacity: 0 });

  // ---------------------------------------------------------
  // PRELOADER
  // ---------------------------------------------------------
  var pre = $('#preloader');
  var counter = { v: 0 };
  var preCount = $('#preCount'), preBar = $('#preBar');

  var tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: function () {
      document.body.classList.remove('is-loading');
      if (lenis) lenis.start();
      if (pre) pre.style.display = 'none';
      ScrollTrigger.refresh();
    }
  });

  tl.to(counter, {
    v: 100, duration: reduce ? 0.2 : 1.1, ease: 'power1.inOut',
    onUpdate: function () {
      var n = Math.round(counter.v);
      preCount.textContent = String(n).padStart(3, '0');
      preBar.style.transform = 'scaleX(' + (counter.v / 100) + ')';
    }
  })
  .to('.preloader__center, .preloader__top, .preloader__bottom', { opacity: 0, duration: 0.25, ease: 'power1.out' }, '+=0.05')
  .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power4.inOut' }, '-=0.05')
  .fromTo('[data-hero-media]', { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, '-=0.7')
  .to(heroInners, { yPercent: 0, duration: 1.3, ease: 'power4.out', stagger: 0.08 }, '-=1.4')
  .to(heroFades, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, '-=1.0')
  .to('.nav', { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=1.2');

  // Salvavidas: si algo falla, nunca dejar al usuario atrapado en el preloader
  setTimeout(function () {
    if (document.body.classList.contains('is-loading')) tl.progress(1);
  }, 6000);

  // ---------------------------------------------------------
  // NAV estado scroll
  // ---------------------------------------------------------
  ScrollTrigger.create({
    start: 40, end: 'max',
    onUpdate: function (self) { $('#nav').classList.toggle('is-scrolled', self.scroll() > 40); }
  });

  // ---------------------------------------------------------
  // PARALLAX
  // ---------------------------------------------------------
  gsap.to('[data-hero-media] img', {
    yPercent: 12, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero__inner', {
    yPercent: -8, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  $$('[data-parallax]').forEach(function (img) {
    gsap.fromTo(img, { yPercent: -8 }, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // ---------------------------------------------------------
  // TICKER (acelera con la velocidad de scroll)
  // ---------------------------------------------------------
  var track = $('#tickerTrack');
  if (track && !reduce) {
    var loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 32, repeat: -1 });
    var boost = 0;
    if (lenis) lenis.on('scroll', function (e) { boost = Math.min(Math.abs(e.velocity), 30); });
    gsap.ticker.add(function () {
      boost *= 0.92;
      loop.timeScale(1 + boost * 0.35);
    });
  } else if (track) {
    document.documentElement.classList.add('no-gsap');
  }

  // ---------------------------------------------------------
  // PROTOCOLO · sticky scroll con ficha técnica
  // ---------------------------------------------------------
  var pcards = $$('.pcard');
  var sheetNo = $('#sheetNo'), sheetTitle = $('#sheetTitle'), sheetStep = $('#sheetStep'), sheetBar = $('#sheetBar');
  var sheetItems = $$('[data-sheet]');
  var currentStep = -1;

  function setStep(i) {
    if (i === currentStep) return;
    var first = currentStep === -1;
    currentStep = i;
    pcards.forEach(function (c, k) { c.classList.toggle('is-active', k === i); });
    sheetItems.forEach(function (li, k) {
      li.classList.toggle('is-active', k === i);
      li.classList.toggle('is-done', k < i);
    });
    sheetStep.textContent = '0' + (i + 1) + ' / 04';
    sheetBar.style.transform = 'scaleX(' + ((i + 1) / pcards.length) + ')';
    var title = pcards[i].getAttribute('data-title');
    if (first) { sheetNo.textContent = '0' + (i + 1); sheetTitle.textContent = title; return; }
    gsap.timeline()
      .to([sheetNo, sheetTitle], { yPercent: -30, opacity: 0, duration: 0.18, ease: 'power2.in' })
      .add(function () { sheetNo.textContent = '0' + (i + 1); sheetTitle.textContent = title; })
      .fromTo([sheetNo, sheetTitle], { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
  }

  pcards.forEach(function (card, i) {
    ScrollTrigger.create({
      trigger: card, start: 'top 60%', end: 'bottom 60%',
      onEnter: function () { setStep(i); },
      onEnterBack: function () { setStep(i); }
    });
  });
  setStep(0);

  // ---------------------------------------------------------
  // BENTO · spotlight dinámico (brillo + borde)
  // ---------------------------------------------------------
  initSpotlight();

  // ---------------------------------------------------------
  // BOTONES MAGNÉTICOS
  // ---------------------------------------------------------
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduce) {
    $$('[data-magnetic]').forEach(function (el) {
      var strength = 0.35, pad = 60;
      var qx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      var qy = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      var inside = false;
      window.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var near = e.clientX > r.left - pad && e.clientX < r.right + pad &&
                   e.clientY > r.top - pad && e.clientY < r.bottom + pad;
        if (near) {
          inside = true;
          qx((e.clientX - (r.left + r.width / 2)) * strength);
          qy((e.clientY - (r.top + r.height / 2)) * strength);
        } else if (inside) {
          inside = false; qx(0); qy(0);
        }
      }, { passive: true });
    });
  }

  // ---------------------------------------------------------
  // FOOTER gigante
  // ---------------------------------------------------------
  gsap.from('#giant', {
    yPercent: 35, opacity: 0, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer__giant', start: 'top 105%', end: 'top 60%', scrub: 0.6 }
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });

  // =========================================================
  function initSpotlight() {
    $$('[data-spot]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, { passive: true });
    });
  }

  function initOpenStatus() {
    var wrap = $('#status'), text = $('#statusText');
    if (!wrap || !text) return;
    var parts;
    try {
      parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
    } catch (e) { return; }
    var map = {}; parts.forEach(function (p) { map[p.type] = p.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var day = days[map.weekday];
    var now = (parseInt(map.hour, 10) % 24) + parseInt(map.minute, 10) / 60;
    var h = HOURS[day];
    var open = !!h && now >= h[0] && now < h[1];
    wrap.classList.toggle('is-open', open);
    text.textContent = open ? 'ABIERTO AHORA' : 'CERRADO AHORA';
    var rows = $$('.hours dl > div');
    var order = [1, 2, 3, 4, 5, 6, 0];
    var idx = day >= 1 && day <= 5 ? 0 : (day === 6 ? 1 : 2);
    if (rows[idx]) rows[idx].classList.add('is-today');
    void order;
  }
})();
