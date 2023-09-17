export function getElement(element, parent = document) {
  return parent.querySelector(element);
}

const template = getElement("#template");

export function renderFn(data, parent) {
  parent.innerHTML = null;
  // const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.style.width = "18rem";
    newCard.innerHTML = `
<div class="card-img-box">
<img class="card-img-top" id="card-img" src=${element.volumeInfo.imageLinks.thumbnail} alt="" />
</div>
<div class="card-body">
<h5 class="card-title">${element.volumeInfo.title}</h5>
<p class="card-text writer">${element.volumeInfo.authors}</p>
<p class="card-text year">${element.volumeInfo.publishedDate}</p>
<div class="btn-box">
<button data-id=${element.id} class="bookmark-btn delete">Bookmark</button>
  <button
    class="more"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-id=${element.id}
  >
    More info
  </button>
  <a href=${element.volumeInfo.previewLink} target="_blank" class="btn btn-secondary read">Read</a>
</div>
</div>
`;
    // const newCard = template.content.cloneNode(true);
    // const cardImg = getElement("#card-img", newCard);
    // const cardTitle = getElement(".card-title", newCard);
    // const writer = getElement(".writer", newCard);
    // const year = getElement(".year", newCard);
    // const read = getElement(".read", newCard);
    // const more = getElement(".more", newCard);
    // const bookmarkBtn = getElement(".bookmark-btn", newCard);

    // more.dataset.id = element.id;
    // bookmarkBtn.dataset.id = element.id;

    // cardImg.src = element.volumeInfo.imageLinks.thumbnail;
    // cardTitle.textContent = element.volumeInfo.title;
    // writer.textContent = element.volumeInfo.authors;
    // year.textContent = element.volumeInfo.publishedDate;
    // if (read) {
    //   read.href = element.volumeInfo.previewLink;
    //   read.target = "_blank";
    // }
    // fragment.appendChild(newCard);
    parent.appendChild(newCard);
  });
}
