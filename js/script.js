const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');

    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
  });
}

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const year = document.querySelector('[data-year]');

if (year) {
  year.textContent = new Date().getFullYear();
}

const copyEmail = document.querySelector('[data-copy-email]');

if (copyEmail) {
  copyEmail.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = copyEmail.getAttribute('data-copy-email');
    const status = copyEmail.querySelector('.copy-status');

    try {
      await navigator.clipboard.writeText(email);

      if (status) {
        status.textContent = 'Copied';
        setTimeout(() => {
          status.textContent = 'Copy';
        }, 1600);
      }
    } catch (error) {
      window.location.href = `mailto:${email}`;
    }
  });
}
