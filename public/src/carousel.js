

// loadHomeContentsData();
const mainSlide = document.querySelector(".main-banner__slide");
const slideBundle = document.querySelector(".slide-bundle");
// let lastList = 
let children = slideBundle.children;
let len = children.length;
// console.log(children);
// console.log(slideBundle.lastElementChild);
mainSlide.addEventListener('click', ({target}) => {
    if(target.className === "fas fa-chevron-right") {
        slideBundle.classList.toggle('right');
        setTimeout(() => {
            slideBundle.insertBefore(children[len-1],children[0]);
            slideBundle.classList.toggle('right');
        }, 500);
    }

    else if(target.className === "fas fa-chevron-left") {
        slideBundle.classList.toggle('left');
        setTimeout(() => {
            slideBundle.appendChild(slideBundle.firstElementChild);
            slideBundle.classList.toggle('left');
        }, 500);
    }
})

mainSlide.addEventListener('mouseover', ({target}) => {
    if(target.dataset.key === "list1" && children[1].firstElementChild.className !== "slide__link1") {
        if(children[0].firstElementChild.className === "slide__link1") {
            slideBundle.classList.toggle('over-right');
            slideBundle.insertBefore(children[len-1],children[0]);
            slideBundle.classList.toggle('over-right');
        }
        else {
            slideBundle.classList.toggle('over-left');
            slideBundle.appendChild(slideBundle.firstElementChild);
            slideBundle.classList.toggle('over-left');
        }
    }

    else if(target.dataset.key === "list2" && children[1].firstElementChild.className !== "slide__link2") {
        if(children[0].firstElementChild.className === "slide__link2") {
            slideBundle.classList.toggle('over-right');
            slideBundle.insertBefore(children[len-1],children[0]);
            slideBundle.classList.toggle('over-right');
        }
        else {
            slideBundle.classList.toggle('over-left');
            slideBundle.appendChild(slideBundle.firstElementChild);
            slideBundle.classList.toggle('over-left');
        }
    }

    else if(target.dataset.key === "list3" && children[1].firstElementChild.className !== "slide__link3") {
        if(children[0].firstElementChild.className === "slide__link3") {
            slideBundle.classList.toggle('over-right');
            slideBundle.insertBefore(children[len-1],children[0]);
            slideBundle.classList.toggle('over-right');
        }
        else {
            slideBundle.classList.toggle('over-left');
            slideBundle.appendChild(slideBundle.firstElementChild);
            slideBundle.classList.toggle('over-left');
        }
    }
})

