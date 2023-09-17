import { getElement, renderFn } from "./helpers.js";

export const sortBtnNew = getElement(".order-new");
export const sortBtnRel = getElement(".order-rel");

export function sortFn(url, showResult, input, parent) {
  sortBtnNew.addEventListener("click", () => {
    fetch(
      `${url}?q=${
        input.value ? input.value : "python"
      }&orderBy=newest&startIndex=0&maxResults=6`
    )
      .then((res) => res.json())
      .then((data) => {
        sortBtnNew.style.display = "none";
        sortBtnRel.style.display = "flex";
        showResult.textContent = `Showing ${data.totalItems} Result(s)`;

        renderFn(data.items, parent);
      });
  });

  sortBtnRel.addEventListener("click", () => {
    fetch(
      `${url}?q=${
        input.value ? input.value : "python"
      }&orderBy=relevance&startIndex=0&maxResults=6`
    )
      .then((res) => res.json())
      .then((data) => {
        sortBtnRel.style.display = "none";
        sortBtnNew.style.display = "flex";
        showResult.textContent = `Showing ${data.totalItems} Result(s)`;

        renderFn(data.items, parent);
      });
  });
}
