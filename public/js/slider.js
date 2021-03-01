const $paging = document.querySelector('.paging');
const $slide = document.querySelector('.slide');

$paging.addEventListener('click', ({ target }) => {
  const $slideItems = $slide.querySelectorAll('.panel');
  const [item1, item3] = [$slideItems[0], $slideItems[2]];

  if(target.closest('.prev-btn')) {
    $slide.style.transform = 'translateX(33.3333%)';
    $slide.style.transitionDuration = '400ms';
    $slide.addEventListener('transitionend', () => {
      $slide.removeAttribute('style');
      $slide.insertBefore(item3, item1);
    })
  }
  if(target.closest('.next-btn')) {
    $slide.style.transform = 'translateX(-33.3333%)';
    $slide.style.transitionDuration = '400ms';
    $slide.addEventListener('transitionend', () => {
      $slide.removeAttribute('style');
      $slide.appendChild(item1);
    })
  }
})
