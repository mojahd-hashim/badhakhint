/* ===== BADHAKH — main.js ===== */

// ── Loader ──────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

// ── Custom Cursor ────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor && follower) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top  = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

// ── Navbar scroll ────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── Hamburger ────────────────────────────────────────────
function toggleMenu() {
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!ham || !nav) return;
  ham.classList.toggle('open');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

// ── Scroll reveal ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) { el.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Counter animation ─────────────────────────────────────
function animateCounter(el, target) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.round(current);
  }, 25);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count));
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ── Portfolio filter ──────────────────────────────────────
function filterPortfolio(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const itemCat = item.dataset.cat;
    const show = cat === 'all' || itemCat === cat;
    item.style.opacity = show ? '1' : '0.15';
    item.style.transform = show ? 'scale(1)' : 'scale(0.97)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
}

// ── Modal ─────────────────────────────────────────────────
function openModal() {
  const m = document.getElementById('serviceModal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal() {
  const m = document.getElementById('serviceModal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('click', e => {
  if (e.target.id === 'serviceModal') closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── Form submit ───────────────────────────────────────────
function submitForm(e) {
  if (e && e.preventDefault) e.preventDefault();
  closeModal();
  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
}

// ── Smooth parallax on hero ───────────────────────────────
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.25}px)`;
  });
}

// ── Active nav link ───────────────────────────────────────
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPath) link.classList.add('active');
  else link.classList.remove('active');
});
