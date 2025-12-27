// Load header and footer components
async function loadComponents() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (headerPlaceholder) {
    try {
      const response = await fetch('/components/header.html');
      const html = await response.text();
      headerPlaceholder.outerHTML = html;
      initMobileMenu();
    } catch (e) {
      console.error('Failed to load header:', e);
    }
  }

  if (footerPlaceholder) {
    try {
      const response = await fetch('/components/footer.html');
      const html = await response.text();
      footerPlaceholder.outerHTML = html;
    } catch (e) {
      console.error('Failed to load footer:', e);
    }
  }
}

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
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', loadComponents);
