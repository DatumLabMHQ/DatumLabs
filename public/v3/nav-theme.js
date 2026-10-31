/* Nav theme: the pinned bar takes its colours from whatever section sits
   behind it. Dark regions declare themselves with [data-nav-dark].

   Two rules make this deterministic:

   1. The state at the TOP of the page is authored in the HTML
      (class="nav is-dark" where the first section is dark). It is never
      measured, because a measurement taken mid-load — before the hero video,
      the footer texture plate or webfonts have settled layout — can return the
      wrong answer and clear the authored class with nothing to correct it.

   2. Measurement only runs once the page is actually scrolled. Past scrollY 0
      the geometry is real and the observers/scroll handler keep it honest. */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var regions = [];
  var io = null;
  var ro = null;
  // The authored class is the truth at the top of the page; remember it so a
  // jump back to scrollY 0 restores it rather than keeping whatever state the
  // last measurement left behind.
  var authoredDark = nav.classList.contains('is-dark');

  function scrollY() { return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0; }

  function measure() {
    if (!regions.length) return;
    // At the top of the page the authored class is the truth.
    if (scrollY() <= 0) { nav.classList.toggle('is-dark', authoredDark); return; }
    var h = Math.round(nav.getBoundingClientRect().height) || 57;
    var dark = false;
    for (var i = 0; i < regions.length; i++) {
      var r = regions[i].getBoundingClientRect();
      if (r.top <= h + 1 && r.bottom > h) { dark = true; break; }
    }
    nav.classList.toggle('is-dark', dark);
  }

  function build() {
    regions = [].slice.call(document.querySelectorAll('[data-nav-dark]'));
    if (io) io.disconnect();
    if (ro) ro.disconnect();
    if (!regions.length) return;

    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(measure);
      ro.observe(nav);
      regions.forEach(function (r) { ro.observe(r); });
    }

    if ('IntersectionObserver' in window) {
      var h = Math.round(nav.getBoundingClientRect().height) || 57;
      var bottom = Math.max(window.innerHeight - h - 1, 0);
      // The observer is only a trigger; measure() alone decides the state.
      io = new IntersectionObserver(measure, {
        rootMargin: '-' + h + 'px 0px -' + bottom + 'px 0px', threshold: 0
      });
      regions.forEach(function (r) { io.observe(r); });
    }
    measure();
  }

  var rt;
  function onResize() { clearTimeout(rt); rt = setTimeout(build, 140); }

  function init() {
    build();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', build);
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
