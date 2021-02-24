import Slide from './slide.js';
import { domSelect } from './util.js';

const slideContainer = domSelect('.slide');
const slideList = domSelect('.slide-list');
const slideHTML = { container: slideContainer, itemList: slideList };

const slide = new Slide(slideHTML);
console.log(slide);
slide.init();
