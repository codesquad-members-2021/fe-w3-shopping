fetch('http://localhost:3000/api/mileageList', { mode: 'cors' })
  .then((response) => {
    let data = response.json();

    return data;
  })
  .then((data) => console.log(data.mileageList[0].imgurl))
  .then((status) => console.log('Request successful', status))
  .catch((error) => console.log('Request failed', error));

const mileageSlide = document.querySelector('#mileageSilde');
console.log(mileageSlide);
