const header = document.getElementById('header');
const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('globalNav');

function updateHeader(){
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeader);
updateHeader();

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  header.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('[data-img]').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.img;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if(event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if(event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});
