import { bookmarkFn } from "./bookmarks.js";
import { getElement, renderFn } from "./helpers.js";
import { search, searchInp } from "./search.js";
import { sortBtnNew, sortFn } from "./sort.js";

export const elCards = getElement(".cards");
const logout = getElement(".logout");
const API = "https://www.googleapis.com/books/v1/volumes";
const showResults = getElement(".show-results");

const token = localStorage.getItem("token");

if (!token) {
  window.location.replace("../index.html");
}

logout.addEventListener("click", () => {
  localStorage.clear();

  window.location.replace("../index.html");
});

fetch(`${API}?q=python&startIndex=0&maxResults=6`)
  .then((res) => res.json())
  .then((data) => {
    showResults.textContent = `Showing ${data.totalItems} Result(s)`;
    console.log(data);
    // console.log(data.items.id);
    renderFn(data.items, elCards);

    bookmarkFn(API, searchInp, sortBtnNew, elCards);
  });

search(API, showResults, elCards);

sortFn(API, showResults, searchInp, elCards);
