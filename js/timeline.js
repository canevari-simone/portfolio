// Cronologia degli studi scientifici sulla Mappa di Vinland.
//
// Ogni tappa e' documentata: le fonti sono la voce Wikipedia della mappa e
// l'annuncio di Yale del 1 settembre 2021 (news.yale.edu), citate in pagina.
//
// Nessuna libreria: SVG generato a runtime.
(function () {
  const HOST_ID = 'vinland-timeline';

  // year: anno o inizio periodo · span: anno finale se e' un periodo
  // verdict: 'neutral' | 'against' | 'for'  (rispetto all'autenticita')
  const EVENTS = [
    { id: '1957', year: 1957, verdict: 'neutral', lane: 0 },
    { id: '1965', year: 1965, verdict: 'for',     lane: 1 },
    { id: '1966', year: 1966, verdict: 'neutral', lane: 2 },
    { id: '1967', year: 1967, verdict: 'against', lane: 3 },
    { id: '1972', year: 1972, verdict: 'against', lane: 0 },
    { id: '1985', year: 1985, verdict: 'for',     lane: 1 },
    { id: '1991', year: 1991, verdict: 'against', lane: 0 },
    { id: '1995', year: 1995, verdict: 'neutral', lane: 1 },
    { id: '2002', year: 2002, verdict: 'against', lane: 0 },
    { id: '2021', year: 2021, verdict: 'against', lane: 1 }
  ];

  const W = 780;
  const H = 200;
  const PAD = { left: 40, right: 40, top: 82, bottom: 56 };
  const NS = 'http://www.w3.org/2000/svg';

  const Y_MIN = 1950;
  const Y_MAX = 2025;
  const axisY = PAD.top;
  const plotW = W - PAD.left - PAD.right;
  const sx = (y) => PAD.left + ((y - Y_MIN) / (Y_MAX - Y_MIN)) * plotW;

  function el(name, attrs) {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function t(key, lang, fb) {
    const d = window.__RAMAN_I18N__;
    if (d && d[key] && d[key][lang]) return d[key][lang];
    return fb || key;
  }

  function render(host) {
    const lang = document.documentElement.lang === 'it' ? 'it' : 'en';
    host.textContent = '';

    const svg = el('svg', {
      viewBox: `0 0 ${W} ${H}`, class: 'tl-svg', role: 'img',
      'aria-label': t('vl.tl.aria', lang, 'Timeline of studies on the Vinland Map')
    });

    // asse
    svg.appendChild(el('line', {
      x1: PAD.left - 10, y1: axisY, x2: W - PAD.right + 10, y2: axisY, class: 'tl-axis'
    }));

    // decadi
    for (let y = 1960; y <= 2020; y += 10) {
      svg.appendChild(el('line', { x1: sx(y), y1: axisY - 5, x2: sx(y), y2: axisY + 5, class: 'tl-decade' }));
      const lb = el('text', { x: sx(y), y: axisY + 22, class: 'tl-decade-label' });
      lb.textContent = y;
      svg.appendChild(lb);
    }

    const detail = document.createElement('div');
    detail.className = 'tl-detail';

    function showDetail(ev) {
      detail.innerHTML =
        '<p class="tl-year">' + t('vl.e.' + ev.id + '.year', lang, String(ev.year)) + '</p>' +
        '<h3 class="tl-title">' + t('vl.e.' + ev.id + '.h', lang, '') + '</h3>' +
        '<p class="tl-body">' + t('vl.e.' + ev.id + '.p', lang, '') + '</p>';
      detail.className = 'tl-detail is-' + ev.verdict;
      svg.querySelectorAll('.tl-point').forEach(function (n) { n.classList.remove('is-active'); });
      const node = svg.querySelector('.tl-point[data-id="' + ev.id + '"]');
      if (node) node.classList.add('is-active');
    }

    // i punti si alternano sopra e sotto l'asse per non sovrapporsi
    EVENTS.forEach(function (ev, i) {
      const lane = ev.lane || 0;
      const up = lane % 2 === 0;
      const dist = 26 + Math.floor(lane / 2) * 30;
      const cy = up ? axisY - dist : axisY + dist + 14;
      const g = el('g', {
        class: 'tl-point is-' + ev.verdict, 'data-id': ev.id,
        tabindex: '0', role: 'button',
        'aria-label': t('vl.e.' + ev.id + '.year', lang, String(ev.year))
      });

      g.appendChild(el('line', { x1: sx(ev.year), y1: axisY, x2: sx(ev.year), y2: cy, class: 'tl-stem' }));
      g.appendChild(el('circle', { cx: sx(ev.year), cy: cy, r: 5.5, class: 'tl-dot' }));

      const lab = el('text', {
        x: sx(ev.year), y: up ? cy - 11 : cy + 16, class: 'tl-point-label'
      });
      lab.textContent = ev.year;
      g.appendChild(lab);

      g.addEventListener('click', function () { showDetail(ev); });
      g.addEventListener('focus', function () { showDetail(ev); });
      g.addEventListener('mouseenter', function () { showDetail(ev); });
      svg.appendChild(g);
    });

    // legenda
    const legend = document.createElement('ul');
    legend.className = 'tl-legend';
    [['for', 'vl.legend.for'], ['against', 'vl.legend.against'], ['neutral', 'vl.legend.neutral']]
      .forEach(function (pair) {
        const li = document.createElement('li');
        li.className = 'is-' + pair[0];
        li.textContent = t(pair[1], lang, '');
        legend.appendChild(li);
      });

    const wrap = document.createElement('div');
    wrap.className = 'tl-wrap';
    wrap.appendChild(svg);

    host.appendChild(wrap);
    host.appendChild(legend);
    host.appendChild(detail);

    showDetail(EVENTS[EVENTS.length - 1]);   // parte dal verdetto finale
  }

  function init() {
    const host = document.getElementById(HOST_ID);
    if (!host) return;
    render(host);
    new MutationObserver(function () { render(host); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
