import { getElement } from "./helpers.js";

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
const bookmarkBtnF = getElement("#fff");

export let newArray = [];

function renderBookM(data, parent) {
  parent.innerHTML = null;
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const newCard = document.createElement("div");
    newCard.className = "bookmarks__card";
    newCard.innerHTML = `
    <div class="bookc-content">
          <h5 class="bookc-title">${element.volumeInfo.title}</h5>
          <p class="bookc-text writer">${element.volumeInfo.authors}</p>
        </div>
        <div class="bookc-btns">
          <a href="${element.volumeInfo.previewLink}" target="_blank" class="bookc-read">
            <img src="./img/read-book.svg" data-id=${element.id} alt="read button" />
          </a>
          <img class="delete" data-id=${element.id} src="./img/delete.svg" alt="delete button" />
        </div>
    `;
    parent.appendChild(newCard);
  });
}

export function bookmarkFn(url, input, parent) {
  parent.addEventListener("click", (evt) => {
    if (evt.target.className.includes("bookmark-btn")) {
      loader.style.display = "inline-block";

      evt.target.style.display = "none";

      fetch(
        `${url}?q=${
          input.value ? input.value : "python"
        }&orderBy=relevance&startIndex=0&maxResults=6`
      )
        .then((res) => res.json())
        .then((data) => {
          loader.style.display = "none";

          const id = evt.target.dataset.id;
          data.items.forEach((element) => {
            if (id == element.id) {
              const evtt = evt.target;

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
        }&orderBy=relevance&startIndex=0&maxResults=6`
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
    const idBM = evt.target.dataset.id;

    const dArray = [];
    newArray.forEach((element) => {
      if (idBM != element.id) {
        const btt = getElement(".delete");
        btt.style.display = "block";
        dArray.push(element);
      }
    });
    newArray = dArray;
    renderBookM(newArray, bookmarksCards);
  }
});
renderBookM(newArray, bookmarksCards);
