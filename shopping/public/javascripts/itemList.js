class itemList {
    constructor() {
        this.itemUl = document.querySelector(".item_list")
    }

    eventHandler() {
        window.addEventListener("load", this.loadRandomImage.bind(this));
    }

    getRandomIdx(m, n) {
        return m + Math.floor((n - m + 1) * Math.random());
    }

    loadRandomImage() {
        for (let i = 0; i < 5; i++) {
            const URL = "http://localhost:3000/homeData.json"
            fetch(URL)
                .then(response => response.json())
                .then(json => {
                    const data = json.mallEventList;
                    const index = this.getRandomIdx(0, data.length - 1);
                    this.fillItemUl(data[index].imgurl, data[index].text, data[index].text2);
                });

        }
    }

    fillItemUl(img, title, text) {
        const li = document.createElement("li");
        li.innerHTML = `<img class = "item_list_img" src = ${img}> <br> ${title} <br> ${text}`
        this.itemUl.appendChild(li);
    }
}

new itemList().eventHandler();