/* DigitalBloom interactions: defensive checks keep the page safe if an element changes later. */
document.addEventListener('DOMContentLoaded', function () {
  try {
    var header = document.querySelector('.site-header');
    var menuButton = document.querySelector('.menu-toggle');
    var navLinks = document.querySelector('.nav-links');
    var setHeaderState = function () { if (header) header.classList.toggle('scrolled', window.scrollY > 8); };
    setHeaderState(); window.addEventListener('scroll', setHeaderState, { passive: true });
    if (menuButton && navLinks) {
      menuButton.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      });
      navLinks.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation menu'); }); });
    }
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) { var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: .12 }); reveals.forEach(function (element) { observer.observe(element); }); } else { reveals.forEach(function (element) { element.classList.add('visible'); }); }
    var year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
    var form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', function (event) {
      event.preventDefault(); var valid = true; var fields = [{ id: 'name', message: 'Please enter your name.' }, { id: 'email', message: 'Please enter a valid email address.', email: true }, { id: 'message', message: 'Please write a short message.' }];
      fields.forEach(function (field) { var input = document.getElementById(field.id); var error = input && input.parentElement.querySelector('small'); var value = input ? input.value.trim() : ''; var isValid = value && (!field.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)); if (!isValid) { valid = false; if (input) input.classList.add('invalid'); if (error) error.textContent = field.message; } else { if (input) input.classList.remove('invalid'); if (error) error.textContent = ''; } });
      var status = document.getElementById('form-status'); if (status) status.textContent = valid ? 'JazakAllahu khairan! Your message is ready to send.' : 'Please correct the highlighted fields.'; if (valid) form.reset();
    });
  } catch (error) { console.warn('DigitalBloom enhancements could not load.', error); }
});
