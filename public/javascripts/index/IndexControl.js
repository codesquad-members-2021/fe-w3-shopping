import _ from '../util.js';
import DataManager from './DataManager.js'; // 추후 제거, 여기서 작업하기 편하게 넣어놓은것.

class IndexControl {
    /**
     * @param {DataManager} dataManager
     */
    constructor(dataManager, moreWrapSelector, mainCarouselWrapper, hotCarouselWrapper) {
        this.dataManager = dataManager;
        this.moreWrapper = _.$(moreWrapSelector);
        this.mainCarouselWrapper = _.$(mainCarouselWrapper);
        this.hotCarouselWrapper = _.$(hotCarouselWrapper);     
    }

    init() {
        this._insertDataHotCarousel(this.hotCarouselWrapper);

        this._setMoreWrapperClickEvent(this.moreWrapper);
        this._setMainCarouselClickEvent(this.mainCarouselWrapper);
        this._setMainCarouselMouseoverEvent(this.mainCarouselWrapper);
        this._setHotCarouselMousedownEvent(this.hotCarouselWrapper);

        setInterval(() => this._updateMainCarouselAnimation('next', _.$All('.slide > .item', this.mainCarouselWrapper)), 5000);
        this._createMoreViewItemsExecute(_.$('.content__more__btn', this.moreWrapper));
    }

    // [1] 더보기 Wrapper (content__more) Click 이벤트 등록
    _setMoreWrapperClickEvent(moreWrapper) {
        _.addEvent(moreWrapper, 'click', (e) =>
            this._moreWrapperClickEventHandler(e),
        );
    }

    _moreWrapperClickEventHandler(e) {
        const { target } = e;
        const targetClassName = `.${target.className}`;

        if (targetClassName === '.content__more__btn')
            this._createMoreViewItemsExecute(target);
    }

    // 더보기 데이터가 들어갈 틀 생성 (실행)
    _createMoreViewItemsExecute(moreBtn) {
        this.dataManager.getMoreData(moreBtn.value)
            .then((moreData) => this._createMoreViewItems(moreData))            
            .then(() => this._updateMoreBtnInnerText(moreBtn))
            .catch((error) => console.error(error.message));     
    }

    // 더보기 버튼의 InnexText 갱신
    _updateMoreBtnInnerText(moreBtn) {
        this.dataManager.getAllMoreData()
            .then(
                (moreAlldata) =>
                    (moreBtn.innerText = `더보기(${moreBtn.value * 5}/${
                        moreAlldata.length
                    }건)`),
            )
            .then(() => moreBtn.value++)
            .catch((err) => console.error(err));
    }

    _createMoreViewItems(moreData) {
        const ul = _.$('ul',  _.$('.content__more__view', this.moreWrapper) );

        moreData.forEach((data, i) => {
            const { eventContent: { title, subtitle, imgurl } } = data;

            const li = _.createElement('li');
            if (i === moreData.length-1)
                _.classAdd(li, 'noBorder');

            const a = this._createTagAndSetAttribute('a', 'href', '/');
            const img = this._createTagAndSetAttribute('img', 'src', `https:${imgurl}`);
            const div = _.createElement('div');

            const spanBold = this._createTagAndTextClassName('span', title, 'txt-bold');
            const spanInfo = this._createTagAndTextClassName('span', subtitle, 'txt-info');
            const spanTheme = _.createElement('span');
            _.classAdd(spanTheme, "i-theme");

            _.appendChildren(a, img, div);
            _.appendChildren(div, spanBold, spanInfo, spanTheme);
            _.appendChild(li, a);
            _.appendChild(ul, li);
        });
    }

    _createTagAndSetAttribute(strTag, attrKey, attrValue) {
        const tag = _.createElement(strTag);
        _.setAttr(tag, attrKey, attrValue);
        return tag;
    }

    _createTagAndTextClassName(strTag, text, className) {
        const tag = _.createElement(strTag);
        _.appendChild(tag, _.createTextNode(text));
        _.classAdd(tag, className);
        return tag;
    }
    // --

    // [2] 상단 캐러셀 (content__main__carousel)
    // 상단 캐러셀 이벤트 등록 (이전, 다음)
    _setMainCarouselClickEvent(mainCarouselWrapper) {
        _.addEvent(mainCarouselWrapper, 'click', (e) =>
            this._mainCarouselClickEventHandler(e),
        );
    }

    _mainCarouselClickEventHandler({target}) {        
        const pagingBtn =
            _.closestSelector(target, '.paging--prev') ||
            _.closestSelector(target, '.paging--next');
        this._updateMainCarouselAnimationExecute(pagingBtn);
    }

    // 상단 캐러셀 동작 (이전, 다음 btn) (실행)
    _updateMainCarouselAnimationExecute(pagingBtn) {
        if (!pagingBtn) return;
        const exType = pagingBtn.className.indexOf('prev') > -1 ? 'prev' : 'next';
        const itemList = Array.from(_.$All('.slide > .item', this.mainCarouselWrapper));

        this._updateMainCarouselAnimation(exType, itemList);
    }

