class itemList {
    constructor() {
        this.itemList = document.querySelector(".item_list"),
            this.showMoreBtn = document.querySelector(".show_more"),
            this.smallContents = document.querySelector(".small_contents"),
            this.onEvent();
    }

    onEvent() {
        window.addEventListener("load", () => {
            this.loadRandomItems(5);
        });
        this.showMoreBtn.addEventListener("click", () => {
            this.loadRandomItems(5);
        });
    }

    getRandomNum(m, n) {
        return m + Math.floor((n - m + 1) * Math.random());
    }

    loadRandomItems(imgCount) {
        const URL = "http://localhost:3000/homeData.json"
        fetch(URL)
            .then(response => response.json())
            .then(json => {

                    const ul = document.createElement("ul");
                    ul.classList.add("item_list");
                    this.smallContents.appendChild(ul);

                    for (let i = 0; i < imgCount; i++) {
                        const data = json.mallEventList;
                        const index = this.getRandomNum(0, data.length - 1);
                        this.renderItemList(data[index].imgurl, data[index].text, data[index].text2);
                    }
            });
    }


    renderItemList(img, title, text) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const ul = this.smallContents.querySelectorAll(".item_list");

        
        li.appendChild(div);
        div.classList.add("item_wrapper");
        div.innerHTML = `<img class = "item_list_img" src = ${img}><span class = "img_title">${title}</span><span class = "img_text">${text}</span>`
        
        ul[ul.length-1].appendChild(li);
    }



}

new itemList();