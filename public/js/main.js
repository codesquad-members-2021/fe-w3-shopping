fetch('http://127.0.0.1:3000/data/')
  .then((response) => response.json())
  .then((json) => console.log(json));
