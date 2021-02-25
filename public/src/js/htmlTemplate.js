export const makeSlideItem = (imgurl) => `<div class="slide-item">
                                    <img src="${imgurl}"/>
                                </div>`;

export const makeEventItem = ({ imgurl, title, info }) => `
<li class='event-item'>
  <a href=''>
    <div class='item-img'>
      <img src="${imgurl}"/>
    </div>
    <div class='item-title'>${title}</div>
    <div class='item-info'>${info}</div>
    <div class='item-theme'>테마</div>
  </a>
</li>                        
`;
