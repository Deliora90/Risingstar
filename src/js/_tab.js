function setTabHandler() {
    const allTabs = document.querySelectorAll('.tabs');
    allTabs.forEach(function (tab) {
        let tabBtns = tab.querySelectorAll('.tabs__btn');
        let tabs = tab.querySelectorAll('.tabs__element');
        let tabsSelect = tab.querySelectorAll('.select__item');
        function showTab(currentTab) {
            if (currentTab) {
                tabs.forEach(tab => {
                    tab.classList.remove('tabs__element_active');
                });
                currentTab.classList.add("tabs__element_active");
            }
        }
        function setActiveTab(element, typeElement) {
            let currentElement = element;
            let tabId = currentElement.getAttribute("data-value");
            let curTab = tab.querySelector(tabId);

            if (typeElement === 'tabs_button') {
                if (!currentElement.classList.contains("tabs__btn_active")) {
                    showTab(curTab);
                    tabBtns.forEach(item => {
                        item.classList.remove("tabs__btn_active");
                    });
                    currentElement.classList.add("tabs__btn_active");
                }
            } else if (typeElement === 'select') {
                showTab(curTab);
            }
        }
        if (tabBtns.length > 0) {
            tabBtns.forEach(btn => {
                btn.addEventListener("click", function () {
                    setActiveTab(btn, 'tabs_button')
                });
            });
        }
        if (tabsSelect.length > 0) {
            tabsSelect.forEach(selectElement => {
                selectElement.addEventListener('click', function () {
                    setActiveTab(selectElement, 'select')
                });
            });
        }
    });
}
function setDefaultValue() {
    const allTabs = document.querySelectorAll('.tabs');
    if (allTabs.length > 0) {
        allTabs.forEach(tab => {
            let firtsValueTab = tab.querySelector(".tabs__btn");
            let firstValueSelect = tab.querySelector(".select__item");
            if (firtsValueTab)
                firtsValueTab.click();
            if (firstValueSelect)
                firstValueSelect.click();
        });
    }
}

