import '../scss/style.scss';

import { _ } from './util.js';
import { MainEvtSlide } from './slide.js';

const DOMAIN = 'http://localhost';
const PORT = 3000;
const SERVER = `${DOMAIN}:${PORT}/`;

fetch(SERVER + 'json/planningEvent.json')
  .then((res) => res.json())
  .then((json) => {
    const slide = new MainEvtSlide(_.$('.main-evt-slide'), json.mileageList);
    slide.init();
  })
  .catch(console.error);