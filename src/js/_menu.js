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

export {
  setActiveMobileMenu,
  getClassDevice,
};
