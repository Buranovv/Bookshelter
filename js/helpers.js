export function getElement(element, parent = document) {
  return parent.querySelector(element);
}

const template = getElement("#template");

export function renderFn(data, parent) {
  parent.innerHTML = null;
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const newCard = template.content.cloneNode(true);
    const cardImg = getElement("#card-img", newCard);
    const cardTitle = getElement(".card-title", newCard);
    const writer = getElement(".writer", newCard);
    const year = getElement(".year", newCard);
    const read = getElement(".read", newCard);
    const more = getElement(".more", newCard);
    const bookmarkBtn = getElement(".bookmark-btn", newCard);

    more.dataset.id = element.id;
    bookmarkBtn.dataset.id = element.id;

    cardImg.src = element.volumeInfo.imageLinks.thumbnail;
    cardTitle.textContent = element.volumeInfo.title;
    writer.textContent = element.volumeInfo.authors;
    year.textContent = element.volumeInfo.publishedDate;
    if (read) {
      read.href = element.volumeInfo.previewLink;
      read.target = "_blank";
    }
    fragment.appendChild(newCard);
  });
  parent.appendChild(fragment);
}
