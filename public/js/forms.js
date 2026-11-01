/* Datum Labs — form handling (production).
   Forms POST as JSON to their data-endpoint (default /api/snapshot) and show
   an inline confirmation. Field names come from input name attributes. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }
  function fields(form) {
    var out = {};
    form.querySelectorAll('input,textarea,select').forEach(function (el) {
      if (el.type === 'submit') return;
      var k = el.name || el.getAttribute('aria-label') || el.placeholder || el.type;
      out[k] = el.value.trim();
    });
    return out;
  }
  function valid(form) {
    var ok = true;
    form.querySelectorAll('input[required],input[type=email]').forEach(function (el) {
      var bad = !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
      el.classList.toggle('is-invalid', bad);
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) ok = false;
    });
    return ok;
  }
  function note(form, msg, isError) {
    var n = form.parentNode.querySelector('.form-done');
    if (!n) {
      n = document.createElement('p');
      n.className = 'form-done';
      n.setAttribute('role', 'status');
      form.parentNode.insertBefore(n, form.nextSibling);
    }
    n.textContent = msg;
    n.style.color = isError ? 'var(--red-500, #E5484D)' : '';
    if (!isError) {
      form.classList.add('is-sent');
      form.querySelectorAll('input,textarea,button').forEach(function (el) { el.disabled = true; });
    }
  }
  ready(function () {
    document.querySelectorAll('form[data-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!valid(form)) return;
        var btn = form.querySelector('button[type=submit],button');
        if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
        var endpoint = form.dataset.endpoint || '/api/snapshot';
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.assign(fields(form), { subject: form.dataset.subject || '' })),
        }).then(function (res) {
          if (!res.ok) throw new Error('bad status');
          note(form, form.dataset.done || 'Received. We’ll be in touch inside 48 hours.');
        }).catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
          note(form, 'Something went wrong — email hello@datumlab.xyz instead.', true);
        });
      });
    });
  });
})();
