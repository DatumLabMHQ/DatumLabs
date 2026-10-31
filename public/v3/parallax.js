/* Sticky pins. A section taller than the viewport must pin by its BOTTOM edge,
   otherwise `top: navHeight` clips everything below the fold. The offset is
   measured here and handed to CSS as --pin-top, per pinned section. */
(function () {
  var nav = document.querySelector('.nav');

  // One source of truth for the nav height, set whether or not this page has
  // pins: anything that needs to sit flush under the bar reads --nav-h rather
  // than hard-coding a number that drifts when the bar is resized.
  function navVar() {
    var h = nav ? Math.round(nav.getBoundingClientRect().height) : 96;
    document.documentElement.style.setProperty('--nav-h', h + 'px');
    return h;
  }
  navVar();
  window.addEventListener('resize', navVar);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(navVar);

  // A persistent pin holds under the nav for the whole page. It is excluded
  // from the section-pin logic (no release, no cover) and stacks above every
  // section so nothing scrolls over it.
  var persist = [].slice.call(document.querySelectorAll('[data-pin-persist]'));
  function sizePersist(){
    var navH = navVar();
    persist.forEach(function(el){ el.style.setProperty('--pin-top', navH + 'px'); });
  }
  sizePersist();
  window.addEventListener('resize', sizePersist);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizePersist);

  var pins = [].slice.call(document.querySelectorAll('[data-pin]'));
  if (!pins.length) return;

  // Stack every section in document order, so a later section always paints
  // over an earlier pinned one. Doing it here rather than in CSS keeps the
  // order explicit instead of depending on tree order at equal z-index.
  var main = document.querySelector('main');
  if (main) {
    [].slice.call(main.children).forEach(function (el, i) {
      if (el.tagName !== 'SECTION') return;
      // Never touch a pinned section's position: CSS gives it `sticky`, and an
      // inline `relative` would win and turn its negative `top` into a plain
      // upward offset. Sticky establishes a stacking context regardless.
      if (!el.hasAttribute('data-pin') && !el.style.position
        && getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.zIndex = String(i + 1);
    });
    [].slice.call(main.querySelectorAll('[data-pin-persist]')).forEach(function(el){ el.style.zIndex = '50'; });
  }

  function size() {
    var navH = navVar();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    pins.forEach(function (el) {
      // Measure the CONTENT box. Skip absolutely-positioned children: a
      // full-bleed background image reports the whole section height and would
      // force every pin into the bottom-anchored branch.
      var cs = getComputedStyle(el);
      var inner = null;
      for (var i = 0; i < el.children.length; i++) {
        var p = getComputedStyle(el.children[i]).position;
        if (p !== 'absolute' && p !== 'fixed') { inner = el.children[i]; break; }
      }
      var h = (inner ? inner.getBoundingClientRect().height : el.offsetHeight)
        + parseFloat(cs.paddingTop || 0);
      // Flush to the nav: a gap between navH and the pin top is a strip that
      // nothing paints, and a parked pin shows through it.
      var top = el.hasAttribute('data-pin-top') ? navH
        : (h + navH <= vh ? navH : Math.min(navH, vh - h));
      el.style.setProperty('--pin-top', Math.round(top) + 'px');
      el.__pinTop = Math.round(top);
    });
    release();
  }

  // A sticky element is bounded by its containing block (main), not by its own
  // box, so without this every pin stays parked in the viewport for the rest of
  // the page and shows through any strip its cover does not paint. Release it
  // once the cover fully covers it — static is invisible at that point — and
  // re-stick on the way back up.
  function release() {
    pins.forEach(function (el) {
      var next = el.nextElementSibling;
      if (!next || next.tagName !== 'SECTION') return;
      el.classList.toggle('pin-released', next.getBoundingClientRect().top <= (el.__pinTop || 0));
    });
  }

  var raf = 0;
  window.addEventListener('scroll', function () {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = 0; release(); });
  }, { passive: true });

  var t;
  window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(size, 120); });
  window.addEventListener('load', size);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(size);
  setTimeout(size, 300);
  size();
})();
