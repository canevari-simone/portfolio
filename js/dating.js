// Confronto fra tecniche di datazione: stessa età vera, incertezze diverse.
//
// I parametri vengono dalla tesi triennale (AMS: età massima ~60-70.000 anni,
// precisione massima 0,2% ≈ 16 anni) e dalla letteratura standard sui metodi.
//
// L'incertezza è modellata come percentuale dell'età più un termine fisso: è una
// semplificazione didattica, non la propagazione completa degli errori di un
// laboratorio reale. La pagina lo dichiara.
//
// Nessuna libreria: SVG generato a runtime.
(function () {
  const HOST_ID = 'dating-compare';

  // relErr: incertezza relativa · absErr: termine fisso (anni)
  // min/max: intervallo di applicabilità in anni
  const METHODS = [
    { id: 'ams',   relErr: 0.006, absErr: 16,  min: 50,   max: 60000,  key: 'dt.m.ams' },
    { id: 'c14',   relErr: 0.012, absErr: 40,  min: 200,  max: 50000,  key: 'dt.m.c14' },
    { id: 'tl',    relErr: 0.08,  absErr: 60,  min: 300,  max: 500000, key: 'dt.m.tl' },
    { id: 'dendro',relErr: 0.0,   absErr: 1,   min: 0,    max: 12000,  key: 'dt.m.dendro' }
  ];

  const W = 820;
  const ROW_H = 62;
  const PAD = { left: 148, right: 22, top: 34, bottom: 40 };
  const NS = 'http://www.w3.org/2000/svg';

  // età vera selezionabile: scala logaritmica, dal presente a 60.000 anni fa
  const AGE_MIN = 50;
  const AGE_MAX = 60000;
  let trueAge = 3000;

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

  function uncertainty(m, age) {
    return m.relErr * age + m.absErr;
  }

  function fmt(n, lang) {
    return Math.round(n).toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB');
  }

  // converte un'età in una data di calendario approssimativa
  function calendar(age, lang) {
    const year = 2025 - Math.round(age);
    if (year > 0) return year + ' ' + t('dt.ad', lang, 'AD');
    return Math.abs(year) + ' ' + t('dt.bc', lang, 'BC');
  }

  function render(host) {
    const lang = document.documentElement.lang === 'it' ? 'it' : 'en';
    host.textContent = '';

    // --- controllo dell'età vera ---
    const control = document.createElement('div');
    control.className = 'dt-control';

    const label = document.createElement('label');
    label.className = 'dt-label';
    label.setAttribute('for', 'dt-slider');
    label.textContent = t('dt.slider', lang, 'True age of the object');

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = 'dt-slider';
    slider.className = 'dt-slider';
    slider.min = 0;
    slider.max = 1000;
    slider.step = 1;
    // posizione logaritmica
    slider.value = Math.round(
      (Math.log(trueAge / AGE_MIN) / Math.log(AGE_MAX / AGE_MIN)) * 1000
    );

    const readout = document.createElement('p');
    readout.className = 'dt-readout';

    const chart = document.createElement('div');
    chart.className = 'dt-chart';

    function draw() {
      readout.innerHTML =
        '<strong>' + fmt(trueAge, lang) + ' ' + t('dt.years', lang, 'years') + '</strong> ' +
        '<span class="dt-cal">(' + calendar(trueAge, lang) + ')</span>';

      chart.textContent = '';
      const H = PAD.top + METHODS.length * ROW_H + PAD.bottom;
      const svg = el('svg', {
        viewBox: `0 0 ${W} ${H}`, class: 'dt-svg', role: 'img',
        'aria-label': t('dt.aria', lang, 'Comparison of dating techniques')
      });

      const plotW = W - PAD.left - PAD.right;
      const centre = PAD.left + plotW / 2;

      // la scala si adatta alla banda più larga fra i metodi applicabili
      let maxU = 0;
      METHODS.forEach(function (m) {
        if (trueAge >= m.min && trueAge <= m.max) {
          maxU = Math.max(maxU, uncertainty(m, trueAge));
        }
      });
      if (maxU === 0) maxU = trueAge * 0.1;
      const scale = (plotW / 2) / (maxU * 1.25);

      // linea dell'età vera
      svg.appendChild(el('line', {
        x1: centre, y1: PAD.top - 14, x2: centre, y2: H - PAD.bottom + 6, class: 'dt-truth'
      }));
      const tl = el('text', { x: centre, y: PAD.top - 20, class: 'dt-truth-label' });
      tl.textContent = t('dt.true', lang, 'true age');
      svg.appendChild(tl);

      METHODS.forEach(function (m, i) {
        const y = PAD.top + i * ROW_H + ROW_H / 2;
        const applicable = trueAge >= m.min && trueAge <= m.max;

        const name = el('text', { x: PAD.left - 12, y: y + 4, class: 'dt-method' });
        name.textContent = t(m.key + '.short', lang, m.id);
        svg.appendChild(name);

        if (!applicable) {
          const na = el('text', { x: PAD.left + 8, y: y + 4, class: 'dt-na' });
          na.textContent = t('dt.na', lang, 'not applicable at this age');
          svg.appendChild(na);
          return;
        }

        const u = uncertainty(m, trueAge);
        const halfW = Math.max(u * scale, 1.5);

        svg.appendChild(el('line', {
          x1: PAD.left, y1: y, x2: W - PAD.right, y2: y, class: 'dt-track'
        }));
        svg.appendChild(el('rect', {
          x: centre - halfW, y: y - 9, width: halfW * 2, height: 18, class: 'dt-band'
        }));
        svg.appendChild(el('line', {
          x1: centre - halfW, y1: y - 12, x2: centre - halfW, y2: y + 12, class: 'dt-cap'
        }));
        svg.appendChild(el('line', {
          x1: centre + halfW, y1: y - 12, x2: centre + halfW, y2: y + 12, class: 'dt-cap'
        }));

        const val = el('text', { x: W - PAD.right, y: y - 14, class: 'dt-value' });
        val.textContent = '±' + fmt(u, lang) + ' ' + t('dt.y', lang, 'y');
        svg.appendChild(val);

        const range = el('text', { x: W - PAD.right, y: y + 22, class: 'dt-range' });
        range.textContent = calendar(trueAge + u, lang) + ' – ' + calendar(trueAge - u, lang);
        svg.appendChild(range);
      });

      chart.appendChild(svg);
    }

    slider.addEventListener('input', function () {
      const f = slider.value / 1000;
      trueAge = AGE_MIN * Math.pow(AGE_MAX / AGE_MIN, f);
      draw();
    });

    // legenda dei metodi
    const notes = document.createElement('dl');
    notes.className = 'dt-notes';
    METHODS.forEach(function (m) {
      const dt = document.createElement('dt');
      dt.textContent = t(m.key + '.short', lang, m.id);
      const dd = document.createElement('dd');
      dd.textContent = t(m.key + '.note', lang, '');
      notes.appendChild(dt);
      notes.appendChild(dd);
    });

    control.appendChild(label);
    control.appendChild(slider);
    control.appendChild(readout);

    host.appendChild(control);
    host.appendChild(chart);
    host.appendChild(notes);

    draw();
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
