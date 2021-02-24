import Slide from './slide.js';
import { domSelect } from './util.js';

const slideContainer = domSelect('.slide');
const slideList = domSelect('.slide-list');
const pagingBtn = domSelect('.slide-event__paging');
const slideHTML = { container: slideContainer, slideList, pagingBtn };

const slide = new Slide(slideHTML);
slide.init();
