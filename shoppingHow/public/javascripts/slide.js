function loadItems() {
  let carouseldatas = {};
  let slideContents = "";
  document.querySelector(".slide_list").innerHTML = "";
  fetch("http://localhost:3000/planningEvent.json")
    .then((response) => response.json())
    .then((data) => {
      datas = data.mileageList;
      datas.forEach(
        (data) => (slideContents += `<li><img src=${data.imgurl}></img></li>`)
      );

      document.querySelector(".slide_list").innerHTML = slideContents;
    });
}

loadItems();

let nextButton = document.querySelector(".next_button");

window.addEventListener("load", () => {
  move();
});

function move() {
  let ul = document.querySelector(".slide_list");
  let curIndex = 0;
  setInterval(function () {
    ul.style.transition = "0.2s";
    ul.style.transform =
      "translate3d(-" + 514 * (curIndex + 1) + "px, 0px, 0px)";

    curIndex++;

    if (curIndex === 2) {
      curIndex = -1;
    }
  }, 1000);
}
