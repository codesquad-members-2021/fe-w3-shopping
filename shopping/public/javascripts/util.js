export const _ = {
    CA: (target, className) => target.classList.add(className),

    CR: (target, className) => target.classList.remove(className),

    CT: (target, className) => target.classList.toggle(className),

    $: (selector, base = document) => base.querySelector(selector),

    $A: (selector, base = document) => base.querySelectorAll(selector),

    E: (target, type, listener, useCapture = false) => target.addEventListener(type, listener, useCapture)
}