const api = require('./api');
const searchButton = document.getElementById('searchButton');
const moreBoxButton = document.getElementById('moreBoxButton');
const viewBoxCount = document.getElementById('viewBoxCount');
const totalBoxCount = document.getElementById('totalBoxCount');
const boxTarget = document.getElementById('boxTarget');
const bestItemTarget = document.getElementById('bestItemTarget');
const pagingArrow = document.getElementById('pagingArrow');
const pagingHover = document.getElementById('pagingHover');
const panel = document.querySelector('.panel');
const eventItemTarget = document.getElementById('eventItemTarget');
const themePagingArrow = document.getElementById('themePagingArrow');
const themeTarget = document.getElementById('themeTarget');
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

  const getTheme = async () => {
    const data = await api.getItem('carousel');
    if(data && !data.error) {
      renderTheme(data);
    } else {
      console.log(data.error || '서버와 연결이 끊겼어요.');
    }
  }

  const getBest = async () => {
    const data = await api.getItem('best');
    if(data && !data.error) {
      renderBest(data);
    } else {
      console.log(data.error || '서버와 연결이 끊겼어요.');
    }
  };

  const getEvent = async () => {
    const data = await api.getItem('event');
    if(data && !data.error) {
      renderEvent(data);
    } else {
      console.log(data.error || '서버와 연결이 끊겼어요.');
    }
  };
  
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

  const renderBest = ({prefix, list}) => {
    str = `<a class="carousel__item"><img src="${prefix}${list[0].src}"></a>`;
    bestItemTarget.innerHTML = str;
  }

  const renderEvent = ({prefix, list}) => {
    str = list.reduce((acc, cur) => acc += `<a class="panel__item"><img src="${prefix}${cur.src}"></a>`, '');
    eventItemTarget.innerHTML = str;
  }

  const renderTheme = ({prefix, list}) => {
    str = list.reduce((acc, cur) => {
      acc += `
      <a class="box__item" href="">
        <img class="box__item__img" src="${prefix}${cur.src}">
        <span class="box__item__title">${cur.title}</span>
        <span class="box__item__content">${cur.content}</span>
        <span class="box__item__tag">${cur.tag}</span>
      </a>`
      return acc;
    }, '');
    themeTarget.style.width = `${list.length * 20}%`;
    themeTarget.innerHTML = str;
    setTimeout(() => {
      const childWidth = themeTarget.firstElementChild.getBoundingClientRect().width;
      themeTarget.dataset.width = childWidth;
      themeTarget.dataset.default_width = childWidth * -parseInt(list.length / 2);
      themeTarget.style.transform = `translateX(${themeTarget.dataset.default_width}px)`;
    }, 500);
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
        const list = panel.querySelectorAll('.panel__item');
        panel.insertBefore(list[list.length - 1], list[0]);
        panel.classList.remove('transition-on', 'move-prev');
      }, 300);
    }
    if(target.dataset.arrow === 'next') {
      panel.classList.add('transition-on', 'move-next');
      setTimeout(() => {
        const list = panel.querySelectorAll('.panel__item');
        panel.insertBefore(list[0], null);
        panel.classList.remove('transition-on', 'move-next');
      }, 300);
    }
  }

  const handleThemeCarousel = (target, count = 1) => moveThemeCarousel(target.dataset.arrow, count);

  const moveThemeCarousel = (target, count) => {
    let first = null;
    let end = null;
    let move = +themeTarget.dataset.width * count;
    if(target === 'next') {
      move *= -1;
    }
    themeTarget.classList.add('transition-on');
    themeTarget.style.transform = `translateX(${+themeTarget.dataset.default_width + move}px)`;
    setTimeout(() => {
      while(count-- > 0) {
        if(target === 'prev') {
          first = themeTarget.lastElementChild;
          end = themeTarget.firstElementChild;
        }
        if(target === 'next') {
          first = themeTarget.firstElementChild;
        }
        themeTarget.classList.remove('transition-on');
        themeTarget.insertBefore(first, end);
      }
      themeTarget.style.transform = `translateX(${themeTarget.dataset.default_width}px)`;
    }, 300);
  }

  moreBoxButton.addEventListener('click', () => getBox());
  pagingArrow.addEventListener('click', ({ target }) => moveCarousel(target));
  let themePagingInterval = null;
  let mousedownDuration = null;
  themePagingArrow.addEventListener('mousedown', ({ target }) => {
    mousedownDuration = new Date();
    themePagingInterval = setInterval(() => {
      mousedownDuration = new Date();
      handleThemeCarousel(target, 2);
    }, 2000);
  });
  themePagingArrow.addEventListener('mouseup', ({ target }) => {
    const now = new Date();
    if(now - mousedownDuration < 500) {
      handleThemeCarousel(target);
    }
    mousedownDuration = null;
    clearInterval(themePagingInterval);
  });
  getBoxLength();
  getBox();
  getBest();
  getEvent();
  getTheme();
}

init();
