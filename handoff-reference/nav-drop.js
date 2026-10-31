/* Resources dropdown: hover on pointer devices, click/keyboard everywhere. */
(function () {
  function init() {
    document.querySelectorAll('.nav-drop').forEach(function (drop) {
      var btn = drop.querySelector('button');
      var menu = drop.querySelector('.nav-menu');
      if (!btn || !menu) return;
      var hoverable = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
      var t;
      function open() { clearTimeout(t); drop.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      function close() { drop.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        drop.classList.contains('open') ? close() : open();
      });
      if (hoverable) {
        drop.addEventListener('mouseenter', open);
        drop.addEventListener('mouseleave', function () { t = setTimeout(close, 120); });
      }
      document.addEventListener('click', function (e) { if (!drop.contains(e.target)) close(); });
      drop.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); btn.focus(); } });
      menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    });
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
