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

getPublications();