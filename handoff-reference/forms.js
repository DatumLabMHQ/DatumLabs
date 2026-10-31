/* Datum Labs — form handling.
   Every form on the site posts somewhere real. Default: open a pre-filled
   email to hello@datumlab.xyz and show a confirmation. To switch to a hosted
   endpoint later, add data-endpoint="https://formspree.io/f/xxxx" to the
   <form>; it will POST as JSON and show the same confirmation. */
(function () {
  var TO = 'hello@datumlab.xyz';

  function ready(fn) {
    if (document.readyState !== 'loading') setTimeout(fn, 0);
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function fields(form) {
    var out = {};
    form.querySelectorAll('input,textarea,select').forEach(function (el) {
      var k = el.name || el.getAttribute('aria-label') || el.placeholder || el.type;
      if (el.type === 'submit') return;
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

  function done(form, msg) {
    var note = form.parentNode.querySelector('.form-done');
    if (!note) {
      note = document.createElement('p');
      note.className = 'form-done';
      note.setAttribute('role', 'status');
      form.parentNode.insertBefore(note, form.nextSibling);
    }
    note.textContent = msg;
    form.classList.add('is-sent');
    form.querySelectorAll('input,button').forEach(function (el) { el.disabled = true; });
  }

  function send(form) {
    var data = fields(form);
    var subject = form.dataset.subject || 'Website enquiry';
    var endpoint = form.dataset.endpoint;
    var btn = form.querySelector('button[type=submit]');
    var label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    if (endpoint) {
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(Object.assign({ _subject: subject }, data)) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(form, form.dataset.done || 'Sent. We will be in touch.'); })
        .catch(function () { if (btn) { btn.disabled = false; btn.textContent = label; } fallback(form, data, subject); });
      return;
    }
    fallback(form, data, subject);
  }

  function fallback(form, data, subject) {
    var body = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body + '\n\nSent from datumlab.xyz');
    done(form, form.dataset.done || 'Your email client should have opened. If it did not, write to ' + TO + '.');
  }

  ready(function () {
    document.querySelectorAll('form[data-form]').forEach(function (form) {
      form.removeAttribute('onsubmit');
      form.setAttribute('novalidate', '');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!valid(form)) { var first = form.querySelector('.is-invalid'); if (first) first.focus(); return; }
        send(form);
      });
      form.querySelectorAll('input').forEach(function (el) {
        el.addEventListener('input', function () { el.classList.remove('is-invalid'); el.removeAttribute('aria-invalid'); });
      });
    });
  });
})();
