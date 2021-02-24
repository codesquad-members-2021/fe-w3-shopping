fetch('http://localhost:3000/data/1')
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.log('에러입니다', error));
