import _ from '../util.js';

class DataManager {
    /**
     * @param {String} url
     */
    _fetchData(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(
                (res) => {
                    if (res.ok) {
                        res.json().then((data) => resolve(data));
                    } else {
                        reject(new Error('Server Error'));
                    }
                },
                (error) => {
                    reject(new Error(error.message));
                },
            );
        });
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
