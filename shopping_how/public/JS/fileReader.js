/* --------------------------------------------------------------------- */
/* --------▶︎▶︎▶︎ FileReader 클래스: 서버로부터 json 데이터를 받고 저장한다. ◀︎◀︎◀︎------*/
/* --------------------------------------------------------------------- */

// let best;
// let event;
// let carousel;
// let box;
// - [ ] 원래 fileReader라는 건 서버가 하는 역할. getBest, getEvent, get carosel 등으로 나눠야 함. async awiat 사용하거나 parameter로 콜백함수를 던져주기.
// - [ ] spread operator 사용: const {best, event, carousel} = data[0]; 이렇게!!
// - [ ] url은 무조건 parameter로 받아와야 한다. 소스코드에 url이 하드코딩 되어있으면 절~~~~~~~대 안된다!!
// - [ ] 이렇게 데이터를 한번에 받아올 게 아니라, 제이슨처럼 서버단에서 경로를 지정해줘야 한다.

class FileReader {

    getFileData(){
        const promise = fetch("http://localhost:3000/image")
        .then(response => console.log(response.json()))
        // .then(data => this.saveEachData(data))
        .catch(err => alert(err));
    }
    // saveEachData(data){
    //     best = data[0].best;
    //     event = data[0].event;
    //     carousel = data[0].carousel;
    //     box = data[0].box;
    // }
}

export { FileReader };

