export const domSelect = (selector, multi = false, base = document) => {
  if (multi) return base.querySelectorAll(selector);
  else return base.querySelector(selector);
};
