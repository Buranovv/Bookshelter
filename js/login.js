import { getElement } from "./helpers.js";

const email = getElement("#userTo");
const password = getElement("#passwordTo");
const submit = getElement(".loginTo");
const form = getElement("#formTo");

const token = localStorage.getItem("token");

if (token) {
  window.location.replace("../main.html");
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const log = {
    email: email.value,
    password: password.value,
  };

  fetch("https://reqres.in/api/login", {
    method: "POST",
    body: JSON.stringify(log),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      const token = localStorage.getItem("token");

      if (token) {
        window.location.replace("../main.html");
      }

      form.reset();
    });
});
