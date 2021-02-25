import Slider from "./slider.js"
import _ from "./utils.js";

const banner = _.$(".banner__right")
const slider = new Slider(banner);

let item = fetch("http://localhost:3000/homeContents.json")	// (1)
  .then(response => response.json())						// (2)
  .then(json => console.log(json.contents[0].eventContent.subtitle));	//(3)

slider.init();