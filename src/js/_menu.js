function setActiveMobileMenu() {
  const iconMenu = document.querySelector(".icon-menu");
  if (iconMenu) {
    iconMenu.addEventListener("click", () => {
      const menuBody = document.querySelector(".menu__body");
      if (menuBody) {
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("_active");
        menuBody.classList.toggle("_active");
      }
    });
  }
}

function onMenuLinkClick(e) {
  const menuLink = e.target;
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    // eslint-disable-next-line no-restricted-globals
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    });
    e.preventDefault();
  }
}

function addSectionsMoving() {
  const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
  if (menuLinks && menuLinks.length > 0) {
    menuLinks.forEach((link) => {
      link.addEventListener("click", onMenuLinkClick);
    });
  }
}

export {
  setActiveMobileMenu,
  addSectionsMoving,
};
