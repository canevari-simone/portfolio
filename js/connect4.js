// Forza 4 — vantaggio della prima mossa per colonna.
//
// I valori sono i pesi appresi dalla rete (MLP) del report d'esame, letti dalla
// heatmap dei pesi, riga 1 (la fila in basso: dove cade il gettone in una colonna
// vuota). Sono i pesi grezzi del modello, non probabilita' misurate.
//
// Convenzione: 0 = neutro, positivo = favorevole, negativo = sfavorevole.
// La barra mostra il peso relativo al massimo assoluto, cosi' che il segno e la
// scala restino leggibili senza trasformarli in una "probabilita'" che il modello
// non ha mai prodotto.
//
// Nessuna libreria.
(function () {
  const HOST_ID = 'c4-board';

  // pesi della riga 1 della heatmap, colonne 1..7
  const WEIGHTS = [0.39, 0.27, 1.15, 1.07, 0.51, -0.40, -1.30];

  const COLS = 7;
  const ROWS = 6;
  const MAX_ABS = Math.max.apply(null, WEIGHTS.map(Math.abs));

  function t(key, lang, fb) {
    const d = window.__RAMAN_I18N__;
    if (d && d[key] && d[key][lang]) return d[key][lang];
    return fb || key;
  }

  function verdictKey(w) {
    if (w >= 1.0) return 'c4.v.best';
    if (w >= 0.35) return 'c4.v.good';
    if (w > -0.2) return 'c4.v.neutral';
    if (w > -1.0) return 'c4.v.weak';
    return 'c4.v.worst';
  }

  function render(host) {
    const lang = document.documentElement.lang === 'it' ? 'it' : 'en';
    host.textContent = '';

    let chosen = null;

    const board = document.createElement('div');
    board.className = 'c4-board';
    board.setAttribute('role', 'group');
    board.setAttribute('aria-label', t('c4.aria', lang, 'Connect Four board'));

    const readout = document.createElement('div');
    readout.className = 'c4-readout';

    const bars = document.createElement('div');
    bars.className = 'c4-bars';
    bars.hidden = true;

    function showResult(col) {
      const w = WEIGHTS[col];
      const sign = w > 0 ? '+' : '';
      readout.innerHTML =
        '<p class="c4-verdict"><strong>' +
        t('c4.column', lang, 'Column') + ' ' + (col + 1) + '</strong> &mdash; ' +
        t(verdictKey(w), lang, '') + '</p>' +
        '<p class="c4-weight">' + t('c4.weight', lang, 'Model weight') +
        ': <strong>' + sign + w.toFixed(2) + '</strong> ' +
        '<span class="c4-scale">(' + t('c4.scale', lang, '0 = neutral') + ')</span></p>';

      // barre comparative di tutte le colonne
      bars.hidden = false;
      bars.textContent = '';
      const title = document.createElement('p');
      title.className = 'c4-bars-title';
      title.textContent = t('c4.compare', lang, 'All columns compared');
      bars.appendChild(title);

      WEIGHTS.forEach(function (val, i) {
        const row = document.createElement('div');
        row.className = 'c4-bar-row' + (i === col ? ' is-chosen' : '');

        const lbl = document.createElement('span');
        lbl.className = 'c4-bar-label';
        lbl.textContent = i + 1;

        const track = document.createElement('span');
        track.className = 'c4-bar-track';
        const fill = document.createElement('span');
        fill.className = 'c4-bar-fill ' + (val >= 0 ? 'is-pos' : 'is-neg');
        fill.style.width = (Math.abs(val) / MAX_ABS * 50) + '%';
        track.appendChild(fill);

        const num = document.createElement('span');
        num.className = 'c4-bar-value';
        num.textContent = (val > 0 ? '+' : '') + val.toFixed(2);

        row.appendChild(lbl);
        row.appendChild(track);
        row.appendChild(num);
        bars.appendChild(row);
      });
    }

    function drop(col) {
      chosen = col;
      board.querySelectorAll('.c4-cell').forEach(function (c) {
        c.classList.remove('is-filled');
      });
      // il gettone cade in fondo: riga 1 = la fila piu' bassa
      const cell = board.querySelector('.c4-cell[data-col="' + col + '"][data-row="0"]');
      if (cell) cell.classList.add('is-filled');
      board.querySelectorAll('.c4-col').forEach(function (c, i) {
        c.classList.toggle('is-chosen', i === col);
        c.setAttribute('aria-pressed', String(i === col));
      });
      showResult(col);
    }

    for (let c = 0; c < COLS; c++) {
      const colEl = document.createElement('button');
      colEl.type = 'button';
      colEl.className = 'c4-col';
      colEl.dataset.col = c;
      colEl.setAttribute('aria-pressed', 'false');
      colEl.setAttribute('aria-label', t('c4.column', lang, 'Column') + ' ' + (c + 1));

      for (let r = ROWS - 1; r >= 0; r--) {
        const cell = document.createElement('span');
        cell.className = 'c4-cell';
        cell.dataset.col = c;
        cell.dataset.row = r;
        colEl.appendChild(cell);
      }

      const num = document.createElement('span');
      num.className = 'c4-colnum';
      num.textContent = c + 1;
      colEl.appendChild(num);

      colEl.addEventListener('click', function () { drop(c); });
      board.appendChild(colEl);
    }

    const hint = document.createElement('p');
    hint.className = 'c4-hint';
    hint.textContent = t('c4.hint', lang, 'Pick a column for the first move.');

    host.appendChild(hint);
    host.appendChild(board);
    host.appendChild(readout);
    host.appendChild(bars);
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
