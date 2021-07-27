import {
  setSelectHandler,
} from "./_select";
import {
  setTabHandler,
  setDefaultValue,
} from "./_tab";

function loadProducts(data) {
  const productsTabs = document.querySelector(".products__tabs");
  if (productsTabs) {
    try {
      let tabsResult = "";

      // Tabs Control
      let tabsControl = "";
      const tabsControlStart = "<div class=\"tabs__control\">";
      const tabsControlEnd = "</div>";
      const tabsListStart = "<ul class=\"tabs__list\">";
      const tabsListEnd = "</ul>";
      const tabsSelectStart = "<div class=\"tabs__select select\"><button type=\"button\" class=\"select__button text\"></button><ul class=\"select__list\">";
      const tabsSelectEnd = "</ul><input type=\"text\" name=\"category\" value=\"\" class=\"select__input select__input_hidden\"></div>";
      let allTabsBtnTemplate = "";
      let allTabsSelectItemTemplate = "";

      // Tabs Content
      let tabsContent = "";
      const tabsContentStart = "<div class=\"tabs__content\">";
      const tabsContentEnd = "</div>";
      let allTabsProduct = "";
      const tabsProductListStart = "<ul class=\"products-list\">";
      const tabsProductListEnd = "</ul>";
      const tabsProductListItemStart = "<li class=\"products-list__item\">";
      const tabsProductListItemEnd = "</li>";

      if (data && data.tabs && data.tabs.length > 0) {
        data.tabs.forEach((tab) => {
          const tabId = tab.id;
          const tabName = tab.name;
          const producList = tab.products;

          // Add to Tabs Control
          const tabsBtnTemplate = ` <li class="tabs__item">
                                                <button class="tabs__btn text" data-value="#${tabId}" type="button">${tabName}</button>
                                            </li>`;
          const tabsSelectItemTemplate = `<li data-value="#${tabId}" class="select__item text">${tabName}</li>`;

          allTabsBtnTemplate += tabsBtnTemplate;
          allTabsSelectItemTemplate += tabsSelectItemTemplate;

          // Add to Tabs Content
          const tabsElementTemplateStart = `<div class="tabs__element product" id="${tabId}">`;
          let productsList = "";
          const tabsElementTemplateEnd = "</div>";

          if (producList && producList.length > 0) {
            producList.forEach((product) => {
              // const productId = product.id;
              const productImg = product.img;
              const productName = product.name;
              const productDescription = product.description;

              const imgTemplate = `<img class="products-list__img" src="img/${productImg}" alt="Product">`;
              const titleTemplate = `<h3 class="products-list__title title title_size_s">${productName}</h3>`;
              const infoTemplate = `<div class="products-list__info">
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

        productsTabs.insertAdjacentHTML("beforeend", tabsResult);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}
async function getProducts() {
  const file = "json/products.json";
  try {
    const response = await fetch(file, {
      method: "GET",
    });
    if (response.ok) {
      const result = await response.json();
      loadProducts(result);
    } else {
      // eslint-disable-next-line no-console
      console.log("Ошибка!");
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  } finally {
    setTabHandler();
    setSelectHandler();
    setDefaultValue();
  }
}
export {
  getProducts,
};
