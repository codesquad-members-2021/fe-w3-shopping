import Slider from "./slider.js";
import Morebtn from "./more.js";
import _ from "./utils.js";
const main = _.$(".main_section");
const banner = _.$(".banner__right", main);
const $moreBtn = _.$(".more_contents", main);
const $moreContainer = _.$(".shoppinglists", main);
const slider = new Slider(banner);

let item = fetch("http://localhost:3000/moreItem.json")
  .then((res) => res.json())
  .then((json) => {
    const morebtn = new Morebtn(json.mallEventList, $moreBtn, $moreContainer);
    morebtn.init();
  });

slider.init();
