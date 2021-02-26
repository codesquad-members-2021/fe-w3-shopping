/* --------------------------------------------------------------------- */
/* --------▶︎▶︎▶︎ Template 클래스: 홈페이지에 필요한 템플릿을 만들고 띄운다. ◀︎◀︎◀︎--------*/
/* --------------------------------------------------------------------- */

/* Q: template을 클래스 밖으로 뺴라고 하셨었는데 이렇게되면 안에서 쓰이는 변수들까지 밖으로 빼야함...다른 방법이 있을까?
- [ ] json데이터에서 받은 정보로 이미지 요청하는 방법 찾아볼 것. => fillUpImg()
*/

let productName;
let explanation;
const cellTemplate = `
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
    }
    fillUpImg(node, ImgJsonData){

    }
}