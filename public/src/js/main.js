import { getBannerImage, getHotItemImage } from "./api/api.js";
import App from "./App.js";

// const box = document.querySelector(".box");

// box.addEventListener("click", async () => {
//   const imgSrc = await getHotItemImage("item_4");
//   box.innerHTML = `<img src="${imgSrc.url}">`;
// });
new App(document.getElementById("app"));
