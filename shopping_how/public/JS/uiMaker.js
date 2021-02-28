/* --------------------------------------------------------------------- */
/* --------▶︎▶︎▶︎ Template 클래스: 홈페이지에 필요한 템플릿을 만들고 띄운다. ◀︎◀︎◀︎--------*/
/* --------------------------------------------------------------------- */

const boxTemplate = (prefix, src, title, content) => `
<li>
    <img class="cell__lowehalf_pic" src="${prefix}${src}">
    <span class="cell__product_name">${title}</span>
    <span class="cell__explanation">${content}</span>
    <span class="cell__icon"></span>
</li>`;
const caroselItemTemplate = (prefix, src, title, salePrice, percent, originPrice) => `
<li>
    <img class="item_pic" src="${prefix}${src}">
    <span class="item_name">${title}</span>
    <div class="item_txt_box">
        <span class="current-price">${salePrice}원</span>
        <span class="discount-percentage">${percent}%</span>
    </div>
    <span class="original-price">${originPrice}</span>
</li>`;

export default class UIMaker {
    constructor(_, reference){
        this._ = _;
        this.ref = reference;
        this.section = ['best', 'event', 'box', 'carousel'];
        this.pair = {
            "best": reference.bestSeller,
            "event": reference.slide,
            "box": reference.cells,
            "carousel": reference.items
        }
    }
    renderUI(URL){
        this.section.forEach(section => {
            this.getEachData(URL, section);
        });
    }
    getEachData(URL, section){
       fetch(`${URL}/image?section=${section}`)
        .then(res => res.json())
        .then(data => this.fillUpImg(section, data))
        .catch(err => alert(err));
    }
    fillUpImg(section, { prefix, list }){
        const targetNode = this.pair[section];
        let firstFiveEl = list.slice(0, 5);
        let str;
        switch(section) {
            case "best":
                str = `<img src="${prefix}${list[0].src}" alt="${section}">`;
                targetNode.innerHTML = str;
                break;
            case "event":
                str = list.reduce((acc, cur) => acc += `<li class="panel"><img src="${prefix}${cur.src}"></li>`,'');
                targetNode.innerHTML = str;
                break;
            case "box":
                this.renderBox(prefix, firstFiveEl, targetNode);
                break;
            case "carousel":
                this.renderCarosel(prefix, firstFiveEl, targetNode);
                break;
        }
    }

    renderBox(prefix, firstFiveEl, targetNode) {
        firstFiveEl.forEach((cur, idx) => {
            const str = boxTemplate(prefix, cur.src, cur.title, cur.content);
            targetNode[idx].innerHTML = str;
        });
    }

    renderCarosel(prefix, firstFiveEl, targetNode) {
        firstFiveEl.forEach((cur, idx) => {
            const price = parseInt(cur.price);
            const commaPrice = this.addCommaToNumber(price);
            const origPrice = Math.round( price / (100 - cur.percent)) * 100;
            const commaOriginPrice = this.addCommaToNumber(origPrice);
            const str = caroselItemTemplate(prefix, cur.src, cur.title, commaPrice, cur.percent, commaOriginPrice);
            targetNode[idx].innerHTML = str;
        });
    }

    addCommaToNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}