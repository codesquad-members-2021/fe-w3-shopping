const _ = {
    $: (strSelector, target = document) => target.querySelector(strSelector),
    $All: (strSelector, target = document) => target.querySelectorAll(strSelector),
    classAdd: (target, ...classNames) => target.classList.add(...classNames),
    classRemove: (target, ...classNames) => target.classList.remove(...classNames),  
    classToggle: (target, className) => target.classList.toggle(className),
    classContains: (target, className) => target.classList.contains(className),
    classReplace: (target, oldClass, newClass) => target.classList.replace(oldClass, newClass),
    createElement: (tagType) => document.createElement(tagType),
    createTextNode: (strTxt) => document.createTextNode(strTxt),    
    addEvent: (target, eventType, callback, options = false) => target.addEventListener(eventType, callback, options),    
    setAttr: (target, strAttrName, strValue) => target.setAttribute(strAttrName, strValue),    
    getAttr: (target, strAttrName) => target.getAttribute(strAttrName),
    removeAttr: (target, strAttrName) => target.removeAttribute(strAttrName),
    closestSelector: (target, strSelector) => target.closest(strSelector),    
    appendChild: (target, child) => target.appendChild(child),
    appendChildren: (target, ...children) => children.forEach((child) => target.appendChild(child)),
};

export default _;