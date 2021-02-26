let rawData = {};
function loadItems() {
  return fetch("http://localhost:3000/homeContents.json").then((data) =>
    data.json()
  );
}

function getHtmlWithData(datas, start, end) {
  let string = "";
  for (let i = start; i < end; i++) {
    string += `<li>
      <img src="${datas[i].eventContent.imgurl}"></img>
      <span class="ellipsis">${datas[i].eventContent.title}</span>
      <span>${datas[i].eventContent.subtitle}</span>
      <span class="span_theme">테마</span>
      </li>`;
  }
  return string;
}

function makeHTML() {
  loadItems().then((v) => {
    document.querySelector(
      ".section_products_list"
    ).innerHTML = getHtmlWithData(v.contents, 0, 5);
    rawData = v.contents;
  });
}

const seeMoreBtn = document.querySelector(".section_products_seeMore");

seeMoreBtn.addEventListener("click", () => {
  if (seeMoreBtn.innerHTML === "더보기 ▼") {
    document.querySelector(
      ".section_products_list"
    ).innerHTML += getHtmlWithData(rawData, 5, 10);
    seeMoreBtn.innerHTML = "접기 ▲";
  } else if (seeMoreBtn.innerHTML === "접기 ▲") {
    document.querySelector(
      ".section_products_list"
    ).innerHTML = getHtmlWithData(rawData, 0, 5);
    seeMoreBtn.innerHTML = "더보기 ▼";
  }
});

makeHTML();
