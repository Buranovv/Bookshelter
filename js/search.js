import { getElement, renderFn } from "./helpers.js";

const elForm = getElement("#form");
export const searchInp = getElement(".search");

export function search(url, showResult, parent) {
  elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    fetch(`${url}?q=${searchInp.value}&startIndex=0&maxResults=6`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        showResult.textContent = `Showing ${data.totalItems} Result(s)`;

        renderFn(data.items, parent);
      });
    // elForm.reset();
  });
}
