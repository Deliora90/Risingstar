function setSelectHandler() {
  const allSelect = document.querySelectorAll(".select");
  if (allSelect.length > 0) {
    allSelect.forEach((select) => {
      const selectBtn = select.querySelector(".select__button");
      const selectList = select.querySelector(".select__list");
      const selectListItem = select.querySelectorAll(".select__item");
      const inputHidden = select.querySelector(".select__input_hidden");

      function removeActiveSelect() {
        if (selectBtn) { selectBtn.classList.remove("select__button_active"); }
        if (selectList) { selectList.classList.remove("select__list_visible"); }
      }

      if (selectBtn) {
        selectBtn.addEventListener("click", () => {
          if (selectList) {
            selectBtn.classList.toggle("select__button_active");
            selectList.classList.toggle("select__list_visible");
          }
        });
      }

      if (selectListItem.length > 0) {
        selectListItem.forEach((item) => {
          item.addEventListener("click", function callback(e) {
            e.stopPropagation();
            if (selectBtn) { selectBtn.innerText = this.innerText; }
            if (inputHidden) { inputHidden.value = this.dataset.value; }
            selectListItem.forEach((element) => element.classList.remove("select__item_hidden"));
            this.classList.add("select__item_hidden");
            removeActiveSelect();
          });
        });
      }

      document.addEventListener("click", (e) => {
        if (e.target !== selectBtn) { removeActiveSelect(); }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Tab" || e.key === "Escape") { removeActiveSelect(); }
      });
    });
  }
}
export {
  setSelectHandler,
};
