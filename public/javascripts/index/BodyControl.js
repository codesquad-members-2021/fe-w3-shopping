import _ from '../util.js';
import DataManager from './DataManager.js'; // 추후 제거, 여기서 작업하기 편하게 넣어놓은것.

class BodyControl {
    /**
     * @param {DataManager} dataManager
     */
    constructor(dataManager) {
        this.body = document.body;
        this.dataManager = dataManager;
    }

    init() {
        this._setClickEvent(this.body);
    }

    _setClickEvent(body) {
        _.addEvent(body, 'click', (e) => this._clickEventHandler(e));
    }

    async _clickEventHandler({ target }) {
        const targetClassName = target.className;
        if (!targetClassName) return;

        const node = _.closestClassName(target, targetClassName);
        const bFlag = node === target && node.className === targetClassName;

        if (bFlag) {
            switch (targetClassName) {
                case 'content__more__btn': {
                    target.value++;
                    const s = await this.dataManager.getMoreData(target.value);
                    await console.log(s);
                                        
                    break;
                }
                default:
                    break;
            }
        }
    }
}

export default BodyControl;
