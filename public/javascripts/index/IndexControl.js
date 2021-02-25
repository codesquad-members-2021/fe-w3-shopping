import _ from '../util.js';
import DataManager from './DataManager.js'; // 추후 제거, 여기서 작업하기 편하게 넣어놓은것.

class IndexControl {
    /**
     * @param {DataManager} dataManager
     */
    constructor(dataManager, moreWrapSelector) {
        this.body = document.body;
        this.dataManager = dataManager;
        this.moreWrapper = _.$(moreWrapSelector);

        this.moreView = _.$('.content__more__view', this.moreWrapper);        
    }

    init() {
        this._setClickEvent(this.body);        
        this._createMoreViewItems(_.$('.content__more__btn', this.moreWrapper));
    }

    _setClickEvent(body) {
        _.addEvent(body, 'click', (e) => this._clickEventHandler(e));
    }
    
    _clickEventHandler(e) {
        const { target } = e;
        const targetClassName = `.${target.className}`;
        if (!targetClassName) return;

        const node = _.closestSelector(target, targetClassName);
        const bFlag = node === target && `.${node.className}` === targetClassName;
        
        if (bFlag) {
            switch (targetClassName) {
                case '.content__more__btn': {                                                            
                    this._createMoreViewItems(target);                                         
                    break;
                }
                default:
                    break;
            }
        }
    }
    

    // 더보기 데이터가 들어갈 틀 생성
    async _createMoreViewItems(moreBtn) {

        try {            
            const moreData = await this.dataManager.getMoreData(moreBtn.value);            
            const ul = _.$('ul', this.moreView);
            
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


    async _updateMoreBtnInnerText(moreBtn) {                
        try {
            const data = await this.dataManager.getAllMoreData();            
            moreBtn.innerText = `더보기(${moreBtn.value * 5}/${data.length}건)`;
        } catch (error) {
            console.error(error.message);
        }
    }
    
}

export default IndexControl;
