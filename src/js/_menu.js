const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () => (
    isMobile.Android()
    || isMobile.BlackBerry()
    || isMobile.Opera()
    || isMobile.Windows()
    || isMobile.iOS()
  ),
};

function getClassDevice() {
  if (isMobile.any()) { document.body.classList.add("_touch"); } else document.body.classList.add("_pc");
}

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
  getClassDevice,
  addSectionsMoving,
};
