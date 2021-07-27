import {
  getDate,
} from "./_utils";

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
          // const id = publication.id;
          const titlePublication = publication.title;
          const subtitlePublication = publication.subtitle;
          const date = publication.date ? new Date(publication.date) : "";
          const dateDesc = getDate(date);
          const imgPath = publication.img_path;
          const articleTemplate = `<article class="publication__item">
                                                <img src="img/${imgPath}" alt="Publication Image" class="publication__img">
                                                <div class="publication__container">
                                                    <h3 class="publication__title title title_size_m">${titlePublication}</h3>
                                                    <p class="publication__text text">${subtitlePublication}</p>
                                                    <div class="publication__footer">
                                                        <time class="publication__date" datetime="${date}">${dateDesc}</time>
                                                        <a class="publication__link _icon-next link link_size_s"></a>
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

async function getPublications() {
  const file = "json/publications.json";
  try {
    const response = await fetch(file, {
      method: "GET",
    });
    if (response.ok) {
      const result = await response.json();
      loadPublications(result);
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
