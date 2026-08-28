// Selettore di spettri Raman dei polimeri analizzati nella tesi magistrale.
//
// Sono i codici di riciclo 01-06. Il codice 07 ("altre plastiche") e' escluso:
// e' una categoria residuale eterogenea, senza uno spettro caratteristico.
// Posizioni dei picchi e assegnazioni vibrazionali da letteratura:
//   Nava, Frezzotti & Leoni, "Raman Spectroscopy for the Analysis of Microplastics
//   in Aquatic Systems", Applied Spectroscopy 75(11), 2021, Table II.
//
// GLI SPETTRI SONO RICOSTRUITI: ogni picco e' una lorentziana centrata sul numero
// d'onda di letteratura, non una misura sperimentale. Mostrano dove cadono le bande
// diagnostiche e come si distinguono i polimeri, non un dato quantitativo.
//
// Nessuna libreria: SVG generato a runtime.
(function () {
  const HOST_ID = 'spectra-explorer';

  // i: intensita' relativa (0-1) · w: larghezza di banda · row: riga dell'etichetta
  const POLYMERS = [
    {
      id: 'pet', code: '01', short: 'PET', nameKey: 'poly.pet',
      noteKey: 'poly.pet.note',
      peaks: [
        { x: 857,  i: 0.45, w: 10, row: 1, key: 'pk.pet.857' },
        { x: 1096, i: 0.52, w: 11, row: 0, key: 'pk.pet.1096' },
        { x: 1295, i: 0.70, w: 12, row: 1, key: 'pk.pet.1295' },
        { x: 1615, i: 0.88, w: 12, row: 0, key: 'pk.pet.1615' },
        { x: 1730, i: 0.95, w: 13, row: 1, key: 'pk.pet.1730' },
        { x: 3080, i: 0.40, w: 16, row: 0, key: 'pk.pet.3080' }
      ]
    },
    {
      id: 'hdpe', code: '02', short: 'HDPE', nameKey: 'poly.hdpe',
      noteKey: 'poly.hdpe.note',
      peaks: [
        { x: 1063, i: 0.60, w: 9,  row: 1, key: 'pk.pe.1063' },
        { x: 1130, i: 0.56, w: 9,  row: 0, key: 'pk.pe.1130' },
        { x: 1296, i: 0.84, w: 11, row: 1, key: 'pk.pe.1296' },
        { x: 1440, i: 0.90, w: 14, row: 0, key: 'pk.pe.1440' },
        { x: 2850, i: 0.82, w: 15, row: 1, key: 'pk.pe.2850' },
        { x: 2883, i: 1.00, w: 16, row: 0, key: 'pk.pe.2883.hd' }
      ]
    },
    {
      id: 'pvc', code: '03', short: 'PVC', nameKey: 'poly.pvc',
      noteKey: 'poly.pvc.note',
      peaks: [
        { x: 638,  i: 0.95, w: 11, row: 1, key: 'pk.pvc.638' },
        { x: 694,  i: 0.80, w: 11, row: 0, key: 'pk.pvc.694' },
        { x: 1430, i: 0.55, w: 14, row: 1, key: 'pk.pvc.1430' },
        { x: 2914, i: 0.88, w: 17, row: 0, key: 'pk.pvc.2914' },
        { x: 2935, i: 0.62, w: 17, row: 1, key: 'pk.pvc.2935' }
      ]
    },
    {
      id: 'ldpe', code: '04', short: 'LDPE', nameKey: 'poly.ldpe',
      noteKey: 'poly.ldpe.note',
      peaks: [
        { x: 1063, i: 0.58, w: 10, row: 1, key: 'pk.pe.1063' },
        { x: 1130, i: 0.52, w: 10, row: 0, key: 'pk.pe.1130' },
        { x: 1296, i: 0.80, w: 12, row: 1, key: 'pk.pe.1296' },
        { x: 1440, i: 0.88, w: 15, row: 0, key: 'pk.pe.1440' },
        // il rapporto 2850/2883 e' invertito rispetto a HDPE: e' cosi' che si distinguono
        { x: 2850, i: 1.00, w: 17, row: 1, key: 'pk.pe.2850.ld' },
        { x: 2883, i: 0.80, w: 18, row: 0, key: 'pk.pe.2883' }
      ]
    },
    {
      id: 'pp', code: '05', short: 'PP', nameKey: 'poly.pp',
      noteKey: 'poly.pp.note',
      peaks: [
        { x: 809,  i: 0.72, w: 10, row: 1, key: 'pk.pp.809' },
        { x: 841,  i: 0.86, w: 10, row: 0, key: 'pk.pp.841' },
        { x: 973,  i: 0.68, w: 10, row: 1, key: 'pk.pp.973' },
        { x: 1152, i: 0.50, w: 11, row: 0, key: 'pk.pp.1152' },
        { x: 1330, i: 0.46, w: 12, row: 1, key: 'pk.pp.1330' },
        { x: 1458, i: 0.90, w: 14, row: 0, key: 'pk.pp.1458' },
        { x: 2883, i: 1.00, w: 17, row: 1, key: 'pk.pp.2883' }
      ]
    },
    {
      id: 'ps', code: '06', short: 'PS', nameKey: 'poly.ps',
      noteKey: 'poly.ps.note',
      peaks: [
        { x: 621,  i: 0.38, w: 10, row: 1, key: 'pk.ps.621' },
        { x: 1001, i: 1.00, w: 8,  row: 0, key: 'pk.ps.1001' },
        { x: 1031, i: 0.60, w: 9,  row: 1, key: 'pk.ps.1031' },
        { x: 1450, i: 0.52, w: 13, row: 0, key: 'pk.ps.1450' },
        { x: 1602, i: 0.78, w: 11, row: 1, key: 'pk.ps.1602' },
        { x: 3054, i: 0.70, w: 15, row: 0, key: 'pk.ps.3054' }
      ]
    }
  ];

  const X_MIN = 500;
  const X_MAX = 3200;
  const W = 760;
  const H = 320;
  const PAD = { top: 34, right: 16, bottom: 42, left: 48 };
  const NS = 'http://www.w3.org/2000/svg';

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const sx = (x) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * plotW;
  const sy = (i) => PAD.top + plotH - i * plotH * 0.86;

  function el(name, attrs) {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function t(key, lang, fallback) {
    const d = window.__RAMAN_I18N__;
    if (d && d[key] && d[key][lang]) return d[key][lang];
    return fallback || key;
  }

  function intensityAt(peaks, x) {
    let v = 0;
    for (const p of peaks) {
      const d = (x - p.x) / p.w;
      v += p.i / (1 + d * d);
    }
    return v + 0.018 + 0.010 * (1 - (x - X_MIN) / (X_MAX - X_MIN));
  }

  function buildPath(peaks) {
    const step = (X_MAX - X_MIN) / 1000;
    let d = '';
    for (let x = X_MIN; x <= X_MAX; x += step) {
      d += (d ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(intensityAt(peaks, x)).toFixed(1);
    }
    return d;
  }

  let current = POLYMERS[1];   // HDPE: il polietilene e' il piu' abbondante

  function drawChart(chartHost, lang) {
    chartHost.textContent = '';

    const svg = el('svg', {
      viewBox: `0 0 ${W} ${H}`, class: 'raman-svg', role: 'img',
      'aria-label': t('spectra.aria', lang, 'Raman spectrum') + ' — ' +
                    t(current.nameKey, lang, current.short)
    });

    for (let x = 500; x <= 3000; x += 500) {
      svg.appendChild(el('line', { x1: sx(x), y1: PAD.top, x2: sx(x), y2: PAD.top + plotH, class: 'raman-grid' }));
      const lb = el('text', { x: sx(x), y: H - 20, class: 'raman-tick' });
      lb.textContent = x;
      svg.appendChild(lb);
    }

    svg.appendChild(el('line', { x1: PAD.left, y1: PAD.top + plotH, x2: PAD.left + plotW, y2: PAD.top + plotH, class: 'raman-axis' }));
    svg.appendChild(el('line', { x1: PAD.left, y1: PAD.top, x2: PAD.left, y2: PAD.top + plotH, class: 'raman-axis' }));

    const xl = el('text', { x: PAD.left + plotW / 2, y: H - 4, class: 'raman-axis-label' });
    xl.textContent = t('raman.xaxis', lang, 'Raman shift (cm⁻¹)');
    svg.appendChild(xl);

    const yl = el('text', {
      x: 13, y: PAD.top + plotH / 2, class: 'raman-axis-label',
      transform: `rotate(-90 13 ${PAD.top + plotH / 2})`
    });
    yl.textContent = t('raman.yaxis', lang, 'Intensity (a.u.)');
    svg.appendChild(yl);

    const readout = document.createElement('p');
    readout.className = 'raman-readout';

    svg.appendChild(el('path', { d: buildPath(current.peaks), class: 'raman-curve' }));

    const hint = t('raman.hint', lang, 'Hover a peak to see its assignment.');
    readout.textContent = hint;

    current.peaks.forEach(function (p) {
      const cy = sy(intensityAt(current.peaks, p.x));
      const g = el('g', { class: 'raman-peak', tabindex: '0', role: 'button' });
      g.appendChild(el('rect', { x: sx(p.x) - 15, y: PAD.top, width: 30, height: plotH, class: 'raman-hit' }));
      g.appendChild(el('line', {
        x1: sx(p.x), y1: cy - 6, x2: sx(p.x), y2: PAD.top - 2 - (p.row || 0) * 13, class: 'raman-stem'
      }));
      g.appendChild(el('circle', { cx: sx(p.x), cy: cy, r: 4.5, class: 'raman-dot' }));
      const lab = el('text', { x: sx(p.x), y: PAD.top - 4 - (p.row || 0) * 13, class: 'raman-peak-label' });
      lab.textContent = p.x;
      g.appendChild(lab);

      const show = function () {
        readout.innerHTML = '<strong>' + p.x + ' cm⁻¹</strong> &mdash; ' + t(p.key, lang, p.key);
        svg.querySelectorAll('.raman-peak').forEach(function (n) { n.classList.remove('is-active'); });
        g.classList.add('is-active');
      };
      const clear = function () {
        g.classList.remove('is-active');
        readout.textContent = hint;
      };
      g.addEventListener('mouseenter', show);
      g.addEventListener('mouseleave', clear);
      g.addEventListener('focus', show);
      g.addEventListener('blur', clear);
      svg.appendChild(g);
    });

    chartHost.appendChild(svg);
    chartHost.appendChild(readout);
  }

  function render(host) {
    const lang = document.documentElement.lang === 'it' ? 'it' : 'en';
    host.textContent = '';

    // selettore polimero
    const tabs = document.createElement('div');
    tabs.className = 'poly-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', t('spectra.tablist', lang, 'Polymer'));

    const chartHost = document.createElement('div');
    chartHost.className = 'raman-host';

    const desc = document.createElement('p');
    desc.className = 'poly-note';

    function select(poly) {
      current = poly;
      tabs.querySelectorAll('.poly-tab').forEach(function (b) {
        const on = b.dataset.poly === poly.id;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      desc.textContent = t(poly.noteKey, lang, '');
      drawChart(chartHost, lang);
    }

    POLYMERS.forEach(function (poly) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'poly-tab';
      b.dataset.poly = poly.id;
      b.setAttribute('role', 'tab');
      b.innerHTML = '<span class="poly-code">' + poly.code + '</span>' +
                    '<span class="poly-name">' + poly.short + '</span>';
      b.addEventListener('click', function () { select(poly); });
      tabs.appendChild(b);
    });

    // frecce per navigare fra i polimeri
    tabs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const i = POLYMERS.indexOf(current);
      const n = e.key === 'ArrowRight' ? (i + 1) % POLYMERS.length
                                       : (i - 1 + POLYMERS.length) % POLYMERS.length;
      select(POLYMERS[n]);
      tabs.querySelectorAll('.poly-tab')[n].focus();
    });

    host.appendChild(tabs);
    host.appendChild(desc);
    host.appendChild(chartHost);

    select(current);
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
