/* site.js — Datum Labs site behaviors
   - theme toggle (persistent in localStorage)
   - cursor-tracking spotlight
   - sticky nav progress bar (page scroll → progress width)
   - pipeline hover callout
   - hero chart draw on load
*/

(function () {
  // ── theme ───────────────────────────────────────────────────
  // Site is light-only. Force light and ignore any previously
  // stored preference. applyTheme is kept as a light-locked no-op
  // so legacy callers stay safe.
  const root = document.documentElement;
  root.setAttribute('data-theme', 'light');
  try { localStorage.setItem('dtm-theme', 'light'); } catch (e) {}

  function applyTheme() {
    root.setAttribute('data-theme', 'light');
  }
  window.applyTheme = applyTheme;

  // ── nav progress bar ────────────────────────────────────────
  function updateProgress() {
    const bar = document.querySelector('.nav-progress');
    if (!bar) return;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const top = window.scrollY || h.scrollTop || document.body.scrollTop || 0;
    const p = max > 0 ? Math.min(top / max, 1) : 0;
    // scaleX, not width: an absolutely-positioned bar with left+right+width
    // drops `right` and overflows the viewport.
    bar.style.transform = 'scaleX(' + p + ')';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  // ── cursor spotlight ────────────────────────────────────────
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.spotlight').forEach((sp) => {
      const r = sp.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      sp.classList.toggle('on', inside);
      if (inside) {
        const glow = sp.querySelector('.spotlight-glow');
        if (glow) {
          glow.style.left = (e.clientX - r.left) + 'px';
          glow.style.top = (e.clientY - r.top) + 'px';
        }
      }
    });
  });

  // ── pipeline hover ──────────────────────────────────────────
  document.addEventListener('mouseover', (e) => {
    const stage = e.target.closest('.pipeline-stage');
    if (!stage) return;
    const pipeline = stage.closest('.pipeline');
    if (!pipeline) return;
    pipeline.querySelectorAll('.pipeline-stage').forEach((s) => s.classList.remove('active'));
    stage.classList.add('active');
    const callout = pipeline.querySelector('.pipeline-callout');
    if (callout && stage.dataset.callout) callout.textContent = stage.dataset.callout;
  });
  document.addEventListener('mouseout', (e) => {
    const stage = e.target.closest('.pipeline-stage');
    if (!stage) return;
    const pipeline = stage.closest('.pipeline');
    if (!pipeline) return;
    pipeline.querySelectorAll('.pipeline-stage').forEach((s) => s.classList.remove('active'));
    const callout = pipeline.querySelector('.pipeline-callout');
    if (callout) callout.textContent = pipeline.dataset.calloutDefault || '';
  });

  // ── status bar timestamp ────────────────────────────────────
  function fmtTime() {
    const d = new Date();
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const pad = (n) => String(n).padStart(2, '0');
    return `${days[d.getUTCDay()]} ${pad(d.getUTCDate())} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
  }
  document.querySelectorAll('[data-timestamp]').forEach((el) => {
    el.textContent = fmtTime();
    setInterval(() => { el.textContent = fmtTime(); }, 30000);
  });

  // ── auto compute path length for chart-line ─────────────────
  function setupChartLines() {
    document.querySelectorAll('.chart-line').forEach((p) => {
      try {
        const len = Math.ceil(p.getTotalLength());
        p.style.setProperty('--dash', len);
      } catch (e) {}
    });
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') setupChartLines();
  else document.addEventListener('DOMContentLoaded', setupChartLines);

  // ── replay chart anim when in viewport ──────────────────────
  const obs = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.chart-line, .chart-area').forEach((el) => {
          el.style.animation = 'none';
          // force reflow
          // eslint-disable-next-line no-unused-expressions
          el.offsetHeight;
          el.style.animation = '';
        });
        obs && obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 }) : null;
  document.querySelectorAll('.chartcard').forEach((c) => obs && obs.observe(c));

  // initial progress
  updateProgress();
})();

/* ════════════════════════════════════════════════════════════
   MOTION LAYER — fade-up reveals · hero word stagger ·
   ambient sapphire glow with delayed (lerped) cursor follow.
   Self-contained; safe to no-op if features unsupported.
   ════════════════════════════════════════════════════════════ */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Signal CSS that JS motion is active (CSS hides reveal targets only then).
  root.classList.add('js-motion');
  if (reduce) return; // CSS already neutralizes; skip all JS work.

  function ready(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(fn, 0);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // ── 2 · hero word stagger ───────────────────────────────────
  function buildWordStagger() {
    document.querySelectorAll('[data-anim-words]').forEach(function (el) {
      var items = [];
      var frag = document.createDocumentFragment();
      Array.prototype.forEach.call(el.childNodes, function (node) {
        if (node.nodeType === 3) { // text → split into words, keep whitespace
          var parts = node.textContent.split(/(\s+)/);
          parts.forEach(function (p) {
            if (p === '') return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); }
            else {
              var s = document.createElement('span');
              s.className = 'anim-word';
              s.textContent = p;
              frag.appendChild(s); items.push(s);
            }
          });
        } else if (node.nodeName === 'BR') {
          frag.appendChild(node.cloneNode());
        } else if (node.nodeType === 1) { // element (e.g. <span class="it">) — keep as one item
          node.classList.add('anim-word');
          frag.appendChild(node); items.push(node);
        } else {
          frag.appendChild(node.cloneNode(true));
        }
      });
      el.innerHTML = '';
      el.appendChild(frag);
      items.forEach(function (it, i) { it.style.animationDelay = (i * 75) + 'ms'; });
      // Wait for Source Serif Pro before revealing, so the heading never
      // flashes in the heavier Georgia fallback (FOUT). Words are opacity:0
      // until .anim-in, so gating here hides the swap entirely.
      var played = false;
      var play = function () { if (played) return; played = true; el.classList.add('anim-in'); };
      if (document.fonts && document.fonts.ready) {
        var done = false;
        document.fonts.ready.then(function () { done = true; play(); });
        setTimeout(play, 1200); // safety: never leave the heading hidden
      } else {
        play();
      }
    });
  }

  // ── 1 · scroll fade-up reveals ──────────────────────────────
  function buildReveals() {
    // Current component set. Keep this in step with the markup — stale
    // selectors silently mean no animation rather than an error.
    var SEL = [
      '.section-head',
      '.lead-split > *',
      '.cells > *',
      '.logo-cell',
      '.split-lead', '.split-item',
      '.svc-col', '.pc', '.dash-card', '.pipeline-stage',
      '.tcard', '.cs-facts > *', '.cs-stat', '.stat-eyebrow',
      '.faq-label', '.faq-item',
      '.ctaplate', '.prow', '.cs-aside', '.cs-body > *',
      '.rfeature', '.rcard',
      '.prose', '.smallprint', '.refuse li',
      '.dtable', '.ask',
      '.page-header .ph-inner > *',
      '.footer-brand', '.footer-col'
    ].join(', ');
    var nodes = Array.prototype.slice.call(document.querySelectorAll(SEL));
    // Skip anything inside the hero (it has its own load animation), and any
    // node nested inside another reveal target so entrances never double up.
    nodes = nodes.filter(function (n) {
      if (n.closest('.hero')) return false;
      return !nodes.some(function (o) { return o !== n && o.contains(n); });
    });
    if (!nodes.length) return;

    // Per-group stagger: delay by index among reveal siblings in same parent.
    var seen = new Map();
    nodes.forEach(function (n) {
      n.setAttribute('data-reveal', '');
      var p = n.parentNode;
      var idx = seen.get(p) || 0;
      seen.set(p, idx + 1);
      n.__revealDelay = Math.min(idx * 240, 960);
    });

    function reveal(n) {
      if (n.__revealed) return;
      n.__revealed = true;
      n.removeAttribute('data-reveal-pending');
      n.style.animationDelay = (n.__revealDelay || 0) + 'ms';
      n.classList.add('revealed'); // CSS keyframes play the entrance
    }

    // Scroll-driven check (IntersectionObserver is unreliable in embedded
    // preview frames, so we use a rAF-throttled rect test instead).
    // Elements already in view at load are left visible WITHOUT animation,
    // so the first paint never depends on the animation clock. Only
    // below-the-fold elements animate as they scroll into view.
    var pending = [];

    // Classification must happen AFTER layout settles. At DOMContentLoaded the
    // hero video and images have not sized yet, so the document is short and
    // every target looks "in view" — which silently disabled all animation.
    function classify() {
      var vh0 = window.innerHeight || document.documentElement.clientHeight;
      nodes.forEach(function (n) {
        if (n.__revealed || n.__pending) return;
        // The subpage header is the one above-the-fold block that SHOULD play
        // on load: it is the page's entrance, and its parent has an opaque
        // plate so the first paint never shows a blank page behind it.
        if (n.closest('.page-header')) { reveal(n); return; }
        // The first content section after a header is usually partly in view
        // on load too. It plays rather than snapping in, so the entrance
        // continues from the header instead of stopping at it.
        var hdr = document.querySelector('.page-header');
        var firstSec = hdr ? hdr.nextElementSibling : null;
        // a pinned facts strip is not content; look past it
        if (firstSec && firstSec.hasAttribute('data-pin-persist')) firstSec = firstSec.nextElementSibling;
        if (firstSec && firstSec.tagName === 'SECTION' && firstSec.contains(n)) { reveal(n); return; }
        if (n.closest('[data-pin-persist]')) { reveal(n); return; }
        var r = n.getBoundingClientRect();
        if (r.top >= vh0 * 0.95) {
          n.__pending = true;
          n.setAttribute('data-reveal-pending', '');
          pending.push(n);
        }
      });
    }
    var ticking = false;

    function check() {
      ticking = false;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var trigger = vh * 0.92;
      for (var i = pending.length - 1; i >= 0; i--) {
        var n = pending[i];
        var r = n.getBoundingClientRect();
        // No `r.bottom > 0` test: anything already scrolled past must reveal
        // too, or fast scrolling / anchor jumps leave blocks stuck invisible.
        if (r.top < trigger) {
          reveal(n);
          pending.splice(i, 1);
        }
      }
    }
    function onScroll() {
      // synchronous: a throttled rAF in a background tab would otherwise leave
      // the pending flag set and wedge every later scroll
      check();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    classify();
    // re-run as layout settles, so late-sizing media still gets caught
    window.addEventListener('load', function () { classify(); check(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { classify(); check(); });
    setTimeout(function () { classify(); check(); }, 300);
    setTimeout(function () { classify(); check(); }, 900);

    // Backstop for environments where scroll events are unreliable. It runs the
    // same trigger test rather than blanket-revealing: an earlier version
    // unhid everything after a few seconds, which killed the effect for anyone
    // reading slowly.
    var backstop = setInterval(function () {
      classify();
      check();
      if (!pending.length && document.readyState === 'complete') clearInterval(backstop);
    }, 1200);
  }

  ready(function () {
    buildWordStagger();
    buildReveals();
  });
})();

/* ════════════════════════════════════════════════════════════
   CLICK ACCORDION — Selected Work
   Default collapsed; clicking an entry's header expands it and
   collapses the others (single-open). Click again to collapse.
   Base CSS keeps bodies open, so no-JS users still see everything.
   ════════════════════════════════════════════════════════════ */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var list = document.querySelector('.acc-list');
    if (!list) return;
    var entries = [].slice.call(list.querySelectorAll('[data-acc]'));
    if (!entries.length) return;

    list.classList.add('js-acc');

    // Start fully collapsed.
    entries.forEach(function (en) {
      en.classList.remove('open');
      var header = en.querySelector('.acc-header');
      if (!header) return;
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', 'false');

      function toggle() {
        var willOpen = !en.classList.contains('open');
        entries.forEach(function (other) {
          other.classList.toggle('open', other === en && willOpen);
          var h = other.querySelector('.acc-header');
          if (h) h.setAttribute('aria-expanded', other === en && willOpen ? 'true' : 'false');
        });
      }

      header.addEventListener('click', toggle);
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   NAV DROPDOWNS + MOBILE DRAWER
   Desktop (hover-capable): CSS :hover opens the mega panels; a
   click never sticks them. Touch / no-hover: tap a trigger to
   toggle its panel open (closes others). Hamburger toggles the
   mobile drawer ≤1024px.
   ════════════════════════════════════════════════════════════ */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var triggers = [].slice.call(document.querySelectorAll('.nav-dd-trigger'));
    var hoverCapable = !window.matchMedia || window.matchMedia('(hover: hover)').matches;

    function closeAllItems(except) {
      document.querySelectorAll('.nav-item.open').forEach(function (it) {
        if (it === except) return;
        it.classList.remove('open');
        var b = it.querySelector('.nav-dd-trigger');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }

    triggers.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (hoverCapable) { btn.blur(); return; }   // hover owns it on desktop
        // touch / no-hover: tap toggles this panel
        var item = btn.closest('.nav-item');
        var willOpen = !item.classList.contains('open');
        closeAllItems(item);
        item.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });

    if (!hoverCapable) {
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-item')) closeAllItems(null);
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllItems(null);
        if (document.activeElement) document.activeElement.blur();
        closeMobile();
      }
    });

    // ── mobile drawer ──
    var toggle = document.querySelector('.nav-toggle');
    var drawer = document.getElementById('navMobile');
    function openMobile() {
      if (!drawer) return;
      drawer.hidden = false;
      // next frame so the transition runs from the hidden state
      requestAnimationFrame(function () { drawer.classList.add('open'); });
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
    }
    function closeMobile() {
      if (!drawer || !toggle) return;
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      setTimeout(function () { if (!drawer.classList.contains('open')) drawer.hidden = true; }, 240);
    }
    if (toggle && drawer) {
      toggle.addEventListener('click', function () {
        if (drawer.classList.contains('open')) closeMobile(); else openMobile();
      });
      drawer.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeMobile();   // navigate → close
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 1024) closeMobile();
      });
    }
  });
})();

/* ════════════════════════════════════════════════════════════
   HERO DATA-MESH — quiet animated node network on <canvas>
   ~25 sapphire nodes drift slowly; thin lines link nearby pairs
   (opacity by distance), constantly re-forming. Cursor links to
   nearby nodes. Restrained, low-contrast. Static frame under
   reduced-motion; pauses when tab hidden.
   ════════════════════════════════════════════════════════════ */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var cards = [].slice.call(document.querySelectorAll('[data-mesh]:not([data-mesh-mode="burst"])'));
    if (!cards.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var SAPPHIRE = '74,108,247';

    cards.forEach(function (card) {
      var canvas = card.querySelector('.mesh-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = 0, H = 0, nodes = [], beams = [], BEAM_TARGET = 6, raf = null, running = false;
      var LINK = 150;
      var mouse = { x: null, y: null };

      function size() {
        var r = card.getBoundingClientRect();
        W = Math.max(1, r.width); H = Math.max(1, r.height);
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      function init() {
        size();
        var count = Math.max(16, Math.min(30, Math.round((W * H) / 15000)));
        nodes = [];
        for (var i = 0; i < count; i++) {
          var hub = Math.random() < 0.16;
          nodes.push({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
            r: hub ? 2.4 + Math.random() * 1.4 : 1.1 + Math.random() * 1.0,
            hub: hub
          });
        }
        beams = [];
        BEAM_TARGET = Math.max(4, Math.round(count / 4));
      }
      function neighbor(node, exclude) {
        var cand = [];
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];
          if (n === node || n === exclude) continue;
          var dx = n.x - node.x, dy = n.y - node.y;
          if (dx * dx + dy * dy < LINK * LINK) cand.push(n);
        }
        return cand.length ? cand[(Math.random() * cand.length) | 0] : null;
      }
      function spawnBeam() {
        if (nodes.length < 2) return null;
        var from = nodes[(Math.random() * nodes.length) | 0];
        var to = neighbor(from, null);
        return to ? { from: from, to: to, t: 0, speed: 0.012 + Math.random() * 0.014 } : null;
      }
      function draw(animate) {
        ctx.clearRect(0, 0, W, H);
        var i, j;
        if (animate) {
          for (i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            n.x += n.vx; n.y += n.vy;
            if (n.x < -24) n.x = W + 24; else if (n.x > W + 24) n.x = -24;
            if (n.y < -24) n.y = H + 24; else if (n.y > H + 24) n.y = -24;
          }
        }
        // node-to-node links
        for (i = 0; i < nodes.length; i++) {
          for (j = i + 1; j < nodes.length; j++) {
            var a = nodes[i], b = nodes[j];
            var dx = a.x - b.x, dy = a.y - b.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < LINK) {
              ctx.strokeStyle = 'rgba(' + SAPPHIRE + ',' + ((1 - d / LINK) * 0.16).toFixed(3) + ')';
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
        // cursor links
        if (mouse.x != null) {
          var MR = LINK * 1.25;
          for (i = 0; i < nodes.length; i++) {
            var m = nodes[i];
            var mdx = m.x - mouse.x, mdy = m.y - mouse.y;
            var md = Math.sqrt(mdx * mdx + mdy * mdy);
            if (md < MR) {
              ctx.strokeStyle = 'rgba(' + SAPPHIRE + ',' + ((1 - md / MR) * 0.28).toFixed(3) + ')';
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            }
          }
        }
        // nodes
        for (i = 0; i < nodes.length; i++) {
          var p = nodes[i];
          if (p.hub) {
            ctx.fillStyle = 'rgba(' + SAPPHIRE + ',0.10)';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, 6.2832); ctx.fill();
          }
          ctx.fillStyle = 'rgba(' + SAPPHIRE + ',' + (p.hub ? 0.85 : 0.45) + ')';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        }
        // traveling beams along links
        if (animate) {
          if (beams.length < BEAM_TARGET && Math.random() < 0.09) {
            var nb = spawnBeam(); if (nb) beams.push(nb);
          }
          for (var k = beams.length - 1; k >= 0; k--) {
            var bm = beams[k];
            bm.t += bm.speed;
            if (bm.t >= 1) {
              var nxt = neighbor(bm.to, bm.from);
              if (nxt) { bm.from = bm.to; bm.to = nxt; bm.t = 0; }
              else { beams.splice(k, 1); continue; }
            }
            var bx = bm.from.x + (bm.to.x - bm.from.x) * bm.t;
            var by = bm.from.y + (bm.to.y - bm.from.y) * bm.t;
            var tt = bm.t > 0.14 ? bm.t - 0.14 : 0;
            var tx = bm.from.x + (bm.to.x - bm.from.x) * tt;
            var ty = bm.from.y + (bm.to.y - bm.from.y) * tt;
            var grad = ctx.createLinearGradient(tx, ty, bx, by);
            grad.addColorStop(0, 'rgba(' + SAPPHIRE + ',0)');
            grad.addColorStop(1, 'rgba(' + SAPPHIRE + ',0.55)');
            ctx.strokeStyle = grad; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(bx, by); ctx.stroke();
            ctx.fillStyle = 'rgba(' + SAPPHIRE + ',0.95)';
            ctx.beginPath(); ctx.arc(bx, by, 1.7, 0, 6.2832); ctx.fill();
          }
        }
      }
      function loop() { draw(true); raf = requestAnimationFrame(loop); }
      function start() { if (running) return; running = true; loop(); }
      function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

      init();
      if (reduce) { draw(false); return; } // single static frame

      start();

      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt); rt = setTimeout(function () { init(); }, 150);
      });
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      });
      card.addEventListener('mouseleave', function () { mouse.x = mouse.y = null; });
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   HERO RADIAL BURST (option B) — dense particle field streaming
   outward from centre with short trails. Used when the card has
   data-mesh-mode="burst". Static frame under reduced-motion.
   ════════════════════════════════════════════════════════════ */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var cards = [].slice.call(document.querySelectorAll('[data-mesh][data-mesh-mode="burst"]'));
    if (!cards.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var SAPPHIRE = '74,108,247';

    cards.forEach(function (card) {
      var canvas = card.querySelector('.mesh-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = 0, H = 0, ps = [], raf = null, running = false;
      var cx = 0, cy = 0, rx = 0, ry = 0;

      function size() {
        var r = card.getBoundingClientRect();
        W = Math.max(1, r.width); H = Math.max(1, r.height);
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cx = W * 0.5; cy = H * 0.5; rx = W * 0.62; ry = H * 0.64;
      }
      function mk(seed) {
        return {
          a: Math.random() * 6.2832,
          d: seed ? Math.random() : Math.random() * 0.06,
          spd: 0.0024 + Math.random() * 0.0052,
          sz: 0.6 + Math.random() * 1.1,
          lead: Math.random() < 0.12
        };
      }
      function init() {
        size();
        var count = Math.max(220, Math.min(520, Math.round((W * H) / 1500)));
        ps = [];
        for (var i = 0; i < count; i++) ps.push(mk(true));
      }
      function env(d) { // opacity envelope along the radius
        if (d < 0.12) return d / 0.12;
        if (d > 0.72) return Math.max(0, (1 - d) / 0.28);
        return 1;
      }
      function draw(animate) {
        ctx.clearRect(0, 0, W, H);
        // faint centre glow
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(rx, ry) * 0.9);
        g.addColorStop(0, 'rgba(' + SAPPHIRE + ',0.11)');
        g.addColorStop(1, 'rgba(' + SAPPHIRE + ',0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

        for (var i = 0; i < ps.length; i++) {
          var p = ps[i];
          if (animate) {
            p.d += p.spd;
            if (p.d >= 1) { ps[i] = mk(false); p = ps[i]; }
          }
          var ca = Math.cos(p.a), sa = Math.sin(p.a);
          var px = cx + ca * p.d * rx, py = cy + sa * p.d * ry;
          var o = env(p.d) * (p.lead ? 0.95 : 0.55);
          if (o <= 0.01) continue;
          // trail
          var td = p.d > 0.06 ? p.d - 0.06 : 0;
          var tx = cx + ca * td * rx, ty = cy + sa * td * ry;
          var grad = ctx.createLinearGradient(tx, ty, px, py);
          grad.addColorStop(0, 'rgba(' + SAPPHIRE + ',0)');
          grad.addColorStop(1, 'rgba(' + SAPPHIRE + ',' + (o * 0.7).toFixed(3) + ')');
          ctx.strokeStyle = grad; ctx.lineWidth = p.lead ? 1.4 : 0.9;
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py); ctx.stroke();
          // head
          ctx.fillStyle = 'rgba(' + SAPPHIRE + ',' + o.toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(px, py, p.sz, 0, 6.2832); ctx.fill();
        }
      }
      function loop() { draw(true); raf = requestAnimationFrame(loop); }
      function start() { if (running) return; running = true; loop(); }
      function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

      init();
      if (reduce) { draw(false); return; }
      start();

      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt); rt = setTimeout(function () { init(); }, 150);
      });
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   HERO DITHER FIELD — sapphire halftone on a regular dot grid.
   Each dot's radius is driven by a domain-warped flow field, so
   the dots ripple like liquid (drifting wave-bands of dense/
   sparse), fading at the panel edges. Dots part around the cursor.
   Static single frame under reduced-motion; pauses when hidden.
   ════════════════════════════════════════════════════════════ */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var stages = [].slice.call(document.querySelectorAll('[data-dither]'));
    if (!stages.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var SAP = '74,108,247';

    stages.forEach(function (stage) {
      var canvas = stage.querySelector('.dither-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = 0, H = 0, cell = 6, cols = 0, rows = 0, raf = null, running = false, t = 0;
      var thresh = null;   // per-cell random threshold → scattered, un-gridded dither

      function size() {
        var r = stage.getBoundingClientRect();
        W = Math.max(1, r.width); H = Math.max(1, r.height);
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cols = Math.ceil(W / cell); rows = Math.ceil(H / cell);
        thresh = new Float32Array(cols * rows);
        for (var i = 0; i < thresh.length; i++) thresh[i] = Math.random();
        draw(false);   // paint immediately so a (re)size never leaves it blank
      }

      // domain-warped multi-sine field → organic, liquid flow. Returns 0..1.
      function field(x, y) {
        var wx = Math.sin(y * 0.013 + t * 0.90) * 30 + Math.cos(y * 0.032 - t * 0.60) * 14;
        var wy = Math.cos(x * 0.013 + t * 0.80) * 30 + Math.sin(x * 0.030 + t * 0.70) * 14;
        var xx = x + wx, yy = y + wy;
        var v = Math.sin(xx * 0.019 + t * 1.00)
              + Math.sin(yy * 0.021 - t * 0.80)
              + Math.sin((xx + yy) * 0.014 + t * 0.60)
              + Math.sin((xx - yy) * 0.017 - t * 0.50);
        return (v / 4 + 1) / 2;
      }

      function draw(animate) {
        ctx.clearRect(0, 0, W, H);
        if (animate) t += 0.019;
        for (var gy = 0; gy < rows; gy++) {
          for (var gx = 0; gx < cols; gx++) {
            var x = gx * cell, y = gy * cell;
            var n = field(x + cell / 2, y + cell / 2);
            // tiny top fade, larger bottom fade → dots can reach the very top
            var ey = Math.min(Math.min(1, y / (H * 0.04)), Math.min(1, (H - y) / (H * 0.12)));
            var rxedge = Math.min(1, (W - x) / (W * 0.05));   // soft right edge
            // steep left fade: empty over the left ~44%, ramps up toward the right
            var lb = (x - W * 0.44) / (W * 0.38);
            if (lb < 0) lb = 0; else if (lb > 1) lb = 1;
            lb = lb * lb * (3 - 2 * lb);
            // sparse veil across the top (incl. the left), above the headline
            var topBand = 1 - y / (H * 0.34);
            if (topBand < 0) topBand = 0; else if (topBand > 1) topBand = 1;
            topBand = topBand * topBand;
            var gate = Math.max(lb, topBand * 0.34);
            var p = n * ey * rxedge * gate;          // fill probability
            if (p <= thresh[gy * cols + gx]) continue;   // random dither test
            // square grows with coverage so dense cells momentarily merge
            var s = cell * (0.5 + p * 0.6);
            if (s > cell) s = cell;                 // cap at cell → squares tile, never overlap
            var o = (cell - s) / 2;
            ctx.fillStyle = 'rgba(' + SAP + ',' + (0.34 + p * 0.40).toFixed(3) + ')';
            ctx.fillRect(Math.round(x + o), Math.round(y + o), Math.ceil(s), Math.ceil(s));
          }
        }
      }

      function loop() {
        var r = stage.getBoundingClientRect();
        if (r.width >= 1 && (Math.abs(r.width - W) > 1 || Math.abs(r.height - H) > 1)) size();
        draw(true); raf = requestAnimationFrame(loop);
      }
      function start() { if (running) return; running = true; loop(); }
      function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

      size();
      if (reduce) { draw(false); return; }
      start();

      var rt2;
      window.addEventListener('resize', function () {
        clearTimeout(rt2); rt2 = setTimeout(size, 150);
      });
      // The stage height resolves after layout/fonts; re-measure when it does
      // (at DOMContentLoaded the stage can still report 0×0 → 1×1 canvas).
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(function () {
          var r = stage.getBoundingClientRect();
          if (Math.abs(r.width - W) > 1 || Math.abs(r.height - H) > 1) size();
        });
        ro.observe(stage);
      }
      window.addEventListener('load', size);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });
    });
  });
})();
