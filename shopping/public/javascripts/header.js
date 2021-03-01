class Header {
    constructor() {
        this.nav = document.querySelector(".nav"),
        this.hashtag = document.querySelector(".nav_hashtag"),
        this.onEvent();
    }

    onEvent() {
        window.addEventListener('load', this.toggleHastag.bind(this));
        window.addEventListener('resize', this.toggleHastag.bind(this));
    }

    toggleHastag() {
        if(this.nav.offsetWidth < 1550) {
            this.hashtag.classList.add("hide");
        } else {
            this.hashtag.classList.remove("hide");
        }
    }
}


new Header();
