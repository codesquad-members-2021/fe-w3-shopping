window.addEventListener("load", () => {
  const slideList = document.querySelector(".slide_list");
  const slideContents = document.querySelectorAll(".slide_list li");

  const nextBtn = document.querySelector(".next_button");
  const prevBtn = document.querySelector(".prev_button");

  console.log(slideContents);

  function loadItems() {
    let slideInnerHTML = "";
    document.querySelector(".slide_list").innerHTML = "";
    fetch("http://localhost:3000/planningEvent.json")
      .then((response) => response.json())
      .then((data) => {
        datas = data.mileageList;
        datas.forEach(
          (data) =>
            (slideInnerHTML += `<li><img class="slide_item" src=${data.imgurl}></img></li>`)
        );

        slideList.innerHTML =
          copyLastSlide(datas) + slideInnerHTML + copyFirstSlide(datas);
      });
  }

  loadItems();

  const copyFirstSlide = (datas) => {
    return `<li><img class="slide_item" id="firstSlide" src=${datas[0].imgurl}></img></li>`;
  };
  //transition 부드럽게 보이기위해 하나 더 추가
  const copyLastSlide = (datas) => {
    return `<li><img class="slide_item" id="lastSlide" src=${datas[2].imgurl}></img></li>`;
  };

  let counter = 1;
  const size = 514;

  slideList.style.transform = "translateX(" + -size * counter + "px)";

  nextBtn.addEventListener("click", () => {
    if (counter >= 4) return;
    slideList.style.transition = "transform 0.3s ease-in-out";
    counter++;
    slideList.style.transform = "translateX(" + -size * counter + "px)";
  });
  prevBtn.addEventListener("click", () => {
    if (counter <= 0) return;
    slideList.style.transition = "transform 0.3s ease-in-out";
    counter--;
    slideList.style.transform = "translateX(" + -size * counter + "px)";
  });

  slideList.addEventListener("transitionend", function () {
    console.log(counter);
    if (counter === 4) {
      slideList.style.transition = "none";
      counter = counter - 3;
      slideList.style.transform = "translateX(" + -size * counter + "px)";
    }
    if (counter === 0) {
      slideList.style.transition = "none";
      counter = counter + 3;
      slideList.style.transform = "translateX(" + -size * counter + "px)";
    }
  });
});
