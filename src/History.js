import { formatTime } from "./utils";

const button = document.getElementById("show-history");
const bgFixed = document.getElementById("bg-fixed");
const modal = document.getElementById("modal-history");

button.addEventListener("click", (e) => {
  modal.classList.remove("hidden");
  bgFixed.classList.remove("hidden");

  let historyList = localStorage.getItem("games");

  if (historyList == null) {
  } else {
    historyList = JSON.parse(historyList);
    const ul = modal.querySelector("ul");
    ul.innerHTML = "";
    [...historyList].forEach((time) => {
      ul.innerHTML += `
        <li class="py-3 flex items-center justify-between">
        <span class="text-green-500">Won</span>
        <span>${formatTime(time)}</span>
      </li>`;
    });
  }
});

modal.querySelectorAll("button")[0].addEventListener("click", (e) => {
  modal.classList.add("hidden");
  bgFixed.classList.add("hidden");
  localStorage.setItem("games", JSON.stringify([]));
});

modal.querySelectorAll("button")[1].addEventListener("click", (e) => {
  modal.classList.add("hidden");
  bgFixed.classList.add("hidden");
});
