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
    parent.appendChild(newCard);
  });
}
