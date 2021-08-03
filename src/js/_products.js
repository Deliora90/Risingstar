import {
  setSelectHandler,
} from "./_select";
import {
  setTabHandler,
  setDefaultValue,
} from "./_tab";
import { getUniqList } from "./_utils";
import Swiper from "./swiper-bundle.min";

// Tabs with products
function loadTabsProducts(tabs, products) {
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
      const tabsProductListItemStart = "<li class=\"products-list__item\"><div class=\"products-list__container\">";
      const tabsProductListItemEnd = "</div></li>";

      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          const tabId = tab.id;
          const tabName = tab.name;
          const producListId = tab.products;

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

          if (producListId && producListId.length > 0) {
            producListId.forEach((productId) => {
              const product = products.find((item) => item.id === productId);
              if (product) {
                const productImg = product.img;
                const productName = product.name;
                const productDescription = product.description;

                const imgTemplate = `<img class="products-list__img" src="img/${productImg}" alt="Product">`;
                const titleTemplate = `<h3 class="products-list__title title title_size_s">${productName}</h3>`;
                const infoTemplate = `<div class="products-list__info">
                                      <p class="products-list__text text text_size_s">${productDescription}</p>
                                      <a class="products-list__btn btn btn_secondary" href="product.html?id=${productId}">Подробнее</a>
                                    </div>`;

                productsList += tabsProductListItemStart;
                productsList += imgTemplate + titleTemplate + infoTemplate;
                productsList += tabsProductListItemEnd;
              }
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
// Slider with products
function addSlider() {
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(".product-slider__container", {
    navigation: {
      nextEl: "._icon-arrow-right",
      prevEl: "._icon-arrow-left",
      disabledClass: "product-slider__arrow_disabled",
    },
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    mousewheel: {
      sensitivity: 1,
    },
    slidesPerView: 5,
    watchOverflow: true,

  });
}
function loadSliderProducts(products) {
  const productsPanel = document.querySelector(".product-panel");
  if (productsPanel) {
    try {
      let sliderContent = "";
      if (products.length > 0) {
        const productSliderStart = "<div class=\"product-panel__slider product-slider\"><div class=\"product-slider__container swiper-container _container\"><div class=\"swiper-wrapper product-slider__wrapper\">";
        const productSliderEnd = "</div><div class=\"product-slider__arrow product-slider__arrow_left _icon-arrow-left\"></div><div class=\"product-slider__arrow product-slider__arrow_right _icon-arrow-right\"></div></div></div>";
        const productContentStart = " <div class=\"swiper-slide product-slider__slide\"><div class=\"product-slider__content\">";
        const productContentEnd = "</div></div>";
        let productContent = "";
        products.forEach((product) => {
          const productId = product.id;
          const productImg = product.img;
          const productName = product.name;
          const image = `<a href="product.html?id=${productId}"><img class="product-slider__image" src="img/${productImg}" alt="Product">`;
          const label = `<p class="product-slider__label">${productName}</p></a>`;
          productContent += productContentStart + image + label + productContentEnd;
        });
        sliderContent = productSliderStart + productContent + productSliderEnd;
        // sliderContent = loadSliderProducts(products);
        productsPanel.insertAdjacentHTML("afterbegin", sliderContent);
        addSlider();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}
// Panel About Product
function loadAboutProductImg(img) {
  return `<div class="about-product__img-container">
            <img src="img/${img}" alt="About-product" class="about-product__img">
          </div>`;
}
function loadAboutProductTitle(name) {
  return `<div class="about-product__title">
            <h2 class=" title title_size_xl">${name}</h2>
          </div>`;
}
function getTexts(texts) {
  let result = "";
  if (texts && texts.length > 0) result = texts.reduce((prev, text) => `${prev}<p class="text">${text}</p>`, [""]);
  return result;
}
function getList(list) {
  let result = "";
  let listItems = "";
  const listStart = "<ul class=\"list\">";
  const listEnd = "</ul>";
  if (list && list.length > 0) listItems = list.reduce((prev, item) => `${prev}<li class="list__item">${item}</li>`, [""]);
  result = listStart + listItems + listEnd;
  return result;
}
function getContentAboutProductTab(content) {
  let result = "";
  try {
    if (content && content.length > 0) {
      content.forEach((item) => {
        const { items, type } = item;
        switch (type) {
          case "text":
            result += getTexts(items);
            break;
          case "list":
            result += getList(items);
            break;
          default:
            result = "";
            break;
        }
      });
    }
    return result;
  } catch (err) {
    console.log(err);
    return result;
  }
}
function loadAboutProductTab(about) {
  let tabsResult = "";
  const aboutProductTabStart = "<div class=\"about-product__tab tabs\">";
  const aboutProductTabEnd = "</div>";

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
  let allTabsAbout = "";

  try {
    if (about && about.length > 0) {
      about.forEach((element) => {
        const { title, content, id } = element;

        // Add to Tabs Control
        const tabsBtnTemplate = `<li class="tabs__item">
                                  <button class="tabs__btn text" data-value="#${id}" type="button">${title}</button>
                                </li>`;
        const tabsSelectItemTemplate = `<li data-value="#${id}" class="select__item text">${title}</li>`;
        allTabsBtnTemplate += tabsBtnTemplate;
        allTabsSelectItemTemplate += tabsSelectItemTemplate;

        // Add to Tabs Content
        const tabsElementTemplateStart = `<div class="tabs__element" id="${id}">`;
        const contentAboutProdust = getContentAboutProductTab(content);
        const tabsElementTemplateEnd = "</div>";

        allTabsAbout += tabsElementTemplateStart;
        allTabsAbout += contentAboutProdust;
        allTabsAbout += tabsElementTemplateEnd;
      });
      tabsControl += tabsControlStart;
      tabsControl += tabsListStart + allTabsBtnTemplate + tabsListEnd;
      tabsControl += tabsSelectStart + allTabsSelectItemTemplate + tabsSelectEnd;
      tabsControl += tabsControlEnd;

      tabsContent += tabsContentStart;
      tabsContent += allTabsAbout;
      tabsContent += tabsContentEnd;
      tabsResult = aboutProductTabStart + tabsControl + tabsContent + aboutProductTabEnd;
    }
    return tabsResult;
  } catch (err) {
    console.log(err);
    return tabsResult;
  }
}
function loadAboutProductProperties(properties) {
  let result = "";
  try {
    if (properties && properties.length > 0) {
      const propertiesStart = "<ul class=\"about-product__properties product-properties\">";
      const propertiesEnd = "</ul>";
      const propertiesResult = properties.reduce((prev, property) => {
        const { description, img, label } = property;
        return `${prev}<li class="product-properties__item">
                    <div class="product-properties__img-container">
                        <img src="img/${img}" alt="Product-properties" class="product-properties__img">
                    </div>
                    <div class="product-properties__info">
                        <p class="product-properties__label text text_size_l">${label}</p>
                        <p class="product-properties__description text text_size_l">${description}</p>
                    </div>
                </li>`;
      }, "");
      result = propertiesStart + propertiesResult + propertiesEnd;
    }
    return result;
  } catch (err) {
    console.log(err);
    return result;
  }
}
function loadAboutProductControl() {
  return `<div class="about-product__control">
            <button class="about-product__btn btn">
               Купить у партнеров
            </button>
            <a class="about-product__link link link_size_m _icon-come-back">
            </a>
          </div>`;
}
function loadAboutProductLinks(links) {
  console.log("Links", links);
  return "";
}
function loadAboutProductFooter(properties, links) {
  let result = "";
  try {
    let footerContent = "";
    const footerStart = "<div class=\"about-product__footer\">";
    const footerEnd = "</div>";
    footerContent += loadAboutProductProperties(properties);
    footerContent += loadAboutProductControl();
    footerContent += loadAboutProductLinks(links);

    result = footerStart + footerContent + footerEnd;
    return result;
  } catch (err) {
    console.log(err);
    return result;
  }
}
function loadAboutProduct(product) {
  console.log(product);
  const aboutProductPanel = document.querySelector(".about-product");
  let aboutProduct = "";
  try {
    if (aboutProductPanel && product) {
      const {
        name,
        img,
        about,
        properties,
        links,
      } = product;
      const aboutProdustImg = loadAboutProductImg(img);
      const aboutProductTitle = loadAboutProductTitle(name);
      const aboutProdustTabs = loadAboutProductTab(about);
      const aboutProductFooter = loadAboutProductFooter(properties, links);
      aboutProduct = aboutProdustImg + aboutProductTitle + aboutProdustTabs + aboutProductFooter;
      aboutProductPanel.insertAdjacentHTML("beforeend", aboutProduct);
    }
  } catch (err) {
    console.log(err);
  }
}

// Work with products
function getTabs(data) {
  let result = [];
  try {
    if (data && data.tabs && data.tabs.length > 0) {
      result = data.tabs;
    }
    return result;
  } catch (err) {
    console.log(err);
    return result;
  }
}
function getProducts(data) {
  let allProductResult = [];
  try {
    if (data && data.products && data.products.length > 0) {
      allProductResult = getUniqList(data.products, "id");
    }
    return allProductResult;
  } catch (err) {
    console.log(err);
    return allProductResult;
  }
}
function getProduct(products) {
  let product = null;
  try {
    const paramValue = window.location.href.split("?")[1].split("=")[1];
    if (products.length > 0) {
      product = products.find((item) => item.id === paramValue);
    }
    return product;
  } catch (err) {
    console.log(err);
    return product;
  }
}

async function getData() {
  const file = "json/products.json";
  try {
    const response = await fetch(file, {
      method: "GET",
    });
    if (response.ok) {
      const result = await response.json();
      const tabs = getTabs(result);
      const products = getProducts(result);
      const product = getProduct(products);
      loadTabsProducts(tabs, products);
      loadSliderProducts(products);
      loadAboutProduct(product);
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
  getData,
};
