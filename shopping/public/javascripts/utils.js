const isError = (res) => res.status !== 200;

const api = (url) => (callback, ...fns) => (arg, ...optionalFns) =>
  fetch(url)
    .then((res) => (isError(res) ? new Error("response has a problem") : res.json()))
    .then((data) => {
      if (!data) return;
      callback(...fns)(data, arg);
      if (optionalFns.length) optionalFns.forEach((fn) => fn());
    })
    .catch((err) => console.log(err));
// 콜백함수를 리턴하는 방식도 생각해볼것

const setHtmls = (fn1, fn2) => (arg1, arg2) => {
  const result = fn1(arg1);
  fn2(arg2)(result);
};

const insertAdjacent = (fn) => (data, html) => {
  const result = fn(data);
  html.insertAdjacentHTML("beforeend", result);
};

export { api, setHtmls, insertAdjacent };
