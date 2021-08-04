const timeout = 500;
let unlock = true;

function bodyBlock() {
  const body = document.querySelector("body");
  const lockPaddingValue = `${window.innerWidth - document.querySelector(".wrapper").offsetWidth}px`;
  if (body) {
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }
}
function bodyUnblock() {
  const body = document.querySelector("body");
  if (body) {
    setTimeout(() => {
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
    }, timeout);
  }
}
function modalClose(currentModal, doBlock = true) {
  if (unlock && currentModal) {
    currentModal.classList.remove("modal_active");
    if (doBlock) {
      bodyUnblock();
    }
  }
}
function modalOpen(currentModal) {
  if (currentModal && unlock) {
    const modalActive = document.querySelector(".modal_active");
    if (modalActive) {
      modalClose(modalActive, false);
    } else {
      bodyBlock();
    }
    currentModal.classList.add("modal_active");
    currentModal.addEventListener("click", (e) => {
      if (!e.target.closest(".modal__content")) {
        modalClose(e.target.closest(".modal"));
      }
    });
  }
}
function activeModal() {
  const modalLinks = document.querySelectorAll(".modal-link");
  const close = document.querySelectorAll(".close-modal");

  if (modalLinks && modalLinks.length > 0) {
    modalLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const modalName = link.getAttribute("href").replace("#", "");
        const currentModal = document.getElementById(modalName);
        modalOpen(currentModal);
        e.preventDefault();
      });
    });
  }
  if (close && close.length > 0) {
    close.forEach((closeIcon) => {
      closeIcon.addEventListener("click", (e) => {
        modalClose(closeIcon.closest(".modal"));
        e.preventDefault();
      });
    });
  }
}

export {
  activeModal,
};
