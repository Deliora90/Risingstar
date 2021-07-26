@@include('_select.js');
@@include('_tab.js');
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

getProducts();