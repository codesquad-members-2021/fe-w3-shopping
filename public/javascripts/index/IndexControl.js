import _ from '../util.js';
import DataManager from './DataManager.js'; // 추후 제거, 여기서 작업하기 편하게 넣어놓은것.

class IndexControl {
    /**
     * @param {DataManager} dataManager
     */
    constructor(dataManager, moreWrapSelector, mainCarouselWrapper) {
        this.dataManager = dataManager;
        this.moreWrapper = _.$(moreWrapSelector);
        this.mainCarouselWrapper = _.$(mainCarouselWrapper);
    }

    init() {
        this._setMoreWrapperClickEvent(this.moreWrapper);
        this._setMainCarouselClickEvent(this.mainCarouselWrapper);
        this._setMainCarouselMouseoverEvent(this.mainCarouselWrapper)

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

    // [2-1] 상단 캐러샐 (content__main__carousel) 이벤트 등록 (이전, 다음)
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

            item.style.transform = `translate3d(${transformX}, 0, 0)`;
        });
    }

    // 상단의 작은 span들 [- - -] 상태 업데이트
    _updateMainCarouselPagingSpan(animationItemIdx) {
        const pagingInnerSpanList = [...(_.$All('.paging__inner > span', this.mainCarouselWrapper))];
        const findPrevCurrent = pagingInnerSpanList.find((span) => _.classContains(span, 'current'));
        _.classRemove(findPrevCurrent, 'current');
        _.classAdd(pagingInnerSpanList[animationItemIdx], 'current');
    }

    // [2-2] 상단 캐러셀 mouseover 이벤트 등록
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
    
    // [3] 하단 캐러셀 관련

    // ---
}

export default IndexControl;
