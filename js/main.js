/* =========================================================
   ANOTIMPURI / Vivaldi — script comun
   Conține: meniu mobil, animații la scroll, formular contact,
   banner de consimțământ (cookie-uri) + Google Analytics.
   ========================================================= */

(function () {
  'use strict';

  var GA_ID = 'G-PZB8WGSLP4';
  var PIXEL_ID = '309668729722718';
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

  /* ---------- 3. FORMULAR DE CONTACT ----------
     Trimiterea se face printr-un formular ascuns care are ca țintă
     un <iframe> invizibil. Metoda nu folosește deloc CORS, deci
     funcționează identic pe desktop, pe mobil și în orice browser.
     Diacriticele circulă corect: formularul este UTF-8.
     ------------------------------------------------------------- */

  var sendBtn = document.getElementById('send-btn');
  if (sendBtn) {

    /* ÎNLOCUIEȘTE cu URL-ul propriu (Deploy → Manage deployments). */
    var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxTq0C7IMir_0ssEpUjdxlyN_xP0zSX62N6ueMvmP4ke4OMsviHS4jj_XZi7tJnYwle/exec';

    var TIMEOUT_MS = 25000;

    var statusEl   = document.getElementById('form-status');
    var captchaAEl = document.getElementById('captcha-a');
    var captchaBEl = document.getElementById('captcha-b');
    var captchaIn  = document.getElementById('captcha');
    var hpEl       = document.getElementById('website');

    var loadTime = Date.now();
    var captchaA = 0;
    var captchaB = 0;
    var inCurs   = false;

    function genereazaCaptcha() {
      captchaA = Math.floor(Math.random() * 8) + 2;
      captchaB = Math.floor(Math.random() * 8) + 2;
      if (captchaAEl) captchaAEl.textContent = String(captchaA);
      if (captchaBEl) captchaBEl.textContent = String(captchaB);
      if (captchaIn) captchaIn.value = '';
    }
    genereazaCaptcha();

    function arataStatus(text, tip) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.className = 'form-status' + (tip ? ' form-status--' + tip : '');
    }

    function valoare(id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : '';
    }

    function blocheazaButonul(blocat, textNou) {
      sendBtn.disabled = blocat;
      if (textNou) sendBtn.textContent = textNou;
    }

    /* Trimite datele printr-un formular ascuns către un iframe ascuns.
       Nu putem citi răspunsul (iframe cross-origin), dar evenimentul
       „load" ne confirmă că serverul a răspuns. */
    function trimitePrinIframe(date, laSucces, laEroare) {
      var numeIframe = 'anotimpuri-target-' + Date.now();

      var iframe = document.createElement('iframe');
      iframe.name = numeIframe;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      var form = document.createElement('form');
      form.method = 'POST';
      form.action = FORM_ENDPOINT;
      form.target = numeIframe;
      form.acceptCharset = 'UTF-8';
      form.style.display = 'none';

      Object.keys(date).forEach(function (cheie) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = cheie;
        input.value = String(date[cheie]);
        form.appendChild(input);
      });

      document.body.appendChild(form);

      var terminat = false;

      function curata() {
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        if (form.parentNode) form.parentNode.removeChild(form);
      }

      var ceas = setTimeout(function () {
        if (terminat) return;
        terminat = true;
        curata();
        laEroare();
      }, TIMEOUT_MS);

      iframe.addEventListener('load', function () {
        if (terminat) return;
        terminat = true;
        clearTimeout(ceas);
        curata();
        laSucces();
      });

      form.submit();
    }

    sendBtn.addEventListener('click', function () {
      if (inCurs) return;

      var nume  = valoare('nume');
      var email = valoare('email');
      var mesaj = valoare('mesaj');

      var selectSubiect = document.getElementById('subiect');
      var subiect = selectSubiect ? selectSubiect.value : 'altul';

      /* Textul vizibil al opțiunii („Întrebare generală") — cu diacritice
         corecte, direct din pagină. */
      var subiectEticheta = 'Mesaj';
      if (selectSubiect && selectSubiect.selectedIndex >= 0) {
        subiectEticheta = selectSubiect.options[selectSubiect.selectedIndex].text.trim();
      }

      /* --- Validare în browser --- */
      if (!nume || !email || !mesaj) {
        arataStatus('Te rugăm să completezi numele, adresa de e-mail și mesajul.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        arataStatus('Adresa de e-mail nu pare validă.', 'error');
        return;
      }
      if (Number(captchaIn && captchaIn.value) !== (captchaA + captchaB)) {
        arataStatus('Rezultatul operației de verificare nu este corect.', 'error');
        genereazaCaptcha();
        return;
      }

      var date = {
        nume: nume,
        email: email,
        subiect: subiect,
        subiectEticheta: subiectEticheta,
        mesaj: mesaj,
        website: hpEl ? hpEl.value : '',
        elapsed: Date.now() - loadTime,
        captchaA: captchaA,
        captchaB: captchaB,
        captchaRaspuns: Number(captchaIn ? captchaIn.value : 0)
      };

      inCurs = true;
      var textInitial = sendBtn.textContent;
      blocheazaButonul(true, 'Se trimite...');
      arataStatus('Se trimite mesajul...', '');

      trimitePrinIframe(
        date,
        function () {
          inCurs = false;
          blocheazaButonul(false, textInitial);
          arataStatus('Îți mulțumim! Mesajul a fost trimis. Revenim cât de curând.', 'success');
          ['nume', 'email', 'mesaj'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.value = '';
          });
          genereazaCaptcha();
          loadTime = Date.now();
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'contact_form_submit');
          }
        },
        function () {
          inCurs = false;
          blocheazaButonul(false, textInitial);
          arataStatus(
            'Mesajul nu a putut fi trimis. Ne poți scrie direct la kitharalogos@gmail.com.',
            'error'
          );
          genereazaCaptcha();
        }
      );
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

  /* ---------- 4b. META PIXEL (Facebook) — se încarcă DOAR după accept ---------- */
  var pixelLoaded = false;
  function loadPixel() {
    if (pixelLoaded) return;
    pixelLoaded = true;

    // Codul standard Meta Pixel
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // Pornește toate instrumentele de urmărire după consimțământ.
  function loadTrackers() {
    loadGA();
    loadPixel();
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
      '<p>Folosim cookie-uri de analiză (Google Analytics) și de marketing (Meta Pixel ' +
      '/ Facebook) pentru a înțelege cum este utilizat site-ul și a măsura promovarea. ' +
      'Acestea sunt opționale și se activează doar cu acordul tău. ' +
      'Vezi <a href="confidentialitate.html">Politica de confidențialitate</a>.</p>' +
      '<div class="cc-actions">' +
      '<button type="button" class="cc-btn cc-btn--reject">Refuz</button>' +
      '<button type="button" class="cc-btn cc-btn--accept">Accept</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.cc-btn--accept').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'granted'); } catch (e) {}
      removeBanner();
      loadTrackers();
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
      loadTrackers();
    } else if (!choice) {
      showBanner();
    }
    injectSettingsLink();
  }

  initConsent();
})();
