const urls = {
  event: "http://localhost:3000/event.json",
  mileageList: "http://localhost:3000/mileageList.json",
  mallEventList: "http://localhost:3000/mallEventList.json",
  homeContents: "http://localhost:3000/homeContents.json",
};

const isError = (res) => res.status !== 200;

const api = (url) => (callback, ...fns) => (arg, ...optionalFns) =>
  fetch(url)
    .then((res) => (isError(res) ? new Error("response has a problem") : res.json()))
    .then((data) => {
      if (!data) return new Error("No data");
      callback(...fns)(data, arg);
      if (optionalFns.length) optionalFns.forEach((fn) => fn());
    })
    .catch((err) => console.log(err));

export { urls, api };
