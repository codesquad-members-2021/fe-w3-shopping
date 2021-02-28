/* --------------------------------------------------------------------- */
/* --------▶︎▶︎▶︎ Template 클래스: 홈페이지에 필요한 템플릿을 만들고 띄운다. ◀︎◀︎◀︎--------*/
/* --------------------------------------------------------------------- */

const boxTemplate = (prefix, src, title, content) => `
<li>
    <a href="#">
        <img class="cell__lowehalf_pic" src="${prefix}${src}">
        <span class="cell__product_name">${title}</span>
        <span class="cell__explanation">${content}</span>
        <span class="cell__icon"></span>
    </a>
</li>`;

export default class UIMaker {
    constructor(_, reference){
        this._ = _;
        this.ref = reference;
        this.pair = {
            "best": reference.bestSeller,
            "event": reference.slide,
            "box": reference.cells,
            // "carousel":
        }
    }

    renderUI(){
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

    fillUpImg(key, {prefix, list}){
        const targetNode = this.pair[key];
        let str;

        switch(key) {
            case "best":
                str = `<img src="${prefix}${list[0].src}" alt="${key}">`;
                targetNode.innerHTML = str;
                break;
            case "event":
                str = list.reduce((acc, cur) => acc += `<li class="panel"><img src="${prefix}${cur.src}"></li>`,'');
                targetNode.innerHTML = str;
                break;
            case "box":
                const firstFiveEl = list.slice(0, 5);
                firstFiveEl.forEach((cur, idx) => {
                    str = boxTemplate(prefix, cur.src, cur.title, cur.content);
                    targetNode[idx].innerHTML = str;
                });
                break;
            case "carousel":
        }

        // targetNode.innerHTML = str;
    }
}