const header = document.querySelector('#siteHeader');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobileNav');
const modal = document.querySelector('#filmModal');
const playButton = document.querySelector('.play-button');
const closeButton = document.querySelector('.modal-close');

const setMenu = (open) => {
  menuButton.classList.toggle('active', open);
  mobileNav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  document.body.classList.toggle('menu-open', open);
};

menuButton.addEventListener('click', () => setMenu(!mobileNav.classList.contains('open')));
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
  observer.observe(element);
});

const setModal = (open) => {
  modal.hidden = !open;
  document.body.classList.toggle('modal-open', open);
  if (open) closeButton.focus();
  else playButton.focus();
};

playButton.addEventListener('click', () => setModal(true));
closeButton.addEventListener('click', () => setModal(false));
modal.addEventListener('click', (event) => {
  if (event.target === modal) setModal(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!modal.hidden) setModal(false);
    else if (mobileNav.classList.contains('open')) setMenu(false);
  }
});

