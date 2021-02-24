const api = require('./api');
const searchButton = document.getElementById('searchButton');
const moreBoxButton = document.getElementById('moreBoxButton');
const viewBoxCount = document.getElementById('viewBoxCount');
const totalBoxCount = document.getElementById('totalBoxCount');
const boxTarget = document.getElementById('boxTarget');
const pagingArrow = document.getElementById('pagingArrow');
const pagingHover = document.getElementById('pagingHover');
const panel = document.querySelector('.panel');

const numberWithCommas = s => String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const init = () => {
  let moreBoxNowPage = 1;
  let moreBoxRowNumber = 5;

  const getBoxLength = async () => {
    const data = await api.getBoxItemLength();
    if(data && !data.error) {
      if(data.length) {
        setTotalBoxCount(data.length);
      }
    } else {
      console.log(data.error || '서버와 연결이 끊겼어요.');
    }
  }

  const getBox = async () => {
    const data = await api.getItem('box', moreBoxNowPage, moreBoxRowNumber);
    if(data && !data.error) {
      moreBoxNowPage += 1;
      if(data.list) {
        setviewBoxCount(data.list.length);
      }
      renderBox(data);
    } else {
      console.log(data.error || '서버와 연결이 끊겼어요.');
    }
    checkMoreButton();
  }

  const getThemeCarousel = async () => {
    const data = await api.getItem('carousel');
    console.log(data);
  }
  
  const setTotalBoxCount = length => {
    if(length)
      totalBoxCount.textContent = length;
  }

  const setviewBoxCount = length => {
    if(length)
      viewBoxCount.textContent = viewBoxCount.textContent ? +viewBoxCount.textContent + length : length;
  }

  const renderBox = ({prefix, list}) => {
    str = list.reduce((acc, cur) => 
      acc += `
      <a class="box__item" href="">
        <img class="box__item__img" src="${prefix}${cur.src}" alt="">
        <span class="box__item__title">${cur.title}</span>
        <span class="box__item__price">${numberWithCommas(cur.price)}원</span>
      </a>
      `
    , '');
    boxTarget.insertAdjacentHTML('beforeend', str);
  }
  
  const checkMoreButton = () => {
    if(+viewBoxCount.textContent >= +totalBoxCount.textContent) {
      moreBoxButton.classList.add('not-used');
    }
  }
  
  const moveCarousel = target => {
    if(target.dataset.arrow === 'prev') {
      panel.classList.add('transition-on', 'move-prev');
      setTimeout(() => {
        const list = panel.querySelectorAll('img');
        let tmp = new String(list[0].src);
        for(let i = 1; i < list.length; i++) {
          const now = new String(list[i].src);
          list[i].src = tmp;
          tmp = now;
        }
        list[0].src = tmp;
        panel.classList.remove('transition-on', 'move-prev');
      }, 300);
    }
    if(target.dataset.arrow === 'next') {
      panel.classList.add('transition-on', 'move-next');
      setTimeout(() => {
        const list = panel.querySelectorAll('img');
        let tmp = new String(list[list.length - 1].src);
        for(let i = list.length - 1; i >= 0; i--) {
          const now = new String(list[i].src);
          list[i].src = tmp;
          tmp = now;
        }
        list[list.length - 1].src = tmp;
        panel.classList.remove('transition-on', 'move-next')
      }, 300);

    }
  }

  moreBoxButton.addEventListener('click', () => getBox());
  pagingArrow.addEventListener('click', ({ target }) => moveCarousel(target));
  getBoxLength();
  getBox();
  getThemeCarousel();
}

init();
