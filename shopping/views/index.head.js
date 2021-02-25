const styles = (...links) => {
  return links.reduce((acc, val) => {
    acc += `<link rel="stylesheet" href="${val}" />`;
    return acc;
  }, ``);
};

const scripts = (...srcs) => {
  return srcs.reduce((acc, val) => acc + `<script type="module" src="${val}"></script>`, ``);
};

const setHead = (styles, scripts) => {
  const obj = { styles, scripts };
  return obj;
};

const setBody = (header, main, footer) => {
  const obj = { header, main, footer };
  return obj;
};

module.exports = { styles, scripts, setHead, setBody };
