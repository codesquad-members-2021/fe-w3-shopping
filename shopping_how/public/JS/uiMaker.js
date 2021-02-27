/* --------------------------------------------------------------------- */
/* --------▶︎▶︎▶︎ Template 클래스: 홈페이지에 필요한 템플릿을 만들고 띄운다. ◀︎◀︎◀︎--------*/
/* --------------------------------------------------------------------- */

const boxTemplate = (productName,  explanation) => `
<li>
    <a href="#">
        <img class="cell__lowehalf_pic" src="/images/test.png">
        <span class="cell__product_name">${productName}</span>
        <span class="cell__explanation">${explanation}</span>
        <span class="cell__icon"></span>
    </a>
</li>`;

export default class UIMaker {
    constructor(_, reference){
        this._ = _;
        this.ref = reference;
        this.pair = {
            "best": reference.bestSeller,
            // "event": ,
            // "box": ,
            // "carousel":
        }
    }

    renderImg(){
        const section = ['best', 'event', 'box', 'carousel'];
        section.forEach(key => {
            this.getData(key);
        });
    }

    getData(key){
       fetch(`http://localhost:3000/image?section=${key}`)
        .then(res => res.json())
        .then(data => this.fillUpImg(key, data))
        .catch(err => alert(err));
    }

    fillUpImg(key, ImgJsonData){
        const parentNode = this.pair[key];
        console.log("1. parentNode:", this.ref.best);
        console.log("2. key:", key);
        //key를 기준으로 template이 추가되어야 하는 위치의 node를 담은 객체를 만든다.
        const str = `<img src="${ImgJsonData.prefix}${ImgJsonData.list[0].src}" alt="${key}">`;
        console.log("3. this.pair.best:", this.pair.best);
        parentNode.innerHTML = str;
    }
}