/* ── week.js ── */

const footerLeft = document.getElementById('footer-left');
const titleEl    = document.getElementById('section-title');
const descEl     = document.getElementById('section-desc');
const sections   = window.SECTIONS || [];

let currentIndex = 0;

/* ── Claude: Update footer text ── */
function updateFooter(index) {
  if (index === currentIndex && titleEl.textContent === sections[index]?.title) return;
  currentIndex = index;

  footerLeft.classList.add('fading');
  setTimeout(() => {
    titleEl.textContent = sections[index].title;
    descEl.textContent  = sections[index].desc;
    footerLeft.classList.remove('fading');
  }, 250);
}

/* ── Claude: IntersectionObserver watches each section ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = sections.findIndex(s => s.id === entry.target.id);
      if (index !== -1) updateFooter(index);
    }
  });
}, {
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
});

sections.forEach(s => {
  const el = document.getElementById(s.id);
  if (el) observer.observe(el);
});

/* ── Auto-resize iframes to fit their content ── */
document.querySelectorAll('.project-frame').forEach(frame => {
  frame.addEventListener('load', () => {
    try {
      const doc = frame.contentDocument || frame.contentWindow.document;
      if (doc && doc.body) {
        frame.style.height = doc.body.scrollHeight + 'px';
      }
    } catch(e) {}
    setTimeout(() => {
      try {
        const doc = frame.contentDocument || frame.contentWindow.document;
        if (doc && doc.body) frame.style.height = doc.body.scrollHeight + 'px';
      } catch(e) {}
    }, 400);
  });
});

document.querySelectorAll('.project-frame').forEach(frame => {
  if (frame.style.height) return;

  frame.addEventListener('load', () => {
    try {
      const doc = frame.contentDocument || frame.contentWindow.document;
      if (doc && doc.body) {
        frame.style.height = doc.body.scrollHeight + 'px';
      }
    } catch(e) {}
    setTimeout(() => {
      try {
        const doc = frame.contentDocument || frame.contentWindow.document;
        if (doc && doc.body) frame.style.height = doc.body.scrollHeight + 'px';
      } catch(e) {}
    }, 400);
  });
});