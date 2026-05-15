const eyes      = document.querySelector('.eyes-icon');
const page1     = document.getElementById('page1');
const page2     = document.getElementById('page2');
const enterText = document.querySelector('.enter-text');

/* ── Eye tracking ── */
let curX = 0, curY = 0;
let tgtX = 0, tgtY = 0;

const MAX    = 40;
const EASE   = 0.2;
const OFFSET_X = -1.5;
const OFFSET_Y = -35;

document.addEventListener('mousemove', (e) => {
  tgtX = (e.clientX / window.innerWidth  - 0.5) * 2 * MAX;
  tgtY = (e.clientY / window.innerHeight - 0.5) * 2 * MAX;
});

function animateEyes() {
  curX += (tgtX - curX) * EASE;
  curY += (tgtY - curY) * EASE;
  eyes.style.transform = `translate(calc(${OFFSET_X}% + ${curX}px), calc(${OFFSET_Y}% + ${curY}px))`;
  requestAnimationFrame(animateEyes);
}

animateEyes();


/* ── Scroll zoom transition → library.html ── */
let progress    = 0;
let targetProg  = 0;
let scrolling   = false;
let scrollTimer = null;
let navigated   = false;           // prevent double navigation

const ZOOM_MAX   = 1.6;
const SNAP_SPEED = 0.12;

function applyProgress(p) {
  const scale = 1 + (ZOOM_MAX - 1) * p;
  page1.style.transform = `scale(${scale})`;
  page1.style.opacity   = p >= 0.99 ? 0 : 1;

  enterText.style.opacity = Math.max(0, 1 - p * 3);

  // Show brief flash of page2 (library preview colour) before navigating
  page2.style.opacity       = p >= 0.99 ? 1 : 0;
  page2.style.pointerEvents = p >= 0.99 ? 'all' : 'none';

  // Navigate to library once fully zoomed in
  if (p >= 0.999 && !navigated) {
    navigated = true;
    setTimeout(() => { window.location.href = 'library.html'; }, 80);
  }
}

function loop() {
  if (!scrolling) {
    if (targetProg > 0.95) {
      targetProg += (1 - targetProg) * 0.15;
    }
  }

  progress += (targetProg - progress) * SNAP_SPEED;
  applyProgress(progress);
  requestAnimationFrame(loop);
}

loop();

// Mouse wheel — each tick nudges, ~8 ticks to reach end
window.addEventListener('wheel', (e) => {
  targetProg = Math.min(1, Math.max(0, targetProg + (e.deltaY > 0 ? 0.06 : -0.06)));

  scrolling = true;
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => { scrolling = false; }, 300);
}, { passive: true });

// Touch swipe
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const delta = touchStartY - e.changedTouches[0].clientY;
  if (delta > 40)       targetProg = Math.min(1, targetProg + 0.2);
  else if (delta < -40) targetProg = Math.max(0, targetProg - 0.2);
}, { passive: true });