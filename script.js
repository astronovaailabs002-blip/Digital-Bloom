/* Nilufar Naaz portfolio interactions. */
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-burger');
  var links = document.querySelector('.nav-links');
  var navLogo = document.querySelector('.nav-logo');
  var navBase = navLogo && navLogo.getAttribute('href').indexOf('../') === 0 ? '../index.html' : 'index.html';
  if (links) {
    var contactLink = links.querySelector('.nav-cta');
    var blogLink = links.querySelector('a[href$="blog.html"]');
    [['Services', navBase + '#services'], ['Projects', navBase + '#projects']].forEach(function (item) {
      if (!links.querySelector('a[href="' + item[1] + '"]')) {
        var link = document.createElement('a');
        link.href = item[1];
        link.textContent = item[0];
        links.insertBefore(link, blogLink || contactLink);
      }
    });
    if (contactLink && !links.querySelector('.nav-whatsapp')) {
      var chat = document.createElement('a');
      chat.className = 'nav-whatsapp';
      chat.href = navBase.replace('index.html', 'contact.html');
      chat.title = 'WhatsApp: @nilufar__.naaz';
      chat.setAttribute('aria-label', 'Let\'s Chat on WhatsApp: @nilufar__.naaz');
      chat.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Let\'s Chat</span>';
      links.appendChild(chat);
    }
  }
  document.querySelectorAll('main section').forEach(function (section) {
    var heading = section.querySelector('.section-heading');
    if (!heading) return;
    var text = heading.textContent;
    if (text.indexOf('What I do') !== -1) section.id = 'services';
    if (text.indexOf('Featured skills') !== -1) section.id = 'projects';
  });
  if (navLogo) {
    var logoImage = document.createElement('img');
    logoImage.className = 'nav-logo-image';
    logoImage.src = navLogo.getAttribute('href').indexOf('../') === 0 ? '../nilufar-logo-navbar.png' : 'nilufar-logo-navbar.png';
    logoImage.alt = 'Nilufar Naaz';
    navLogo.replaceChildren(logoImage);
  }
  function updateNav() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (item) { observer.observe(item); });
  } else { items.forEach(function (item) { item.classList.add('visible'); }); }
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  var form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', function (event) {
    event.preventDefault();
    var valid = true;
    [{ id: 'name', message: 'Please enter your name.' }, { id: 'email', message: 'Please enter a valid email address.', email: true }, { id: 'message', message: 'Please write a message.' }].forEach(function (field) {
      var input = document.getElementById(field.id);
      var error = input.nextElementSibling;
      var value = input.value.trim();
      var okay = value && (!field.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      input.classList.toggle('invalid', !okay);
      error.textContent = okay ? '' : field.message;
      valid = valid && Boolean(okay);
    });
    var status = document.getElementById('form-status');
    if (status) status.textContent = valid ? 'Thank you — your message is ready to send.' : 'Please correct the highlighted fields.';
    if (valid) form.reset();
  });
});
