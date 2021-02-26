const slider = document.querySelector('.slider');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.controls ul');
const sliderImg = document.querySelectorAll(".slider section");

var sectionIndex = 0;



document.querySelectorAll('.controls li').forEach(function(indicator, ind) {
  indicator.addEventListener('mouseenter', function() {
    sectionIndex = ind;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicator.classList.add('selected');
    slider.style.transform = `translate(` + (sectionIndex) * -33 + `%)`;
  });
});

leftArrow.addEventListener('click', function() {
  sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
  document.querySelector('.controls .selected').classList.remove('selected');
  indicatorParents.children[sectionIndex].classList.add('selected');
  slider.style.transform = `translate(` + (sectionIndex) * -33 + `%)`;
});

rightArrow.addEventListener('click', function() {
  sectionIndex = (sectionIndex < 2) ? sectionIndex + 1 : 2;
  document.querySelector('.controls .selected').classList.remove('selected');
  indicatorParents.children[sectionIndex].classList.add('selected');
  slider.style.transform = `translate(` + (sectionIndex) * -33 + `%)`;
});


function getRandomNum(m,n) {
    return m + Math.floor((n-m+1)*Math.random());
}


function loadRandomImage(idx) {
    const URL = "http://localhost:3000/homeData.json";
    fetch(URL)
    .then(response => response.json())
    .then(json => renderImage(json.bigSlideList[idx].imgurl, idx));
}

function renderImage(img, sliderIdx) {
    sliderImg[sliderIdx].innerHTML =`<img src = ${img}>`;
}

loadRandomImage(0);
loadRandomImage(1);
loadRandomImage(2);