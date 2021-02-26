import _ from '../util.js';

class DataManager {
    /**
     * @param {String} url
     */
    _fetchData(url) {        
        return fetch(url)
            .then((res) => res.json())
            .then((data) => data)
            .catch((error) => console.error(error));
    }

    getAllMoreData() {
        const url = `http://localhost:3001/api/moreData`;
        return this._fetchData(url);
    }

    /**
     * @param {Number} pageIdx
     */
    getMoreData(pageIdx) {
        const url = `http://localhost:3001/api/moreData/${pageIdx}`;
        return this._fetchData(url);
    }

    getHotCarouselData() {
        const url = `http://localhost:3001/api/planning`;
        return this._fetchData(url);
    }
}

export default DataManager;
