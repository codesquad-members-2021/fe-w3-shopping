import Slider from "./slider.js"
import _ from "./utils.js";

const banner = _.$(".banner__right")
const slider = new Slider(banner);

slider.init();