import '../scss/style.scss';

const SERVER = 'http://localhost';
const PORT = 3000;

const requestURL = `${SERVER}:${PORT}/`;
const homeContentsJSON = 'json/homeContents.json';
const planningEventJSON = 'json/planningEvent.json';

// fetch(requestURL + planningEventJSON)
//   .then((res) => res.json())
//   .then((json) => console.log(JSON.stringify(json)))
//   .catch(console.error);