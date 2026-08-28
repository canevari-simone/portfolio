// Filtro dei progetti per competenza.
// Le chip in "Competenze e metodi" diventano filtri: cliccandone una,
// la griglia mostra solo i progetti che portano quel tag.
// Senza JS la pagina resta completa: i filtri sono un'aggiunta, non un requisito.
(function () {
  function init() {
    const chips = document.querySelectorAll('.skill-tags [data-i18n]');
    const cards = document.querySelectorAll('.project-card');
    const status = document.getElementById('filter-status');
    if (!chips.length || !cards.length) return;

    // ogni card dichiara le proprie competenze tramite le chiavi dei suoi tag
    const cardKeys = new Map();
    cards.forEach(function (card) {
      const keys = [];
      card.querySelectorAll('.project-tags [data-i18n]').forEach(function (li) {
        keys.push(li.getAttribute('data-i18n'));
      });
      cardKeys.set(card, keys);
    });

    // una chip e' cliccabile solo se almeno un progetto la usa
    const usable = new Set();
    cardKeys.forEach(function (keys) { keys.forEach(function (k) { usable.add(k); }); });

    let active = null;

    function announce(n) {
      if (!status) return;
      const lang = document.documentElement.lang === 'it' ? 'it' : 'en';
      if (active === null) {
        status.textContent = '';
        return;
      }
      status.textContent = lang === 'it'
        ? n + (n === 1 ? ' progetto' : ' progetti')
        : n + (n === 1 ? ' project' : ' projects');
    }

    function apply() {
      let shown = 0;
      cards.forEach(function (card) {
        const match = active === null || cardKeys.get(card).indexOf(active) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      chips.forEach(function (chip) {
        const k = chip.getAttribute('data-i18n');
        chip.classList.toggle('is-active', k === active);
        if (usable.has(k)) chip.setAttribute('aria-pressed', String(k === active));
      });
      announce(shown);
    }

    chips.forEach(function (chip) {
      const key = chip.getAttribute('data-i18n');
      if (!usable.has(key)) {
        chip.classList.add('is-inert');
        return;
      }
      chip.classList.add('is-filter');
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.setAttribute('aria-pressed', 'false');

      const toggle = function () {
        active = (active === key) ? null : key;
        apply();
      };
      chip.addEventListener('click', toggle);
      chip.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });

    // Esc azzera il filtro
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && active !== null) { active = null; apply(); }
    });

    // al cambio lingua l'annuncio va rigenerato
    new MutationObserver(function () {
      if (active !== null) apply();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
