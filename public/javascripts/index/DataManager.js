import _ from '../util.js';

class DataManager {
    /**     
     * @param {Number} pageIdx 
     */
    getMoreData(pageIdx) {
        fetch(`http://localhost:3001/api/more/${pageIdx}`)
            .then((response) => response.json())
            .then((myJson) => {
                console.log(myJson);               
                console.log(JSON.stringify(myJson));
            })
            .catch((err) => console.log('err', err));
    }
}

export default DataManager;
