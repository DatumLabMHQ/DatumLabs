/* Datum Labs — FAQ accordion. First item open; any number may be open at once.
   Base CSS keeps answers clipped; without JS the open item still reads. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var items = [].slice.call(document.querySelectorAll('.faq-item'));
    if (!items.length) return;

    function setOpen(item, open) {
      var a = item.querySelector('.faq-a');
      var q = item.querySelector('.faq-q');
      var inner = item.querySelector('.faq-a-inner');
      if (!a || !q || !inner) return;
      item.classList.toggle('open', open);
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      a.style.maxHeight = open ? inner.scrollHeight + 'px' : '0px';
    }

    items.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      if (!q) return;
      setOpen(item, item.classList.contains('open'));
      q.addEventListener('click', function () {
        setOpen(item, !item.classList.contains('open'));
      });
    });

    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        items.forEach(function (item) {
          if (item.classList.contains('open')) setOpen(item, true);
        });
      }, 120);
    });
  });
})();
