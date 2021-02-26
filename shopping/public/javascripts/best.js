class Best {
    constructor() {
        this.best = document.querySelector(".best");
    }

    eventHandler() {
        window.addEventListener("load", this.loadRandomImage.bind(this));
    }

    getRandomNum(m,n) {
        return m + Math.floor((n-m+1)*Math.random());
    }

    loadRandomImage() {
        const URL = "http://localhost:3000/homeData.json"
        const RandomNum = this.getRandomNum(0, 2);
        fetch(URL)
        .then(response => response.json())
        .then(json => this.renderImage(json.bestList[RandomNum].imgurl));
    }

    renderImage(img) {
        this.best.innerHTML = `<img src = ${img}>`
    }
}

new Best().eventHandler();