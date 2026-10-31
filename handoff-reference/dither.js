/* Datum Labs — sapphire halftone field.
   Pale square dots on a fixed grid, gated by fractal noise so the field reads
   as organic clusters rather than a uniform ramp, with density falling off to
   the left so type can sit over it. Drifts slowly. Brand motif, in motion.
   Mount: <canvas data-dither></canvas> in a positioned box. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hash(x, y) {
    var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function noise(x, y) {
    var xi = Math.floor(x), yi = Math.floor(y);
    var xf = x - xi, yf = y - yi;
    var u = smooth(xf), v = smooth(yf);
    var a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  }
  // 3-octave fbm gives the blobby cluster shapes
  function fbm(x, y) {
    return noise(x, y) * 0.56 + noise(x * 2.1, y * 2.1) * 0.29 + noise(x * 4.3, y * 4.3) * 0.15;
  }
  function smoothstep(a, b, t) {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  function mount(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var STEP = parseFloat(canvas.dataset.step) || 11;     // grid pitch
    var CELL = parseFloat(canvas.dataset.cell) || 7;      // square size
    var SCALE = parseFloat(canvas.dataset.scale) || 150;  // noise feature size
    var FADE = parseFloat(canvas.dataset.fade);           // where density starts
    if (isNaN(FADE)) FADE = 0.3;
    var isStatic = canvas.hasAttribute('data-static');
    var ALPHA = parseFloat(canvas.dataset.alpha);
    if (isNaN(ALPHA)) ALPHA = 0.42;
    var RGB = canvas.dataset.rgb || '74,108,247';
    var GATE = parseFloat(canvas.dataset.gate);
    if (isNaN(GATE)) GATE = 0.62;
    var GRANGE = parseFloat(canvas.dataset.gateRange);
    if (isNaN(GRANGE)) GRANGE = 0.40;
    var w = 0, h = 0, dpr = 1, t = canvas.dataset.seed ? parseFloat(canvas.dataset.seed) : 0;

    function resize() {
      var r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      var cols = Math.ceil(w / STEP) + 1;
      var rows = Math.ceil(h / STEP) + 1;
      for (var i = 0; i < cols; i++) {
        var px = i * STEP;
        // density ramp: empty at the left, full toward the right edge
        var ramp = smoothstep(FADE, 0.96, px / Math.max(w, 1));
        if (ramp <= 0.001) continue;
        for (var j = 0; j < rows; j++) {
          var py = j * STEP;
          var n = fbm(px / SCALE + t, py / SCALE - t * 0.42);
          // gate: threshold drops as the ramp rises, so clusters grow rightward
          var gate = GATE - ramp * GRANGE;
          var over = n - gate;
          if (over <= 0) continue;
          var a = Math.min(over / 0.16, 1) * (0.28 + ramp * 0.72);
          if (a < 0.04) continue;
          ctx.fillStyle = 'rgba(' + RGB + ',' + (a * ALPHA).toFixed(3) + ')';
          ctx.fillRect(px, py, CELL, CELL);
        }
      }
    }

    var running = false, kicked = false, last = 0;
    var MINMS = 1000 / 30; // 30fps is plenty for a slow drift, and halves the work
    function frame(now) {
      if (!running) return;
      requestAnimationFrame(frame);
      if (now - last < MINMS) return;
      last = now;
      t += 0.0022;
      draw();
    }

    function run() {
      if (reduce || isStatic) { draw(); return; }
      if (running) return;
      running = true;
      requestAnimationFrame(frame);
    }

    // Retry on a timer, not rAF: during a slow or backgrounded load rAF can be
    // throttled indefinitely, which would leave the field permanently blank.
    var tries = 0;
    function start() {
      if (kicked) return;
      if (resize()) { kicked = true; run(); return; }
      if (tries++ < 80) setTimeout(start, 60);
    }
    window.addEventListener('load', start);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);

    var redrawIfIdle = function () { if (resize() && (reduce || isStatic)) draw(); };
    var ro = 'ResizeObserver' in window ? new ResizeObserver(redrawIfIdle) : null;
    if (ro) ro.observe(canvas);
    else window.addEventListener('resize', redrawIfIdle);

    if ('IntersectionObserver' in window && !reduce && !isStatic) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { if (kicked && !running) { running = true; requestAnimationFrame(frame); } }
          else running = false;
        });
      }, { threshold: 0 }).observe(canvas);
    }

    start();
  }

  function init() { document.querySelectorAll('[data-dither]').forEach(mount); }
  if (document.readyState !== 'loading') setTimeout(init, 0);
  else document.addEventListener('DOMContentLoaded', init);
})();
