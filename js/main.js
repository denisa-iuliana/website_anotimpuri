/* =========================================================
   ANOTIMPURI / Vivaldi — script comun
   Conține: meniu mobil, animații la scroll, formular contact,
   banner de consimțământ (cookie-uri) + Google Analytics.
   ========================================================= */

(function () {
  'use strict';

  var GA_ID = 'G-PZB8WGSLP4';
  var CONSENT_KEY = 'anotimpuri_consent'; // 'granted' | 'denied'

  /* ---------- 1. MENIU MOBIL ---------- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    // închide meniul după ce se apasă pe orice link din navigație
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  /* ---------- 2. ANIMAȚII LA SCROLL ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 3. FORMULAR DE CONTACT ---------- */
  var sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    var subjectLabels = {
      presa: 'Solicitare de presă',
      rezervari: 'Rezervări concert',
      parteneriat: 'Propunere de parteneriat',
      general: 'Întrebare generală',
      altul: 'Altul'
    };
    sendBtn.addEventListener('click', function () {
      var nume = document.getElementById('nume').value.trim();
      var email = document.getElementById('email').value.trim();
      var subiect = document.getElementById('subiect').value;
      var mesaj = document.getElementById('mesaj').value.trim();

      var subject = 'Anotimpuri — ' + (subjectLabels[subiect] || 'Mesaj');
      var body =
        'Nume: ' + nume + '\n' +
        'Email: ' + email + '\n' +
        'Subiect: ' + (subjectLabels[subiect] || subiect) + '\n\n' +
        mesaj;

      window.location.href = 'mailto:kitharalogos@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------- 4. GOOGLE ANALYTICS (se încarcă DOAR după accept) ---------- */
  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  /* ---------- 5. URMĂRIREA CLICK-URILOR PE LINK-URI ---------- */
  // Se trimite un eveniment către Google Analytics doar dacă acesta a fost activat.
  document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'link_click', {
          link_text: (link.textContent || '').trim().slice(0, 80),
          link_url: link.href
        });
      }
    });
  });

  /* ---------- 6. BANNER DE CONSIMȚĂMÂNT (COOKIE-URI) ---------- */
  function injectBannerStyles() {
    if (document.getElementById('cc-styles')) return;
    var css =
      '.cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;' +
      'background:#1c1c1a;color:#f4efe7;padding:1.1rem 1.3rem;' +
      'box-shadow:0 -4px 24px rgba(0,0,0,.25);font-family:inherit;' +
      'display:flex;flex-wrap:wrap;align-items:center;gap:1rem;justify-content:center;}' +
      '.cc-banner p{margin:0;font-size:.92rem;line-height:1.5;max-width:680px;flex:1 1 420px;}' +
      '.cc-banner a{color:#d8b46a;text-decoration:underline;}' +
      '.cc-actions{display:flex;gap:.6rem;flex:0 0 auto;}' +
      '.cc-btn{border:1px solid #d8b46a;background:transparent;color:#f4efe7;' +
      'padding:.55rem 1.2rem;border-radius:2px;font-size:.9rem;cursor:pointer;' +
      'font-family:inherit;transition:background .2s,color .2s;}' +
      '.cc-btn:hover{background:#d8b46a;color:#1c1c1a;}' +
      '.cc-btn--accept{background:#d8b46a;color:#1c1c1a;border-color:#d8b46a;}' +
      '.cc-btn--accept:hover{filter:brightness(1.08);}' +
      '.cc-settings-link{cursor:pointer;}' +
      '@media(max-width:560px){' +
      '.cc-banner{padding:.65rem .8rem;gap:.5rem .6rem;}' +
      '.cc-banner p{font-size:.74rem;line-height:1.35;flex:1 1 100%;}' +
      '.cc-actions{width:100%;justify-content:flex-end;gap:.5rem;}' +
      '.cc-btn{padding:.42rem .9rem;font-size:.78rem;}' +
      '}';
    var style = document.createElement('style');
    style.id = 'cc-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function removeBanner() {
    var b = document.querySelector('.cc-banner');
    if (b) b.parentNode.removeChild(b);
  }

  function showBanner() {
    injectBannerStyles();
    removeBanner();
    var banner = document.createElement('div');
    banner.className = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Notificare cookie-uri');
    banner.innerHTML =
      '<p>Folosim cookie-uri de analiză (Google Analytics) pentru a înțelege cum este ' +
      'utilizat site-ul. Acestea sunt opționale și se activează doar cu acordul tău. ' +
      'Vezi <a href="confidentialitate.html">Politica de confidențialitate</a>.</p>' +
      '<div class="cc-actions">' +
      '<button type="button" class="cc-btn cc-btn--reject">Refuz</button>' +
      '<button type="button" class="cc-btn cc-btn--accept">Accept</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.cc-btn--accept').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'granted'); } catch (e) {}
      removeBanner();
      loadGA();
    });
    banner.querySelector('.cc-btn--reject').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'denied'); } catch (e) {}
      removeBanner();
    });
  }

  // Link „Setări cookie-uri” adăugat automat în subsolul fiecărei pagini,
  // ca vizitatorul să își poată schimba oricând opțiunea (retragerea consimțământului).
  function injectSettingsLink() {
    var bottom = document.querySelector('.footer-bottom');
    if (!bottom) return;
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'cc-settings-link';
    link.textContent = 'Setări cookie-uri';
    link.addEventListener('click', function (ev) {
      ev.preventDefault();
      showBanner();
    });
    var wrap = document.createElement('span');
    wrap.appendChild(link);
    bottom.appendChild(wrap);
  }

  function initConsent() {
    var choice = null;
    try { choice = localStorage.getItem(CONSENT_KEY); } catch (e) {}
    if (choice === 'granted') {
      loadGA();
    } else if (!choice) {
      showBanner();
    }
    injectSettingsLink();
  }

  initConsent();
})();