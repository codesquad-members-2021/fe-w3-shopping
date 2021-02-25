class Header {
    constructor() {
        this.nav = document.querySelector(".nav"),
        this.hashtag = document.querySelector(".nav_hashtag")
    }

    eventHandler() {
        window.addEventListener('resize', this.toggleHastag.bind(this));
    }

    toggleHastag() {
        if(this.nav.offsetWidth < 1500) {
            this.hashtag.classList.add("hide");
        } else {
            this.hashtag.classList.remove("hide");
        }
    }
}


new Header().eventHandler();
