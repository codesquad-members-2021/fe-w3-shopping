export const domSelector = ({ selector, multi = false, base = document }) => {
  if (multi) return base.querySelectorAll(selector);
  else return base.querySelector(selector);
};

export const getData = (url) => fetch(url).then((res) => res.json());
