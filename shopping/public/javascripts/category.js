class Category {
    constructor() {
        this.sectionIndex = 0,
        this.slider = document.querySelector(".category.slider"),
        this.controls = document.querySelector(".sub_main.controls"),
        this.onEvent();
    }

    onEvent() {
        window.addEventListener("load", () => {
            this.loadRandomItems(10);
        });
        
        this.controls.addEventListener("click" , (event) => {
            this.onClick(event);
        });
        

    }

    onClick(event) {
        const itemShowing = 5;
        const action = event.target.dataset.action;
        console.log(action);
        if(action) this[action](itemShowing);
    }

    moveLeft(categoryCount) {
        this.sectionIndex = (this.sectionIndex > 0 ) ? this.sectionIndex - 1 : categoryCount;
        this.slider.style.transform = `translate(` + (this.sectionIndex) * -10 + `%)`;
    }

    moveRight(categoryCount) {
        this.sectionIndex = (this.sectionIndex < categoryCount ) ? this.sectionIndex + 1 : 0;
        this.slider.style.transform = `translate(` + (this.sectionIndex) * -10 + `%)`;
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
                    this.slider.appendChild(ul);

                    for (let i = 0; i < imgCount; i++) {
                        const data = json.mallEventList;
                        const index = this.getRandomNum(0, data.length - 1);
                        this.renderItemList(data[index].imgurl, data[index].text, data[index].text2);
                    }
            })
            .catch(err => console.log(err));
    }

    renderItemList(img, title, text) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const ul = this.slider.querySelectorAll(".item_list");

        
        li.appendChild(div);
        div.classList.add("item_wrapper");
        div.innerHTML = `<img class = "item_list_img" src = ${img}><span class = "img_title">${title}</span><span class = "img_text">${text}</span>`
        
        ul[ul.length-1].appendChild(li);
    }
}

export default Category;