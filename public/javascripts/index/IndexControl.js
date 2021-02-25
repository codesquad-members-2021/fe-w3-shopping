import _ from '../util.js';
import DataManager from './DataManager.js'; // 추후 제거, 여기서 작업하기 편하게 넣어놓은것.

class IndexControl {
    /**
     * @param {DataManager} dataManager
     */
    constructor(dataManager, moreWrapSelector, eventCarouselWrapper) {        
        this.dataManager = dataManager;
        this.moreWrapper = _.$(moreWrapSelector);
        this.eventCarouselWrapper = _.$(eventCarouselWrapper);
    }

    init() {
        this._setMoreWrapperClickEvent(this.moreWrapper);        
        this._setEventCarouselClickEvent(this.eventCarouselWrapper);

        this._createMoreViewItems(_.$('.content__more__btn', this.moreWrapper));
    }

    // [1] 더보기 Wrapper (content__more) Click 이벤트 등록 
    _setMoreWrapperClickEvent(moreWrapper) {
        _.addEvent(moreWrapper, 'click', (e) => this._moreWrapperClickEventHandler(e));
    }
    
    _moreWrapperClickEventHandler(e) {
        const { target } = e;
        const targetClassName = `.${target.className}`;                

        if (targetClassName === '.content__more__btn')
            this._createMoreViewItems(target);        
    }
    
    // 더보기 데이터가 들어갈 틀 생성
    async _createMoreViewItems(moreBtn) {
        try {            
            const moreData = await this.dataManager.getMoreData(moreBtn.value);            
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

            await this._updateMoreBtnInnerText(moreBtn);
            await moreBtn.value++;
        } catch (error) {
            console.error(error.message);
        }
    }

    async _updateMoreBtnInnerText(moreBtn) {                
        try {
            const data = await this.dataManager.getAllMoreData();            
            moreBtn.innerText = `더보기(${moreBtn.value * 5}/${data.length}건)`;
        } catch (error) {
            console.error(error.message);
        }
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


    // [2] 상단 캐러샐 (content__event__carousel) 이벤트 등록
    _setEventCarouselClickEvent(eventCarouselWrapper) {
        _.addEvent(eventCarouselWrapper, 'click', (e) => this._eventCarouselClickEventHandler(e));
    }    

    _eventCarouselClickEventHandler(e) {
        const { target } = e;
        
        if (_.closestSelector(target, '.paging--prev')) {
            // 왼쪽으로..


        } else if (_.closestSelector(target, '.paging--next')) {
            // 오른쪽으로..
            const itemList = Array.from(_.$All('.slide > div', this.eventCarouselWrapper));
            itemList.forEach((item, i) => {
                console.log(item.style.transform)
                console.log(_.getAttr(item, 'transform'));
            })
        }
    }

}

export default IndexControl;
