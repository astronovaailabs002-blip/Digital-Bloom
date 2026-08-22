/* Nilufar Naaz portfolio interactions — written defensively for mobile browsers. */
document.addEventListener('DOMContentLoaded', function () {
  try {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav-burger');
    var links = document.querySelector('.nav-links');
    function updateNav() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); }
    updateNav(); window.addEventListener('scroll', updateNav, { passive: true });
    if (toggle && links) {
      toggle.addEventListener('click', function () { var open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu'); });
      links.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation menu'); }); });
    }
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) { var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.12 }); items.forEach(function (item) { observer.observe(item); }); } else { items.forEach(function (item) { item.classList.add('visible'); }); }
    var year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
    var form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', function (event) { event.preventDefault(); var valid = true; [{ id:'name', message:'Please enter your name.' }, { id:'email', message:'Please enter a valid email address.', email:true }, { id:'message', message:'Please write a message.' }].forEach(function (field) { var input = document.getElementById(field.id); var error = input.nextElementSibling; var value = input.value.trim(); var okay = value && (!field.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)); input.classList.toggle('invalid', !okay); error.textContent = okay ? '' : field.message; valid = valid && Boolean(okay); }); var status = document.getElementById('form-status'); if (status) status.textContent = valid ? 'Thank you — your message is ready to send.' : 'Please correct the highlighted fields.'; if (valid) form.reset(); });
  } catch (error) { console.warn('Portfolio enhancements could not load.', error); }
});