    _updateMainCarouselAnimation(exType, itemList, animateOpacity = false) {
        itemList.forEach((item, itemIdx) => {
            const minus = item.style.transform.indexOf('-') > -1 ? true : false;
            const tmp = item.style.transform.match(/([0-9]+%)/g)[0];
            let transformX = minus ? `-${tmp}` : tmp;
            let flag = false;

            if (exType === 'prev') {
                switch (transformX) {
                    case '0%':
                        transformX = '100%';
                        break;
                    case '100%':
                        transformX = '-100%';
                        flag = true;
                        break;
                    case '-100%':
                        transformX = '0%';
                        break;
                    default:
                        break;
                }
            } else {
                switch (transformX) {
                    case '0%':
                        transformX = '-100%';
                        break;
                    case '100%':
                        transformX = '0%';
                        break;
                    case '-100%':
                        transformX = '100%';
                        flag = true;
                        break;                    
                    default:
                        break;
                }
            }

            transformX === '0%' && this._updateMainCarouselPagingSpan(itemIdx);
            
            if (animateOpacity)
                item.style.transition = 'opacity 0.4s'
            else
                item.style.transition = flag ? 'opacity 0.4s' : 'transform 0.4s';

            item.style.transform = `translateX(${transformX})`;
        });
    }

    // 상단의 작은 span들 [- - -] 상태 업데이트
    _updateMainCarouselPagingSpan(animationItemIdx) {
        const pagingInnerSpanList = [...(_.$All('.paging__inner > span', this.mainCarouselWrapper))];
        const findPrevCurrent = pagingInnerSpanList.find((span) => _.classContains(span, 'current'));
        _.classRemove(findPrevCurrent, 'current');
        _.classAdd(pagingInnerSpanList[animationItemIdx], 'current');
    }

    // 상단 캐러셀 mouseover 이벤트 등록
        // 작은 span (.paging__inner > span)에서 동작
    _setMainCarouselMouseoverEvent(mainCarouselWrapper) {
        _.addEvent(mainCarouselWrapper, 'mouseover', (e) => this._mainCarouselMouseoverEventHandler(e));        
    }

    _mainCarouselMouseoverEventHandler({target}) {        
        const overSpan = _.closestSelector(target, '.paging__inner > span');        
        
        if (overSpan) {
            const pagingInnerSpanList = [...overSpan.parentElement.children];            
            const currStatusSpan = pagingInnerSpanList.find((span) => _.classContains(span, 'current'));

            const overSpanIdx = pagingInnerSpanList.indexOf(overSpan);
            const currStatusSpanIdx = pagingInnerSpanList.indexOf(currStatusSpan);

            const abs = Math.abs(currStatusSpanIdx-overSpanIdx);

            const itemList = Array.from(_.$All('.slide > .item', this.mainCarouselWrapper));
            if (overSpanIdx > currStatusSpanIdx) {
                [...Array(abs)].forEach((_) => this._updateMainCarouselAnimation('next', itemList, true))
            } else if (overSpanIdx < currStatusSpanIdx) {
                [...Array(abs)].forEach((_) => this._updateMainCarouselAnimation('prev', itemList, true))
            } else return;
        }
    }
    
    // [3] 하단 캐러셀 (content__hot__carousel)
    // 첫 로딩 시 하단 캐러셀에 들어갈 정보 서버에서 불러옴
    _insertDataHotCarousel(hotCarouselWrapper) {
        const itemList = Array.from(_.$All('ul > li', hotCarouselWrapper));
        
        this.dataManager.getHotCarouselData()
            .then((planningData) => {
                itemList.forEach((item, i) => {
                    const img = _.$('a > img', item);
                    const spanBold = _.$('.txt-bold', item);
                    const spanInfo = _.$('.txt-info', item);
                    _.setAttr(img, 'src', planningData[i].imgurl);                    
                    _.appendChild(spanBold, _.createTextNode(planningData[i].text));
                    _.appendChild(spanInfo, _.createTextNode(planningData[i].text2));                    
                })
            })
            .catch((error) => console.error(error.message));          
    }

    // 하단 캐러셀 이벤트 등록 (mousedown) (이전, 다음)
    _setHotCarouselMousedownEvent(hotCarouselWrapper) {        
        _.addEvent(hotCarouselWrapper, 'mousedown', (e) =>
            this._hotCarouselMousedownEventHandler(e),
        );
    }

    _hotCarouselMousedownEventHandler({target}) {        
        const pagingBtn =
            _.closestSelector(target, '.carousel__special--prev') ||
            _.closestSelector(target, '.carousel__special--next');
        this._updateHotCarouselAnimationExecute(pagingBtn);
    }

    // 하단 캐러셀 동작 (이전, 다음 btn) (실행)
    _updateHotCarouselAnimationExecute(pagingBtn, runCnt = 1) {
        if (!pagingBtn) return;
        const exType = pagingBtn.className.indexOf('prev') > -1 ? 'prev' : 'next';
        const itemList = Array.from(_.$All('ul > li', this.hotCarouselWrapper));
        
        for (let i = 0; i < runCnt; i++) 
            this._updateHotCarouselAnimation(exType, itemList)        
    }

    _updateHotCarouselAnimation(exType, itemList) {
        itemList.forEach((item) => {
            let transformValue = Number(item.className.replace('transformX__', ''));
            let opacity = false;

            if (exType === 'prev') {
                if (transformValue === 7) {
                    transformValue = -2;
                    opacity = true;
                } else transformValue += 1;      
            } else {
                if (transformValue === -2) {
                    transformValue = 7;
                    opacity = true;
                } else transformValue -= 1;                                
            }
            
            item.style.transition = opacity ? 'opacity 0.4s' : 'transform 0.4s';

            _.classReplace(item, item.className, `transformX__${transformValue}`)
        });
    }    
}

export default IndexControl;
