import _ from '../util.js';

class DataManager {
    /**
     * @param {Number} pageIdx
     */
    getMoreData(pageIdx) {
        // 1) 이렇게 반환하여 BodyControl에서 async - await 해주면 됨
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3001/api/more/${pageIdx}`)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        res.json().then((data) => resolve(data));
                    } else {
                        console.error(res.statusText);
                    }
                })
                .catch((err) => reject(err));
        });

        // 2) 이건 안됨....
        // return fetch(`http://localhost:3001/api/more/${pageIdx}`)
        //     .then((res) => {
        //         if (res.status === 200 || res.status === 201) {
        //             res.json().then((data) => {
        //                 return data
        //             });
        //         } else {
        //             console.error(res.statusText);
        //         }
        //     })
        //     .catch((err) => err);
    }
}

export default DataManager;
