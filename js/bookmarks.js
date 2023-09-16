import { getElement } from "./helpers.js";

const bookmarksTemplate = getElement("#bookmarks-template");
const bookmarksCards = getElement(".bookmarks__cards");
const modalTitle = getElement(".modal-title");
const modalImg = getElement(".modal-img");
const modalAuthor = getElement(".author");
const modalAuthor2 = getElement(".author2");
const modalPublished = getElement(".published");
const modalText = getElement(".modal-text");
const modalPublisher = getElement(".publisher");
const modalCategories = getElement(".categories");
const modalPageCount = getElement(".pageCount");
const readMe = getElement(".modal-read");
const loader = getElement("#loader");
let newArray = [];

function renderBookM(data, parent) {
  parent.innerHTML = null;
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const newCard = bookmarksTemplate.content.cloneNode(true);
    const title = getElement(".bookc-title", newCard);
    const writer = getElement(".writer", newCard);
    const read = getElement(".bookc-read", newCard);
    const dBtn = getElement(".delete", newCard);

    dBtn.dataset.id = element.id;
    title.textContent = element.volumeInfo.title;
    writer.textContent = element.volumeInfo.authors;
    if (read) {
      read.href = element.volumeInfo.previewLink;
      read.target = "_blank";
    }

    fragment.appendChild(newCard);
  });
  parent.appendChild(fragment);
}

export function bookmarkFn(url, input, order, parent) {
  parent.addEventListener("click", (evt) => {
    // parent.innerHTML = null;
    if (evt.target.className.includes("bookmark-btn")) {
      loader.style.display = "inline-block";

      fetch(
        `${url}?q=${
          input.value ? input.value : "python"
        }&orderBy=newest&startIndex=0&maxResults=6`
      )
        .then((res) => res.json())
        .then((data) => {
          loader.style.display = "none";

          //   console.log(data.items);
          const id = evt.target.dataset.id;
          data.items.forEach((element) => {
            if (id == element.id) {
              newArray.push(element);
            }
          });
          renderBookM(newArray, bookmarksCards);
        });
    }

    if (evt.target.className.includes("more")) {
      fetch(
        `${url}?q=${
          input.value ? input.value : "python"
        }&orderBy=newest&startIndex=0&maxResults=6`
      )
        .then((res) => res.json())
        .then((data) => {
          const id = evt.target.dataset.id;
          data.items.forEach((element) => {
            if (id == element.id) {
              modalTitle.textContent = element.volumeInfo.title;
              modalImg.src = element.volumeInfo.imageLinks.thumbnail;
              modalAuthor.textContent = element.volumeInfo.authors[0];
              modalAuthor2.textContent = element.volumeInfo.authors[1];
              modalPublished.textContent = element.volumeInfo.publishedDate;
              modalText.textContent = element.volumeInfo.description;
              modalPublisher.textContent = element.volumeInfo.publisher;
              modalCategories.textContent = element.volumeInfo.categories;
              modalPageCount.textContent = element.volumeInfo.pageCount;
              if (readMe) {
                readMe.href = element.volumeInfo.previewLink;
                readMe.alt = element.volumeInfo.title;
                readMe.target = "_blank";
              }
            }
          });
          renderBookM(newArray, bookmarksCards);
        });
    }
  });
}

bookmarksCards.addEventListener("click", (evt) => {
  bookmarksCards.innerHTML = "";
  if (evt.target.className.includes("delete")) {
    const id = evt.target.dataset.id;
    const dArray = [];
    console.log(id);
    newArray.forEach((element) => {
      if (id != element.id) {
        dArray.push(element);
      }
    });
    newArray = dArray;
    renderBookM(newArray, bookmarksCards);
  }
});
renderBookM(newArray, bookmarksCards);
