// Schermatura della radiazione: sorgente, schermo, persona.
//
// STRUMENTO DIDATTICO. Mostra come tipo di radiazione, materiale e spessore
// cambiano la dose che raggiunge una persona. Non è uno strumento operativo
// di radioprotezione e non va usato per valutare situazioni reali.
//
// Coefficienti di attenuazione di massa: NIST X-Ray Mass Attenuation Coefficients,
// interpolati a 662 keV (la riga del Cs-137, il radionuclide tipico degli scenari
// di dispersione radiologica). mu = (mu/rho) * densità.
//
// Alfa e beta non seguono l'attenuazione esponenziale dei fotoni: hanno un
// percorso finito nella materia (range), oltre il quale si fermano del tutto.
// Modellati così, perché è il punto didattico centrale.
//
// Nessuna libreria: SVG generato a runtime.
(function () {
  const HOST_ID = 'shielding-sim';

  // mu: coefficiente lineare a 662 keV (1/cm), calcolato da NIST
  // range: percorso massimo in cm per alfa (~5 MeV) e beta (~1 MeV)
  const MATERIALS = [
    { id: 'air',      mu: 0.0001, rho: 0.0012, aRange: 4.0,   bRange: 400,  key: 'sh.mat.air' },
    { id: 'paper',    mu: 0.0080, rho: 0.80,   aRange: 0.004, bRange: 0.15, key: 'sh.mat.paper' },
    { id: 'water',    mu: 0.0862, rho: 1.00,   aRange: 0.004, bRange: 0.40, key: 'sh.mat.water' },
    { id: 'concrete', mu: 0.1822, rho: 2.30,   aRange: 0.002, bRange: 0.18, key: 'sh.mat.concrete' },
    { id: 'aluminium',mu: 0.2026, rho: 2.70,   aRange: 0.002, bRange: 0.15, key: 'sh.mat.aluminium' },
    { id: 'lead',     mu: 1.2895, rho: 11.35,  aRange: 0.001, bRange: 0.04, key: 'sh.mat.lead' }
  ];

  const RADIATIONS = [
    { id: 'alpha', key: 'sh.rad.alpha', glyph: 'α' },
    { id: 'beta',  key: 'sh.rad.beta',  glyph: 'β' },
    { id: 'gamma', key: 'sh.rad.gamma', glyph: 'γ' }
  ];

  // dose di riferimento senza schermo, a 1 m dalla sorgente (mSv/h).
  // valore illustrativo, scelto per rendere leggibile la scala delle soglie
  const DOSE_UNSHIELDED = 100;

  // soglie cliniche note (mSv), da letteratura di radioprotezione
  const THRESHOLDS = [
    { v: 1,     key: 'sh.th.public' },
    { v: 20,    key: 'sh.th.worker' },
    { v: 1000,  key: 'sh.th.ars' },
    { v: 4000,  key: 'sh.th.ld50' }
  ];

  const NS = 'http://www.w3.org/2000/svg';
  let radiation = RADIATIONS[2];      // gamma: il caso interessante
  let material = MATERIALS[5];        // piombo
  let thickness = 1.0;                // cm
  let hours = 1;                      // durata dell'esposizione

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

  // frazione di radiazione che attraversa lo schermo
  function transmitted() {
    if (radiation.id === 'gamma') {
      // attenuazione esponenziale: i fotoni non hanno un range netto
      return Math.exp(-material.mu * thickness);
    }
    // particelle cariche: percorso finito, poi si fermano
    const range = radiation.id === 'alpha' ? material.aRange : material.bRange;
    if (thickness >= range) return 0;
    const f = 1 - thickness / range;
    return f * f;   // la perdita di energia cresce verso fine percorso
  }

  function doseFor(frac) {
    return DOSE_UNSHIELDED * frac * hours;
  }

  function verdictKey(dose) {
    if (dose <= 0.000001) return 'sh.v.none';
    if (dose < 1)    return 'sh.v.negligible';
    if (dose < 20)   return 'sh.v.low';
    if (dose < 1000) return 'sh.v.high';
    if (dose < 4000) return 'sh.v.ars';
    return 'sh.v.lethal';
  }

  function fmtDose(d, lang) {
    if (d === 0) return '0';
    if (d < 0.001) return '< 0.001';
    if (d < 1) return d.toFixed(3);
    if (d < 100) return d.toFixed(1);
    return Math.round(d).toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB');
  }

  function render(host) {
    const lang = document.documentElement.lang === 'it' ? 'it' : 'en';
    host.textContent = '';

    // ---------- controlli ----------
    const controls = document.createElement('div');
    controls.className = 'sh-controls';

    // tipo di radiazione
    const radGroup = document.createElement('div');
    radGroup.className = 'sh-group';
    const radLabel = document.createElement('p');
    radLabel.className = 'sh-group-label';
    radLabel.textContent = t('sh.label.radiation', lang, 'Radiation');
    radGroup.appendChild(radLabel);
    const radBtns = document.createElement('div');
    radBtns.className = 'sh-btns';
    RADIATIONS.forEach(function (r) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sh-btn' + (r.id === radiation.id ? ' is-active' : '');
      b.setAttribute('aria-pressed', String(r.id === radiation.id));
      b.innerHTML = '<span class="sh-glyph" aria-hidden="true">' + r.glyph + '</span>' +
                    '<span>' + t(r.key + '.short', lang, r.id) + '</span>';
      b.addEventListener('click', function () { radiation = r; update(); });
      radBtns.appendChild(b);
    });
    radGroup.appendChild(radBtns);

    // materiale
    const matGroup = document.createElement('div');
    matGroup.className = 'sh-group';
    const matLabel = document.createElement('label');
    matLabel.className = 'sh-group-label';
    matLabel.setAttribute('for', 'sh-mat');
    matLabel.textContent = t('sh.label.material', lang, 'Shielding material');
    const matSel = document.createElement('select');
    matSel.id = 'sh-mat';
    matSel.className = 'sh-select';
    MATERIALS.forEach(function (m) {
      const o = document.createElement('option');
      o.value = m.id;
      o.textContent = t(m.key, lang, m.id);
      if (m.id === material.id) o.selected = true;
      matSel.appendChild(o);
    });
    matSel.addEventListener('change', function () {
      material = MATERIALS.filter(function (m) { return m.id === matSel.value; })[0];
      update();
    });
    matGroup.appendChild(matLabel);
    matGroup.appendChild(matSel);

    // spessore
    const thkGroup = document.createElement('div');
    thkGroup.className = 'sh-group';
    const thkLabel = document.createElement('label');
    thkLabel.className = 'sh-group-label';
    thkLabel.setAttribute('for', 'sh-thk');
    const thkSlider = document.createElement('input');
    thkSlider.type = 'range';
    thkSlider.id = 'sh-thk';
    thkSlider.className = 'sh-slider';
    thkSlider.min = 0;
    thkSlider.max = 1000;
    thkSlider.step = 1;
    // scala logaritmica da 0,01 a 30 cm
    thkSlider.value = Math.round(Math.log(thickness / 0.01) / Math.log(3000) * 1000);
    thkSlider.addEventListener('input', function () {
      thickness = 0.01 * Math.pow(3000, thkSlider.value / 1000);
      update();
    });
    thkGroup.appendChild(thkLabel);
    thkGroup.appendChild(thkSlider);

    controls.appendChild(radGroup);
    controls.appendChild(matGroup);
    controls.appendChild(thkGroup);

    // ---------- schema ----------
    const stage = document.createElement('div');
    stage.className = 'sh-stage';

    // ---------- esito ----------
    const result = document.createElement('div');
    result.className = 'sh-result';

    function drawStage() {
      const W = 720, H = 200;
      stage.textContent = '';
      const svg = el('svg', {
        viewBox: `0 0 ${W} ${H}`, class: 'sh-svg', role: 'img',
        'aria-label': t('sh.aria', lang, 'Source, shield and person')
      });

      const frac = transmitted();
      const groundY = 155;

      svg.appendChild(el('line', { x1: 20, y1: groundY, x2: W - 20, y2: groundY, class: 'sh-ground' }));

      // sorgente
      const src = el('g', { class: 'sh-source' });
      src.appendChild(el('circle', { cx: 78, cy: groundY - 34, r: 17, class: 'sh-src-body' }));
      const trefoil = el('text', { x: 78, y: groundY - 27, class: 'sh-src-glyph' });
      trefoil.textContent = '☢';
      src.appendChild(trefoil);
      svg.appendChild(src);
      const srcLb = el('text', { x: 78, y: groundY + 18, class: 'sh-caption' });
      srcLb.textContent = t('sh.source', lang, 'source');
      svg.appendChild(srcLb);

      // schermo: la larghezza cresce con lo spessore reale
      const shieldW = Math.max(4, Math.min(52, 4 + thickness * 4.2));
      const shieldX = 330 - shieldW / 2;
      svg.appendChild(el('rect', {
        x: shieldX, y: groundY - 92, width: shieldW, height: 92,
        class: 'sh-shield sh-shield--' + material.id
      }));
      const shLb = el('text', { x: 330, y: groundY + 18, class: 'sh-caption' });
      shLb.textContent = thickness.toFixed(thickness < 1 ? 2 : 1) + ' cm';
      svg.appendChild(shLb);

      // raggi: prima dello schermo sempre pieni, dopo in proporzione
      const rayYs = [groundY - 62, groundY - 40, groundY - 18];
      rayYs.forEach(function (y) {
        svg.appendChild(el('line', { x1: 96, y1: groundY - 34, x2: shieldX, y2: y, class: 'sh-ray' }));
      });
      if (frac > 0.0005) {
        const op = Math.max(0.12, Math.min(1, frac));
        rayYs.forEach(function (y) {
          svg.appendChild(el('line', {
            x1: shieldX + shieldW, y1: y, x2: 578, y2: y,
            class: 'sh-ray sh-ray--out', style: 'opacity:' + op
          }));
        });
      } else {
        const stop = el('text', { x: (shieldX + shieldW + 578) / 2, y: groundY - 40, class: 'sh-stopped' });
        stop.textContent = t('sh.stopped', lang, 'fully stopped');
        svg.appendChild(stop);
      }

      // persona
      const px = 612;
      const person = el('g', { class: 'sh-person' });
      person.appendChild(el('circle', { cx: px, cy: groundY - 72, r: 11 }));
      person.appendChild(el('line', { x1: px, y1: groundY - 61, x2: px, y2: groundY - 26 }));
      person.appendChild(el('line', { x1: px - 15, y1: groundY - 50, x2: px + 15, y2: groundY - 50 }));
      person.appendChild(el('line', { x1: px, y1: groundY - 26, x2: px - 12, y2: groundY }));
      person.appendChild(el('line', { x1: px, y1: groundY - 26, x2: px + 12, y2: groundY }));
      svg.appendChild(person);

      // distanza
      svg.appendChild(el('line', { x1: 78, y1: groundY + 34, x2: px, y2: groundY + 34, class: 'sh-dim' }));
      const dim = el('text', { x: (78 + px) / 2, y: groundY + 30, class: 'sh-caption' });
      dim.textContent = t('sh.distance', lang, '1 m');
      svg.appendChild(dim);

      stage.appendChild(svg);
    }

    function drawResult() {
      const frac = transmitted();
      const dose = doseFor(frac);
      const pct = frac * 100;

      let html =
        '<p class="sh-dose"><span class="sh-dose-value">' + fmtDose(dose, lang) +
        '</span> <span class="sh-dose-unit">mSv</span></p>' +
        '<p class="sh-verdict">' + t(verdictKey(dose), lang, '') + '</p>' +
        '<p class="sh-transmitted">' + t('sh.transmitted', lang, 'Radiation getting through') +
        ': <strong>' + (pct < 0.01 && pct > 0 ? '< 0.01' : pct.toFixed(pct < 1 ? 3 : 1)) + '%</strong></p>';

      // scala delle soglie
      html += '<ul class="sh-scale">';
      THRESHOLDS.forEach(function (th) {
        const reached = dose >= th.v;
        html += '<li class="' + (reached ? 'is-reached' : '') + '">' +
                '<span class="sh-th-value">' + th.v.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB') + ' mSv</span>' +
                '<span class="sh-th-label">' + t(th.key, lang, '') + '</span></li>';
      });
      html += '</ul>';

      result.innerHTML = html;
    }

    function update() {
      // etichetta spessore e stato dei pulsanti
      thkLabel.textContent = t('sh.label.thickness', lang, 'Shield thickness') +
        ' — ' + thickness.toFixed(thickness < 1 ? 2 : 1) + ' cm';
      radBtns.querySelectorAll('.sh-btn').forEach(function (b, i) {
        const on = RADIATIONS[i].id === radiation.id;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      drawStage();
      drawResult();
      note.textContent = t(radiation.key + '.note', lang, '');
    }

    const note = document.createElement('p');
    note.className = 'sh-radnote';

    host.appendChild(controls);
    host.appendChild(note);
    host.appendChild(stage);
    host.appendChild(result);

    update();
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
