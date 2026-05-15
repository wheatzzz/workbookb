/* ── library.js ── */

const BOOKS = [
  { id: 'book-week4', color: '#C8E6C9' },
  { id: 'book-week5', color: '#BBDEFB' },
  { id: 'book-week6', color: '#FFE0B2' },
  { id: 'book-week7', color: '#F8BBD0' },
  { id: 'book-week8', color: '#E1BEE7' },
  { id: 'book-week9', color: '#B2EBF2' },
  { id: 'book-a1', color: '#f5efe6' },
];

const BOOK_W = 200;
const BOOK_H = 200; // includes label area
const SPEED_RANGE = [0.9, 1.8]; // px per frame

const state = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function initBooks() {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const margin = 20;
  const usableW = W - BOOK_W - margin * 2;
  const usableH = H - BOOK_H - margin * 2;

  BOOKS.forEach((cfg, i) => {
    const el = document.getElementById(cfg.id);
    if (!el) return;

    // Inject fallback block if img src missing / broken
    const img = el.querySelector('img');
    if (img) {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        if (!el.querySelector('.book-fallback')) {
          const fb = document.createElement('div');
          fb.className = 'book-fallback';
          fb.style.setProperty('--col', cfg.color);
          fb.style.background = cfg.color;
          fb.textContent = (i + 4).toString(); // "4" through "9"
          el.insertBefore(fb, el.querySelector('.book-label'));
        }
      });
    }

    // Random start position (no overlap attempt — simple scatter)
    const x = margin + rand(0, usableW);
    const y = margin + rand(0, usableH);

    // Random velocity
    const speed = rand(...SPEED_RANGE);
    const angle = rand(0, Math.PI * 2);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    // Place immediately
    el.style.left = '0px';
    el.style.top  = '0px';
    el.style.transform = `translate(${x}px, ${y}px)`;

    state.push({ el, x, y, vx, vy, W, H });

    // Navigate on click
    el.addEventListener('click', () => {
      const href = el.dataset.href;
      if (href) window.location.href = href;
    });
  });
}

function bounce() {
  const W = window.innerWidth;
  const H = window.innerHeight;

  state.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;

    // Bounce off walls
    const TOP_BOUND = 90; // clears the header text
    if (s.x < 0) { s.x = 0; s.vx = Math.abs(s.vx); }
    if (s.y < TOP_BOUND) { s.y = TOP_BOUND; s.vy = Math.abs(s.vy); }
    if (s.x > W - BOOK_W) { s.x = W - BOOK_W; s.vx = -Math.abs(s.vx); }
    if (s.y > H - BOOK_H) { s.y = H - BOOK_H; s.vy = -Math.abs(s.vy); }

    s.el.style.transform = `translate(${s.x}px, ${s.y}px)`;
  });

  requestAnimationFrame(bounce);
}

// Pause bounce when hovering so user can click easily
document.querySelectorAll('.book').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const s = state.find(s => s.el === el);
    if (s) { s._frozen = true; s._svx = s.vx; s._svy = s.vy; s.vx = 0; s.vy = 0; }
  });
  el.addEventListener('mouseleave', () => {
    const s = state.find(s => s.el === el);
    if (s && s._frozen) { s.vx = s._svx; s.vy = s._svy; s._frozen = false; }
  });
});

initBooks();
requestAnimationFrame(bounce);