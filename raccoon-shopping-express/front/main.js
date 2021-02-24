fetch('http://localhost:3000/api/mileageList', { mode: 'cors' })
  .then((response) => {
    let data = response.json();
    return data;
  })
  .then((data) => pushContents(data))
  .then((status) => console.log('Request successful', status))
  .catch((error) => console.log('Request failed', error));

const $mileageEventSlide = document.querySelector('.event--slide');
const $prevEventButton = document.querySelector('.slide--button--prev');
const $nextEventButton = document.querySelector('.slide--button--next');

const $mallEventList = document.querySelector('#mallEventList');
const $topMileageSlide = document.querySelector('#topMileageSlide');

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

// slide 내부 동적으로 그려보기

function pushContents(contents) {
  $topMileageSlide.insertAdjacentHTML('afterbegin', getMileageEventContents(contents));
}

function getMileageEventContents(jsonData) {
  const imgurlArr = jsonData.mileageList.map((el) => el.imgurl);
  const linkurlArr = jsonData.mileageList.map((el) => el.linkurl);

  let panelDiv = ``;
  for (let i = 0; i < imgurlArr.length; i++) {
    panelDiv += `
    <div class="panel">
    <a href="${linkurlArr[i]}" class="link--event"
      ><img src="${imgurlArr[i]}" width="485" height="340" class="img_g" alt=""
    /></a>
    </div>`;
  }

  return panelDiv;
}
