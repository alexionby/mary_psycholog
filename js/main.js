// Initialize mobile menu
function initMobileMenu() {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-close");

  if (!burger || !mobileMenu) {
    return;
  }

  function openMenu() {
    document.body.classList.add("menu-open");
    burger.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
  }

  burger.addEventListener("click", () => {
    if (document.body.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // Close menu when clicking on a link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
}

// Initialize active navigation state
function initNavActiveState() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath ||
        (currentPath === '/' && href === '/') ||
        (currentPath.startsWith('/services') && href === '/services/') ||
        (currentPath.startsWith('/blog') && href === '/blog/')) {
      link.style.color = 'var(--color-text)';
    }
  });
}

// Scroll-triggered reveal animations
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.section, .card, .help-column, .education-item, .platform-link');

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for cards in a grid
        const parent = entry.target.parentElement;
        if (parent && parent.classList.contains('card-grid')) {
          const siblings = Array.from(parent.children);
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.1}s`;
        }

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

// Header scroll effect - adds shadow on scroll
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      header.style.background = 'rgba(250, 247, 242, 0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(250, 247, 242, 0.85)';
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Add loading="lazy" to images that don't have it
function initLazyImages() {
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
}

// Parallax effect for hero background text (subtle)
function initParallax() {
  const heroBgText = document.querySelector('.hero-bg-text');
  if (!heroBgText) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroBgText.style.transform = `translateY(${rate}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Initialize all animations and interactions
function initAnimations() {
  initRevealAnimations();
  initHeaderScroll();
  initSmoothScroll();
  initLazyImages();
  initParallax();
}

// GA4 event tracking
function initAnalytics() {
  if (typeof gtag !== 'function') return;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';

    // Track outbound clicks: Telegram, Instagram, B17
    if (href.includes('t.me/')) {
      gtag('event', 'contact_click', { method: 'telegram' });
    } else if (href.includes('instagram.com/')) {
      gtag('event', 'contact_click', { method: 'instagram' });
    } else if (href.includes('b17.ru/')) {
      gtag('event', 'contact_click', { method: 'b17' });
    }

    // Track "Записаться" button clicks
    if (link.classList.contains('header-cta') || link.classList.contains('mobile-cta') || link.classList.contains('circle-button')) {
      gtag('event', 'cta_click', { location: link.classList.contains('header-cta') ? 'header' : link.classList.contains('mobile-cta') ? 'mobile_menu' : 'page_body' });
    }
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavActiveState();
  initAnimations();
  initAnalytics();
});

// Run reveal animations after page fully loaded (for images, etc.)
window.addEventListener('load', () => {
  // Ensure all reveal elements are checked again
  setTimeout(initRevealAnimations, 100);
});
