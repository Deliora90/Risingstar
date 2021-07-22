
function setSelectHandler() {
    const allSelect = document.querySelectorAll('.select');
    if (allSelect.length > 0)
        allSelect.forEach(function (select) {
            let selectBtn = select.querySelector(".select__button");
            let selectList = select.querySelector(".select__list");
            let selectListItem = select.querySelectorAll(".select__item");
            let inputHidden = select.querySelector(".select__input_hidden");

            function removeActiveSelect() {
                if (selectBtn)
                    selectBtn.classList.remove('select__button_active');
                if (selectList)
                    selectList.classList.remove("select__list_visible");
            }

            if (selectBtn) {
                selectBtn.addEventListener("click", function () {
                    if (selectList) {
                        selectBtn.classList.toggle('select__button_active');
                        selectList.classList.toggle("select__list_visible");
                    }
                });
            }

            if (selectListItem.length > 0) {
                selectListItem.forEach((item, index, array) => {
                    item.addEventListener("click", function (e) {
                        e.stopPropagation();
                        if (selectBtn)
                            selectBtn.innerText = this.innerText;
                        if (inputHidden)
                            inputHidden.value = this.dataset.value;
                        selectListItem.forEach((element) => element.classList.remove('select__item_hidden'));
                        this.classList.add('select__item_hidden');
                        removeActiveSelect();
                    });
                });
            }

            document.addEventListener("click", function (e) {
                if (e.target !== selectBtn)
                    removeActiveSelect();
            });

            document.addEventListener("keydown", function (e) {
                if (e.key === "Tab" || e.key === 'Escape')
                    removeActiveSelect();
            });
        });
}


