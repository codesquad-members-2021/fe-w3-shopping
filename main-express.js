const init = () => {
  getIndex();
}

function getIndex() {
  const abc = fetch('http://localhost:3000/', {
    method: 'GET',
    headers:{
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'X-Requested-With',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json()
  .then(json => console.log(json)));
};

init();