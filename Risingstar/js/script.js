
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


;
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

;
function loadProducts(data) {
    let productsTabs = document.querySelector(".products__tabs");
    if (productsTabs) {
        try {
            let tabsResult = '';

            //Tabs Control
            let tabsControl = '';
            let tabsControlStart = '<div class="tabs__control">';
            let tabsControlEnd = '</div>';
            let tabsListStart = '<ul class="tabs__list">';
            let tabsListEnd = '</ul>';
            let tabsSelectStart = '<div class="tabs__select select"><button type="button" class="select__button text"></button><ul class="select__list">';
            let tabsSelectEnd = '</ul><input type="text" name="category" value="" class="select__input select__input_hidden"></div>'
            let allTabsBtnTemplate = '';
            let allTabsSelectItemTemplate = '';

            //Tabs Content
            let tabsContent = '';
            let tabsContentStart = '<div class="tabs__content">';
            let tabsContentEnd = '</div>';
            let allTabsProduct = '';
            let tabsProductListStart = '<ul class="products-list">';
            let tabsProductListEnd = '</ul>';
            let tabsProductListItemStart = '<li class="products-list__item">';
            let tabsProductListItemEnd = '</li>';

            if (data && data.tabs && data.tabs.length > 0) {
                data.tabs.forEach(tab => {
                    const tabId = tab.id;
                    const tabName = tab.name;
                    const producList = tab.products;

                    //Add to Tabs Control
                    let tabsBtnTemplate = ` <li class="tabs__item">
                                                <button class="tabs__btn text" data-value="#${tabId}" type="button">${tabName}</button>
                                            </li>`;
                    let tabsSelectItemTemplate = `<li data-value="#${tabId}" class="select__item text">${tabName}</li>`;

                    allTabsBtnTemplate += tabsBtnTemplate;
                    allTabsSelectItemTemplate += tabsSelectItemTemplate;

                    //Add to Tabs Content
                    let tabsElementTemplateStart = `<div class="tabs__element product" id="${tabId}">`;
                    let productsList = '';
                    let tabsElementTemplateEnd = '</div>';

                    if (producList && producList.length > 0) {
                        producList.forEach(product => {
                            const productId = product.id;
                            const productImg = product.img;
                            const productName = product.name;
                            const productDescription = product.description;

                            let imgTemplate = `<img class="products-list__img" src="img/${productImg}" alt="Product">`;
                            let titleTemplate = `<h3 class="products-list__title title title_size_s">${productName}</h3>`;
                            let infoTemplate = `<div class="products-list__info">
                                                    <p class="products-list__text text text_size_s">${productDescription}</p>
                                                    <button class="products-list__btn btn btn_secondary" type="button">Подробнее</button>
                                                </div>`;

                            productsList += tabsProductListItemStart;
                            productsList += imgTemplate + titleTemplate + infoTemplate;
                            productsList += tabsProductListItemEnd;

                        });
                    }

                    allTabsProduct += tabsElementTemplateStart;
                    allTabsProduct += tabsProductListStart;
                    allTabsProduct += productsList;
                    allTabsProduct += tabsProductListEnd;
                    allTabsProduct += tabsElementTemplateEnd;

                });
                tabsControl += tabsControlStart;
                tabsControl += tabsListStart + allTabsBtnTemplate + tabsListEnd;
                tabsControl += tabsSelectStart + allTabsSelectItemTemplate + tabsSelectEnd;
                tabsControl += tabsControlEnd;

                tabsContent += tabsContentStart;
                tabsContent += allTabsProduct;
                tabsContent += tabsContentEnd;

                tabsResult = tabsControl + tabsContent;

                productsTabs.insertAdjacentHTML('beforeend', tabsResult);
            }
        } catch {

        }
    }
}
async function getProducts() {
    const file = "json/products.json";
    try {
        let response = await fetch(file, {
            method: "GET"
        });
        if (response.ok) {
            let result = await response.json();
            loadProducts(result);
        } else {
            alert("Ошибка!");
        }
    } catch {
        alert("Ошибка!");
    } finally {
        setTabHandler();
        setSelectHandler();
        setDefaultValue();
    }
}

getProducts();;
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.Opera() ||
            isMobile.Windows() ||
            isMobile.iOS()
        )
    }
};

function getClassDevice() {
    if (isMobile.any())
        document.body.classList.add('_touch');
    else
        document.body.classList.add('_pc');

}

function setActiveMobileMenu() {
    let iconMenu = document.querySelector(".icon-menu");
    if(iconMenu){
        iconMenu.addEventListener("click", function(e){
            let menuBody = document.querySelector(".menu__body");
            if(menuBody)
            {
                document.body.classList.toggle("_lock");
                iconMenu.classList.toggle("_active");
                menuBody.classList.toggle("_active");
            }
        });
    }
}


setActiveMobileMenu();
;
function loadPublications(data) {
    let publicationsPanelList = document.querySelector(".publications-panel__list");
    if (publicationsPanelList) {
        try {
            const COUNT_PUBLICATION = 3;
            
            let publicationsResult = '';
            if (data && data.publications && data.publications.length > 0) {
                const publications = data.publications.sort((a, b) => new Date(b.date) - new Date(a.date));

                for (let i = 0; i < COUNT_PUBLICATION; i++) {
                    const publication = publications[i];
                    const id = publication.id;
                    const title = publication.title;
                    const subtitle = publication.subtitle;
                    const date = publication.date ? new Date(publication.date) : "";
                    const dateDesc = getDate(date);
                    const img_path = publication.img_path;
                
                    let articleTemplate = `<article class="publication__item">
                                                <img src="img/${img_path}" alt="Publication Image" class="publication__img">
                                                <div class="publication__container">
                                                    <h3 class="publication__title title title_size_m">${title}</h3>
                                                    <p class="publication__text text">${subtitle}</p>
                                                    <div class="publication__footer">
                                                        <time class="publication__date" datetime="${date}">${dateDesc}</time>
                                                        <a class="publication__link _icon-next link link_size_s"></a>
                                                    </div>
                                                </div>
                                            </article>`;
                    publicationsResult += articleTemplate;
                }
                publicationsPanelList.insertAdjacentHTML('beforeend', publicationsResult);
            }
        } catch {
            alert("Ошибка!");
        }
    }

}

async function getPublications() {
    const file = "json/publications.json";
    try {
        let response = await fetch(file, {
            method: "GET"
        });
        if (response.ok) {
            let result = await response.json();
            loadPublications(result);
        } else {
            alert("Ошибка!");
        }
    } catch {
        alert("Ошибка!");
    }
}

getPublications();;

const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

function formateDate(date) {
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}

function getDate(date) {
    return date ? formateDate(date) : "";
}






// function go(){
//     document.location = "product.html?id=product-omega3";
// }