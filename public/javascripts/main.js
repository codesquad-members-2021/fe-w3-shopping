const promise = fetch("http://localhost:3000/image")
  .then(response => response.json())
  .then(json => console.log(json));
//  .then(response => console.log(response.json()));
