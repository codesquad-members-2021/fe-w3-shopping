const createHeader = (logo, searchBar, navbar) => {
  return `<section class="header__head">
    ${logo}
    ${searchBar}
  </section>
  <section class="header__navbar">
    ${navbar}
  </section>`;
};

const setLogo = (img_url, link_url = undefined, alt = undefined) => {
  return `<div class="head__logo">
    <a href="${link_url}">
      <img src="${img_url}" alt="${alt}" />
    </a>
  </div>`;
};

const setSearchBar = (button_icon = undefined) => {
  return `<div class="head__searchBar">
    <div class="searchBar__input"></div>
    <button class="searchBar__button">
      ${button_icon ? button_icon : '<i class="fas fa-search"></i>'}
    </button>
  </div>`;
};

const setNavbar = (category, lists) => {
  return `<div class="navbar__category">
    <button class="category__button">
    ${category.icon}
    ${category.title}
    </button>
  </div>
  <span class="navbar__line"></span>
  ${lists[0]}
  <span class="navbar__line"></span>
  ${lists[1]}
  <ul class="navbar__list-user">
  ${lists[2]}
  </ul>`;
};

module.exports = { createHeader, setLogo, setSearchBar, setNavbar };
