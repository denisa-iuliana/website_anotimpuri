/* =========================================================
   ANOTIMPURI / Vivaldi — comutator de limbă (RO / EN)
   --------------------------------------------------------
   Limba implicită este ROMÂNA. Singura pagină cu traducere
   este „Despre proiect" (about.html). Apăsarea pe EN traduce
   conținutul acelei pagini pe loc; dacă vizitatorul navighează
   către orice altă pagină, aceasta se încarcă din nou în limba
   română (butonul EN apare neselectat), pentru că restul
   site-ului nu are încă traduceri.
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Dicționar EN (RO rămâne în DOM ca implicit) ---------- */
  var EN = {
    /* Navigație (antet) */
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.program': 'Program',
    'nav.performers': 'Performers',
    'nav.composers': 'Composers',
    'nav.contact': 'Contact',

    /* Hero */
    'hero.eyebrow': 'About the project',
    'hero.script': 'Seasons',
    'hero.h1': 'A Bridge Across Time',
    'hero.subtitle': 'A musical journey through heritage sites, where history and the seasons echo within ancient walls.',

    /* Concept */
    'concept.p1': 'What happens when four virtuoso guitarists reimagine Vivaldi’s iconic <strong>Four Seasons</strong> in a completely fresh, unconventional format? Find out this summer, from <strong>July 25 to August 9</strong>, at the <em>“SEASONS” Tour</em>, featuring the newly formed <strong>Romanian Guitar Quartet</strong> — an absolute premiere on the Romanian music scene, a spectacular summer tour hosted by some of the country’s most breathtaking architectural landmarks.',
    'concept.quote': 'Organized by the <em>Kitharalogos Cultural Association</em>, this musical odyssey spans 10 concerts across historic heritage sites. Here, much like in Vivaldi’s masterpiece, the changing seasons have left their mark on ancient stone — whispering tales of early spring, crisp birdsong, sudden summer storms and harsh winters.',
    'concept.p2': 'The tour bridges past and present, bringing together world-famous landmarks like <strong>Peleș Castle</strong>, <strong>Brukenthal Palace</strong> and the <strong>Palace of Culture in Iași</strong>, alongside hidden gems waiting to be rediscovered — the <strong>fortified churches of Cincșor and Moșna</strong>, the <strong>Great Synagogue in Rădăuți</strong> or the <strong>historic Casino in Vatra Dornei</strong>. Within these walls, the warm textures of classical guitar breathe new life into history, moving to the rhythm of the seasons.',
    'concept.p3': 'This initiative seamlessly blends a <em>pioneering musical concept</em> with the <em>preservation and promotion of buildings of architectural and historical value</em> — both those on the tourist circuit and lesser-known sites that deserve to be discovered.',
    'concept.p4': 'To deepen this connection, for four of these venues <strong>two young filmmakers</strong> will produce a documentary series, while <strong>four up-and-coming Romanian composers</strong>, selected through a national call, have each dedicated a short piece for guitar quartet and tape to one of them.',

    /* Interpreți */
    'perf.eyebrow': 'Meet the guitarists',
    'perf.dragos': '<strong>Dragoș Ilie</strong> — widely regarded as Romania’s most decorated and acclaimed young guitarist, with prizes at the most important international guitar competitions and the duo partner of violinist Alexandru Tomescu.',
    'perf.costin': '<strong>Costin Soare</strong> — one of the most appreciated and active Romanian musicians, with 15 national and international tours, 4 albums to his name, who has collaborated with prominent figures of the local music scene.',
    'perf.dan': '<strong>Dan Alexandru Arhire</strong> — a guitarist and university professor from Iași, with numerous solo appearances on the stages of philharmonic orchestras across the country and the author of two studio albums.',
    'perf.ioan': '<strong>Ioan Bănescu</strong> — recently nominated for <em>“Performer of the Year”</em> at the UCIMR Gala, a powerful performer with intense activity in both solo and chamber music.',

    /* Program */
    'prog.eyebrow': 'Tour calendar',
    'prog.h2': 'Concert schedule',
    'prog.intro': 'The ten tour dates, in chronological order.',
    'prog.note': 'Admission to the concerts is free, within the limit of available seats (except where noted above). At certain fortified churches, an access/visiting fee for the building applies.',
    'prog.d1': 'July 25', 'prog.v1': 'Peleș Castle · Great Concert Hall',
    'prog.book1': 'Book via email',
    'prog.soldout': 'Sold out',
    'prog.tickets': 'Tickets on entry',
    'prog.d2': 'July 26', 'prog.v2': 'Brukenthal Museum',
    'prog.d3': 'July 27', 'prog.v3': '“St. Margaret” Evangelical Church',
    'prog.d4': 'July 31', 'prog.v4': 'Biertan Fortified Church',
    'prog.d5': 'August 1', 'prog.v5': 'Cincșor Fortified Church',
    'prog.d6': 'August 2', 'prog.v6': 'Râșnov Evangelical Church',
    'prog.d7': 'August 4', 'prog.v7': 'Moșna Fortified Church',
    'prog.d8': 'August 7', 'prog.v8': 'The Great Synagogue of Rădăuți',
    'prog.d9': 'August 8', 'prog.v9': 'The Historic Baths Casino',
    'prog.d10': 'August 9', 'prog.v10': 'Palace of Culture · Voivodes’ Hall',

    /* Spații de patrimoniu */
    'ven.eyebrow': 'Heritage venues',
    'ven.h2': 'The 10 locations',
    'ven.n1': 'Peleș Castle', 'ven.l1': 'Sinaia · Great Concert Hall',
    'ven.n2': 'Brukenthal Museum', 'ven.l2': 'Sibiu',
    'ven.n3': '“St. Margaret” Evangelical Church', 'ven.l3': 'Mediaș',
    'ven.n4': 'Fortified Church', 'ven.l4': 'Biertan',
    'ven.n5': 'Fortified Church', 'ven.l5': 'Cincșor',
    'ven.n6': 'Evangelical Church', 'ven.l6': 'Râșnov',
    'ven.n7': 'Fortified Church', 'ven.l7': 'Moșna',
    'ven.n8': 'Great Synagogue', 'ven.l8': 'Rădăuți',
    'ven.n9': 'Baths Casino', 'ven.l9': 'Vatra Dornei',
    'ven.n10': 'Palace of Culture · Voivodes’ Hall', 'ven.l10': 'Iași',

    /* Parteneri */
    'part.organizer': 'Organizer',
    'part.organizerName': 'KITHARALOGOS Cultural Association',
    'part.partners': 'Partners',
    'part.support': 'With the support of',
    'part.media': 'Media partners',
    'part.financer': 'Financed by',
    'part.financerName': 'Administration of the National Cultural Fund',
    'part.disclaimer': 'This project does not necessarily reflect the official position of the Administration of the National Cultural Fund (AFCN). AFCN is not responsible for the content of the project or the way its results may be used. These are entirely the responsibility of the funding beneficiary.',

    /* Subsol */
    'foot.brandInfo': 'Romanian Guitar Quartet · National Tour 2026<br>Organizer: Kitharalogos Cultural Association',
    'foot.cofinance': 'Cultural project co-financed by the Administration of the National Cultural Fund.',
    'foot.navHead': 'Navigation',
    'foot.navHome': 'Home',
    'foot.navAbout': 'About the project',
    'foot.navProgram': 'Program',
    'foot.navPerformers': 'Performers',
    'foot.navComposers': 'Composers',
    'foot.navContact': 'Contact',
    'foot.navPrivacy': 'Privacy Policy',
    'foot.copyright': '© 2026 Kitharalogos Cultural Association',
    'foot.disclaimer': 'This project does not necessarily reflect the official position of the Administration of the National Cultural Fund. AFCN is not responsible for the content of the project or the way its results may be used. These are entirely the responsibility of the funding beneficiary.'
  };

  var buttons = document.querySelectorAll('.lang-btn');
  if (!buttons.length) return;

  // Elementele traductibile (au atributul data-i18n). Prezente doar pe about.html.
  var nodes = document.querySelectorAll('[data-i18n]');
  var pageSupportsEN = nodes.length > 0;

  // Memorăm conținutul românesc original, ca să putem reveni.
  var originals = [];
  nodes.forEach(function (el) {
    originals.push(el.innerHTML);
  });

  function setButtons(lang) {
    buttons.forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyEN() {
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (EN[key] != null) el.innerHTML = EN[key];
    });
    document.documentElement.setAttribute('lang', 'en');
    setButtons('en');
    try {
      var u = new URL(window.location.href);
      u.searchParams.set('lang', 'en');
      window.history.replaceState(null, '', u);
    } catch (e) {}
  }

  function applyRO() {
    nodes.forEach(function (el, i) {
      el.innerHTML = originals[i];
    });
    document.documentElement.setAttribute('lang', 'ro');
    setButtons('ro');
    try {
      var u = new URL(window.location.href);
      u.searchParams.delete('lang');
      window.history.replaceState(null, '', u);
    } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var lang = b.getAttribute('data-lang');
      if (lang === 'en') {
        if (pageSupportsEN) {
          applyEN();
        } else {
          // Restul site-ului nu are traduceri: EN duce către pagina „Despre" în engleză.
          window.location.href = 'about.html?lang=en';
        }
      } else {
        if (pageSupportsEN) applyRO();
        // Pe paginile fără traducere suntem deja în RO — nu facem nimic.
      }
    });
  });

  /* La încărcare: implicit RO. Doar pagina traductibilă răspunde la ?lang=en. */
  var wantsEN = false;
  try {
    wantsEN = new URL(window.location.href).searchParams.get('lang') === 'en';
  } catch (e) {}

  if (pageSupportsEN && wantsEN) {
    applyEN();
  } else {
    setButtons('ro');
  }
})();
