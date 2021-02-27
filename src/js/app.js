import '../scss/style.scss';

import { _ } from './util.js';
import { createMainEvtCardElFrom } from './common-creator.js';
import { MainEvtSlide, HotdealEvtSlide } from './slide.js';
import { EvtCardTable } from './table.js';

const DOMAIN = 'http://localhost';
const PORT = 3000;
const SERVER = `${DOMAIN}:${PORT}/`;
const DEFAULT_COLUMN_CNT = 4;

// TODO
// fetch(SERVER + 'json/homeContents.json') 
  // .then(res => res.json())
  // .then(json => {
  // })

fetch(SERVER + 'json/planningEvent.json')
  .then(res => res.json())
  .then(json => {
    const $mainEvtCont = _.$('.main-evt-cont');
    $mainEvtCont.insertBefore(createMainEvtCardElFrom(json.event), $mainEvtCont.firstElementChild);
    
    const mainEvtSlide = new MainEvtSlide($mainEvtCont.lastElementChild, json.mileageList);
    mainEvtSlide.init();

    const evtCardTable = new EvtCardTable({
      target: _.$('.evt-card-table'),
      jsonList: json.mallEventList,
      columnCnt: DEFAULT_COLUMN_CNT,
    });
    evtCardTable.init();
  })
  .catch(console.error);

  
fetch(SERVER + 'json/hotdealList.json')
  .then(res => res.json())
  .then(json => {
    const hotDealEvtSlide = new HotdealEvtSlide({
      target: _.$('.hotdeal-evt-slide'),
      jsonList: json.hotdealList,
      itemCnt: DEFAULT_COLUMN_CNT,
    });
    hotDealEvtSlide.init();
  })
  .catch(console.error);