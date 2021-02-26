const promise = fetch("http://localhost:3000/image")
.then(response => response.json())
.then(json => carousel(json));


// 캐러셀 슬라이더에 이미지 넣기
const carousel = (img) => {
    const img_prefix = img.event.prefix;
    const array = [];
    const img_url = Object.values(img.event.list);
    
    for(const a of img_url) {
        array.push(img_prefix+a.src);
    }
    
    const BOX = document.querySelector(".carousel_slide");
    
    BOX.innerHTML = `
                    <img class="items" src="${array[0]}">
                    <img class="items" src="${array[1]}">
                    <img class="items" src="${array[2]}">
                    `;

}