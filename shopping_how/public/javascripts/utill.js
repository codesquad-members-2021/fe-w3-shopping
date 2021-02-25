/* --------------------------------------------------------------------- */
/* ----------▶︎▶︎▶︎ Utill 객체: DOM조작에 필요한 유틸리티를 갖고 있다. ◀︎◀︎◀︎------------*/
/* --------------------------------------------------------------------- */

const _ = {
    $: (selector) => document.querySelector(selector),
    $all: (selector) => document.querySelectorAll(selector),
    addClass: (node, className) => node.classList.add(className),
    removeClass: (node, className) => node.classList.remove(className),
    setToggle: (node, className) => node.classList.toggle(className),
    contains: (node, className) => node.classList.contains(className)
}

export default _;