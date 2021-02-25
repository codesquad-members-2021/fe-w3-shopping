// const { urlencoded } = require('body-parser');

function loadItems() {
    cnt++;
    return fetch(urlArr[cnt])
    .then(response => response.json())
    .then(json => json.event);
}
let cnt = 0;
const urlArr = ["https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614172843603",
"https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614214179932"];
function displayStatic(items) {
    const mainStaticBox = document.querySelector('.static__link');
    // let static = items.filter(item => item.imgurl === "//shop2.daumcdn.net/shophow/sib/0_210219174942_MavwLdgvMXrxztHqCPIiDVOoiDjTUKCE");
    console.log(items);
    mainStaticBox.innerHTML = `<img src="${items.imgurl}" alt="매인 고정"></img>`
}
// let cnt = 0;
// function slideCnt(items) {
//     let slide  = items.filter(item => item.type === "main-slide");
//     console.log(slide);
//     slide.map(e => displaySlide(e));
// }
// function displaySlide(slide) {
//     cnt++;
//     const slideBox = document.querySelector(`.slide__link${cnt}`);
//     // let slide  = items.filter(item => item.type === "main-slide");
//     console.log(slide);
//     slideBox.innerHTML = slide.map(e => createHTMLString(e));
// }

// function createHTMLString(item) {
//     return `<img src="${item.image}" alt="" class="${item.className}" />`;
// }

// loadItems()
//   .then(items => {
//     displayStatic(items);

//   })
//   .catch(console.log);

// loadItems();


