// Sidebar: toggle su mobile, espansione in hover su desktop.
// Condiviso da index.html, resume.html e creative.html.
(function () {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  if (!sidebar || !hamburger) return;

  const MOBILE_BREAKPOINT = 768;

  function setOpen(open) {
    sidebar.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  }

  hamburger.addEventListener('click', () => {
    setOpen(!sidebar.classList.contains('open'));
  });

  document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
      setOpen(false);
      hamburger.focus();
    }
  });

  sidebar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setOpen(false);
        sidebar.classList.remove('expanded');
      }
    });
  });

  if (window.innerWidth > MOBILE_BREAKPOINT) {
    sidebar.addEventListener('mouseenter', () => sidebar.classList.add('expanded'));
    sidebar.addEventListener('mouseleave', () => sidebar.classList.remove('expanded'));
  }
})();
