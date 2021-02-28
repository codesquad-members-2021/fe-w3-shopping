const isError = (res) => res.status !== 200;

const api = (url) => (callback, ...fns) => (arg, ...optionals) =>
  fetch(url)
    .then((res) => (isError(res) ? new Error("response has a problem") : res.json()))
    .then((data) => {
      if (!data) return new Error("No data");
      callback(...fns)(data, arg, ...optionals);
    })
    .catch((err) => console.log(err));

export { api };
