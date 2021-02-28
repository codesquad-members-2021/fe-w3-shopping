import _ from '../util.js';

class DataManager {
    constructor({serverURL}) {        
        this.serverURL = serverURL;   // 서버 주소      // http://localhost:3001
    }

    /**
     * @param {String} url
     */
    _fetchData(url) {        
        return fetch(url)
            .then((res) => res.json())
            .then((data) => data)
            .catch((error) => console.error(error));
    }
    
    // 더보기 데이터 전부
    getAllMoreData() {
        const url = `${this.serverURL}/api/moreData`;
        return this._fetchData(url);
    }

    // 더보기 데이터 (버튼)
    /**
     * @param {Number} pageIdx
     */
    getMoreData(pageIdx) {
        const url = `${this.serverURL}/api/moreData/${pageIdx}`;
        return this._fetchData(url);
    }

    // 상단 Best 상품 (왼쪽)
    getMainBestData() {
        const url = `${this.serverURL}/api/bestData`;
        return this._fetchData(url);
    }

    // 상단 캐러셀 상품 (오른쪽)
    getMainCarouselData() {
        const url = `${this.serverURL}/api/mainCarouselData`;
        return this._fetchData(url);
    }

    // 하단 캐러셀
    getHotCarouselData() {
        const url = `${this.serverURL}/api/hotCarouselData`;
        return this._fetchData(url);
    }
}

export default DataManager;
