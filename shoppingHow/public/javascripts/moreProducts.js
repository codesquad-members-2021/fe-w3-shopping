const secondUl = document.querySelector("products_list2");

function loadItems() {
  return fetch("http://localhost:3000/homeContents.json").then((data) =>
    data.json()
  );
}

function makeHTML() {
  loadItems().then((v) => {
    document.querySelector(
      ".section_products_list"
    ).innerHTML = getHtmlWithData(v.contents);
  });
}
makeHTML();

function getHtmlWithData(datas) {
  let string = "";
  for (let i = 0; i < 5; i++) {
    string += `<li>
    <img src="${datas[i].eventContent.imgurl}"></img>
    <span class="ellipsis">${datas[i].eventContent.title}</span>
    <span>${datas[i].eventContent.subtitle}</span>
    <span class="span_theme">테마</span>
    </li>`;
  }
  return string;
}