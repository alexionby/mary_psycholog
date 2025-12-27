(() => {
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
})();
