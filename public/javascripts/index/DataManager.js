import _ from '../util.js';

class DataManager {
    constructor({serverURL}) {        
        this.serverURL = serverURL;   // 서버 주소      // http://localhost:3001
    }

    /**
     * @param {String} urlPath
     */
    fetchData(urlPath) {
        const url = `${this.serverURL}${urlPath}`;
        return fetch(url)
            .then((res) => res.json())
            .then((data) => data)
            .catch((error) => console.error(error));
    }
}

export default DataManager;
