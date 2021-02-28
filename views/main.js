const promise = fetch("http://localhost:3000/image") // 여기서 서버에 요청함
                                                     // 그럼 router의 image.js에서 파일을 읽어서 보내줌. 
.then(response => response.json())
.then(json => {
    best(json);
    carousel(json);
    mouse_slide(json);
    plus(json);
});

const best = (img) => {
    const best_prefix = img.best.prefix;
    const img_url = Object.values(img.best.list);

    const best = document.querySelector(".best100");

    best.innerHTML = `<img src=${best_prefix + img_url[0].src}>`
}

// 캐러셀 슬라이더에 이미지 넣기
const carousel = (img) => {
    const img_prefix = img.event.prefix;
    const array = [];
    const img_url = Object.values(img.event.list);
    
    for(const a of img_url) {
        array.push(img_prefix+a.src);
    }
    
    const BOX = document.querySelector(".carousel_slide");
    
    let str='';
    for(let i=0; i<array.length; i++) {
        str += `<img class="items" src="${array[i]}"></img>`;
    }

    BOX.innerHTML = str;
}

const mouse_slide = (img) => {
    
    const img_prefix = img.mouse_slide.prefix;
    const img_url = img.mouse_slide.list;
    const five_slide = document.querySelector(".top_imglist");

    let str = '';
    let counter = 0;
    
    for(let k=0; k<img_url.length/5; k++) {
        for(let i=counter; i < counter+5; i++) {
            str += `<li>
                        <a href="#">
                            <span><img src="${img_prefix + img_url[i].src}"></span>
                            <strong>${img_url[i].title}</strong>
                            <span class="img_text">${img_url[i].st}</span>
                            <span class="tema_icon"></span>
                        </a>
                    </li>`
        }
        counter += 5;
        five_slide.insertAdjacentHTML("beforeend",`<ul>${str}</ul>`);
        str = '';
    }
    // five_slide.insertAdjacentElement("beforeend",ul);
        
};


// 더보기 구현
const hot_deal = document.querySelector(".hot_dael_box");
const plus_img = document.querySelector(".plus_img");

const plus = (img) => {
    const plus_prefix = img.box.prefix;
    const img_url = Object.values(img.box.list);

    let str ='';
    let counter=5;

    const ul_tag = document.createElement("ul");
    ul_tag.className = "middle_img";
    for(let i=0; i<5; i++) {
        str += `<li>
                <span><img src="${plus_prefix + img_url[i].src}"></span>
                <span class="hot_deal_text">${img_url[i].title}</span>
                <span class="span_box">
                    <span class="hot_deal_won">${img_url[i].price}원</span>
                </span>
                </li>`;
    };
    ul_tag.innerHTML = str;
    hot_deal.insertAdjacentElement("beforeend",ul_tag);
    str = '';

    plus_img.innerHTML =`더보기 ${counter} / ${img_url.length}`;


    plus_img.addEventListener("click", () => {
        const ul_tag = document.createElement("ul");
        ul_tag.className = "middle_img";
        for(let i=counter; i<counter+5; i++) {
            str += `<li>
                    <span><img src="${plus_prefix + img_url[i].src}"></span>
                    <span class="hot_deal_text">${img_url[i].title}</span>
                    <span class="span_box">
                        <span class="hot_deal_won">${img_url[i].price}원</span>
                    </span>
                    </li>`;
        }
        counter += 5;

        ul_tag.innerHTML = str;
        hot_deal.insertAdjacentElement("beforeend",ul_tag);
        str = '';
        
        plus_img.innerHTML =`더보기 ${counter} / ${img_url.length}`;
        if(counter === img_url.length) {
            plus_img.innerHTML =`더보기 ${counter} / ${img_url.length}</br>
                                이제 사진 없지롱`;
        }
    });
}