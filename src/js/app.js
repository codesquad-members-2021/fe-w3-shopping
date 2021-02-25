import '../scss/style.scss';

import { _ } from './util.js';
import { createMainEvtCardElFrom } from './common-creator.js';
import { MainEvtSlide } from './slide.js';
import { EvtCardTable } from './table.js';

const DOMAIN = 'http://localhost';
const PORT = 3000;
const SERVER = `${DOMAIN}:${PORT}/`;

fetch(SERVER + 'json/planningEvent.json')
  .then((res) => res.json())
  .then((json) => {
    const $mainEvtCont = _.$('.main-evt-cont');
    $mainEvtCont.insertBefore(createMainEvtCardElFrom(json.event), $mainEvtCont.firstElementChild);
    (new MainEvtSlide($mainEvtCont.lastElementChild, json.mileageList)).init();

    (new EvtCardTable({
      target: _.$('.evt-card-table'),
      jsonList: json.mallEventList,
      columnCnt: 4,
    })).init();
    
  })
  .catch(console.error);