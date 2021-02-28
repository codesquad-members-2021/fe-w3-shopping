// main.js에서 html 그려주는 함수들

const setHtmls = (fn1, fn2) => (arg1, arg2, ...optionals) => {
  const result = fn1(arg1, ...optionals);
  fn2(arg2)(result);
};

const insertAdjacent = (fn) => (data, html) => {
  const result = fn(data);
  html.insertAdjacentHTML("beforeend", result);
};

const insertContents = (...htmls) => (...contents) => {
  // 해당 html 자리에 해당 콘텐츠 삽입
  if (htmls.length !== contents.length) throw new Error("CANNOT INSERT STRS INTO HTMLS");
  htmls.forEach((html, index) => (html.innerHTML = contents[index]));
};

export { setHtmls, insertAdjacent, insertContents };
