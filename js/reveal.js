// Fade-in discreto delle sezioni allo scroll.
// Se l'utente ha chiesto meno animazioni, o se IntersectionObserver non c'e',
// tutto resta visibile: la classe .reveal parte trasparente solo quando
// il supporto e' confermato (vedi .js-reveal su <html>).
(function () {
  const reduced = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  // da qui in poi l'animazione e' garantita: attiva gli stili di partenza
  document.documentElement.classList.add('js-reveal');

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

  targets.forEach(function (el) { io.observe(el); });
})();
