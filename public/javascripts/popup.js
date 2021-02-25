let categoryBtn = document.querySelector(".categoryBtn")
let container = document.querySelector(".container")
let hiddenSetTime;
console.log(categoryBtn)
console.log(container)

categoryBtn.addEventListener("mouseenter", function(){
    container.style.visibility = "visible";
})

categoryBtn.addEventListener("mouseleave", function(){
    container.style.visibility = "hidden";
})

container.addEventListener("mouseover", function(){
    container.style.visibility = "visible";
})

container.addEventListener("mouseout", function(){
    hiddenSetTime = setTimeout( () => container.style.visibility = "hidden", 500);
        
})

document.addEventListener("mousemove", function( {target} ){
    if(target.className === "popupImg"){
        clearTimeout(hiddenSetTime);
        container.style.visibility = "visible";
    }
})