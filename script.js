/* ═══════════════════════════════════════
   ENKORE ENGINEERING — script.js
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR SCROLL EFFECT ── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ── 2. SMOOTH SCROLL — "Get a Quote" button ── */
  const navCta = document.getElementById('navCta');
  if (navCta) {
    navCta.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }


  /* ── 3. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach((el, i) => {
    // Stagger cards inside the services grid
    if (el.closest('.services-grid')) {
      el.style.transitionDelay = `${i * 0.08}s`;
    }
    revealObserver.observe(el);
  });


  /* ── 4. ACTIVE NAV LINK HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, {
    threshold: 0.4,
  });

  sections.forEach((section) => sectionObserver.observe(section));


  /* ── 5. CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmit');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name  = document.getElementById('fname').value.trim();
      const email = document.getElementById('femail').value.trim();

      // Basic validation
      if (!name || !email) {
        shakeField(!name ? 'fname' : 'femail');
        return;
      }

      if (!isValidEmail(email)) {
        shakeField('femail');
        return;
      }

      // Simulate submission
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.classList.add('success');

        setTimeout(() => {
          submitBtn.textContent = 'Send Inquiry →';
          submitBtn.classList.remove('success');
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }, 900);
    });
  }


  /* ── HELPERS ── */

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeField(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#ff6b6b';
    el.style.animation = 'none';
    // Force reflow
    void el.offsetWidth;
    el.style.animation = 'shake 0.35s ease';
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.animation = '';
    }, 700);
  }

});


/* ── SHAKE KEYFRAME (injected via JS to keep CSS clean) ── */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%   { transform: translateX(0); }
    20%  { transform: translateX(-6px); }
    40%  { transform: translateX(6px); }
    60%  { transform: translateX(-4px); }
    80%  { transform: translateX(4px); }
    100% { transform: translateX(0); }
  }
`;
document.head.appendChild(shakeStyle);
