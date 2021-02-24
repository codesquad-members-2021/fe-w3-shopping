let data;
const promise = fetch("http://localhost:3000/image")
  .then(response => response.json())
  .then(json => {
    data = json;
    console.log(data);
  });
