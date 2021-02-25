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


    // [2] 상단 캐러샐 (content__main__carousel) 이벤트 등록 (이전, 다음)
    _setMainCarouselClickEvent(mainCarouselWrapper) {
        _.addEvent(mainCarouselWrapper, 'click', (e) => this._mainCarouselClickEventHandler(e));
    }    

    _mainCarouselClickEventHandler(e) {
        const { target } = e;
        const pagingBtn = _.closestSelector(target, '.paging--prev') || _.closestSelector(target, '.paging--next');
        this._updateEventCarouseAnimation(pagingBtn);
    }

    // 상단 캐러셀 동작 (이전, 다음 btn)
    _updateEventCarouseAnimation(pagingBtn) {
        if (!pagingBtn) return;
        const exType = pagingBtn.className.indexOf('prev') > -1 ? 'prev' : 'next';
        const itemList = Array.from(_.$All('.slide > .item', this.mainCarouselWrapper));
        
        itemList.forEach((item, i) => {                
            const minus = (item.style.transform.indexOf('-') > -1) ? true : false;
            const tmp = item.style.transform.match(/([0-9]+%)/g)[0];
            let transformX = minus ? `-${tmp}` : tmp;
            let flag = false;
            
            if (exType === 'prev') {
                switch (transformX) {
                    case '-100%':   
                        transformX = '0%';  
                        break;                    
                    case '0%':
                        transformX = '100%'; 
                        break;
                    case '100%': 
                        transformX = '-100%';   
                        flag = true;
                        break;
                    default:    break;
                }
            } else {
                switch (transformX) {
                    case '-100%': 
                        transformX = '100%';    
                        flag = true;
                        break;                   
                    case '0%': 
                        transformX = '-100%';
                        break;                   
                    case '100%': 
                        transformX = '0%';
                        break;                   
                    default:    break;
                }
            }
            item.style.transition = flag ? 'opacity 0.4s' : 'transform 0.4s';
            item.style.transform = `translate3d(${transformX}, 0, 0)`;            
        })
    }
}

export default IndexControl;
