export const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  genEl: ({ tagName, classNames, template, attributes} ) => {
    const $el = document.createElement(tagName);
    $el.classList.add(...classNames);
    $el.innerHTML = template;

    for (const [k, v] in attributes)
      $el.setAttribute(k, v);

    return $el;
  },
};