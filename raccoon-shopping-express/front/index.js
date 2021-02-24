fetch('http://localhost:3000/api/mileageList')
  .then(function (response) {
    return response.json();
  })
  .then((data) => console.log(data))
  .then(function (text) {
    console.log('Request successful', text);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
