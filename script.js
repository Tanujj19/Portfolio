// ==========================================================================
// Tanuj A J - Interactive Portfolio Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initProjectFilters();
  initScrollAnimations();
  initCopyEmail();
  initContactForm();
  initScrollTop();
});

/* -------------------------------------------------------------------------- */
/* 1. Header & Navigation Logic                                              */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Link Highlighting
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Drawer Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav item
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close when clicking outside menu
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Dynamic Typing Text Rotator                                             */
/* -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    "Full-Stack Web Applications",
    "Multi-Agent AI Systems",
    "Data-Driven AI/ML Solutions",
    "Scalable REST APIs & WebGL Apps"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before typing next word
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/* -------------------------------------------------------------------------- */
/* 3. Project Filter Tabs                                                     */
/* -------------------------------------------------------------------------- */
function initProjectFilters() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Intersection Observer Scroll Reveal                                      */
/* -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in, .skill-category-card, .project-card, .timeline-item, .cert-card, .info-box');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Copy Email to Clipboard + Toast Notification                            */
/* -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('heroCopyEmailBtn');
  const toast = document.getElementById('toast');
  const email = "ajtanuj19@gmail.com";

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email address copied to clipboard!");
      }).catch(err => {
        showToast("Email: ajtanuj19@gmail.com");
      });
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* -------------------------------------------------------------------------- */
/* 6. Contact Form Simulation                                                 */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('formName');
    const name = nameInput ? nameInput.value.trim() : "there";
    
    showToast(`Thank you ${name}! Message prepared.`);
    form.reset();
  });
}

/* -------------------------------------------------------------------------- */
/* 7. Scroll to Top Button                                                   */
/* -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
