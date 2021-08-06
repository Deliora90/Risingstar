import {
  getDate,
} from "./_utils";

function getPublication(data) {
  let publication = null;
  const { publications } = data;
  try {
    const paramValue = window.location.href.split("?")[1].split("=")[1];
    if (publications.length > 0 && paramValue) {
      publication = publications.find((item) => String(item.id) === paramValue);
    }
    return publication;
  } catch (err) {
    console.log(err);
    return publication;
  }
}
function loadPublications(data) {
  const publicationsPanelList = document.querySelector(".publications-panel__list");
  if (publicationsPanelList) {
    try {
      const COUNT_PUBLICATION = 3;
      let publicationsResult = "";
      if (data && data.publications && data.publications.length > 0) {
        const publications = data.publications.sort((a, b) => new Date(b.date) - new Date(a.date));

        for (let i = 0; i < COUNT_PUBLICATION; i += 1) {
          const publication = publications[i];
          const { id, title, subtitle } = publication;
          const date = publication.date ? new Date(publication.date) : "";
          const dateDesc = getDate(date);
          const imgPath = publication.img_path;
          const articleTemplate = `<article class="publication__item">
                                                <img src="${imgPath}" alt="Publication Image" class="publication__img">
                                                <div class="publication__container">
                                                    <h3 class="publication__title title title_size_m">${title}</h3>
                                                    <p class="publication__text text">${subtitle}</p>
                                                    <div class="publication__footer">
                                                        <time class="publication__date" datetime="${date}">${dateDesc}</time>
                                                        <a class="publication__link _icon-next link link_size_s" href="publication.html?id=${id}"></a>
                                                    </div>
                                                </div>
                                            </article>`;
          publicationsResult += articleTemplate;
        }
        publicationsPanelList.insertAdjacentHTML("beforeend", publicationsResult);
      }
    } catch (err) {
      alert("Ошибка!");
    }
  }
}
function loadPublicationPage(publication) {
  const publicationPage = document.querySelector(".publication-page");
  let result = "";
  try {
    if (publicationPage && publication) {
      const { title, text } = publication;
      const img = publication.img_path;
      const datePublication = publication.date ? new Date(publication.date) : "";
      const dateDesc = getDate(datePublication);
      result = `<div class="publication-page__container _container">
                  <h1 class="publication-page__title title">${title}</h1>
                  <img src="${img}" alt="Publication" class="publication-page__img">
                  <time class="publication-page__date" datetime="${datePublication}">${dateDesc}</time>
                  <p class="publication-page__text text text_size_xl">${text}</p>
              </div>`;
      publicationPage.insertAdjacentHTML("afterbegin", result);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getPublications() {
  const file = "json/publications.json";
  try {
    const response = await fetch(file, {
      method: "GET",
    });
    if (response.ok) {
      const result = await response.json();
      const publication = getPublication(result);
      loadPublications(result);
      loadPublicationPage(publication);
    } else {
      alert("Ошибка!");
    }
  } catch (err) {
    alert("Ошибка!");
  }
}
export {
  getPublications,
};
