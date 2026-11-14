'use strict';
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-menu');
const closeMenu = () => {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Open navigation menu');
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
};
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    mobileNav.hidden = isOpen;
    document.body.classList.toggle('menu-open', !isOpen);
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click',closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 950) closeMenu(); });
}
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const revealNodes = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry¶»§q«^