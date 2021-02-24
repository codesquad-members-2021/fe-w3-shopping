fetch('http://localhost:3000/api/mileageList', { mode: 'cors' })
  .then((response) => {
    let data = response.json();

    return data;
  })
  .then((data) => console.log(data.mileageList[0].imgurl))
  .then((status) => console.log('Request successful', status))
  .catch((error) => console.log('Request failed', error));

const $mileageEventSlide = document.querySelector('.event--slide');
const $prevEventButton = document.querySelector('.slide--button--prev');
const $nextEventButton = document.querySelector('.slide--button--next');

const $mallEventList = document.querySelector('#mallEventList');

$mileageEventSlide.addEventListener('mouseover', overEventSlider);
$mileageEventSlide.addEventListener('mouseout', outEventSlider);

function overEventSlider(e) {
  $prevEventButton.querySelector('.ico--prev').classList.replace('ico--prev', 'ico--prev__slide--hover');
  $nextEventButton.querySelector('.ico--next').classList.replace('ico--next', 'ico--next__slide--hover');
}

function outEventSlider(e) {
  $prevEventButton.querySelector('.ico--prev__slide--hover').classList.replace('ico--prev__slide--hover', 'ico--prev');
  $nextEventButton.querySelector('.ico--next__slide--hover').classList.replace('ico--next__slide--hover', 'ico--next');
}
