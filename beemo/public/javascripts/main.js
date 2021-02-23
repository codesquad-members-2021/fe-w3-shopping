const fetch = require('cross-fetch');

const url = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614072773662';

const leftTopImg = document.querySelector('.main__first_line__left__box > img');
const rightTopImg = document.querySelector('.main__first_line__right__box > img')
const ajax = () => { //왼쪽 위 데이터
  fetch(url).then((response) => {
    console.log(response)
    return response.json();
  }).then((data) => {
    console.log(data);
    leftTopImg.setAttribute('src', data.event.imgurl)
    rightTopImg.setAttribute('src', data.mileageList[0].imgurl)
    // console.log(data.mileageList.)
  })
}

ajax();