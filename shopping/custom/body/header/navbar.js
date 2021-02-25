const defaultList = ["핫딜", "베스트100", "할인특가", "기획전"];
const hashTagList = ["#건강식품", "#제철음식", "#블루투스이어폰", "#커블체어", "#노트북"];
const accountList = [
  { link: "/", icon: `<i class="fas fa-user-circle"></i>`, name: "로그인" },
  { link: "/", icon: `<i class="far fa-clone"></i>`, name: "최근본 상품" },
];

const createListSet = (list) => list.reduce((acc, val) => acc + `<li>${val}</li>`, ``);
const createAccountListSet = (accounts) => accounts.reduce((acc, val) => acc + `<li><a href="${val.link}">${val.icon}<span>${val.name}</span></a></li>`);

const navbarInfo = {
  category: {
    icon: `<i class="fas fa-bars"></i>`,
    title: "카테고리",
  },

  lists: [
    `<ul class="navbar__list-default">
        ${createListSet(defaultList)}
         </ul>`,
    `<ul class="navbar__list-hashTag">
          ${createListSet(hashTagList)}
         </ul>`,
    `<ul class="navbar__list-user">
           ${createAccountListSet(accountList)}
         </ul>`,
  ],
};

module.exports = navbarInfo;
