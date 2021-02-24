const api = {
  getItem : (type, page = 1, count = 5) => {
    return api.sendRequest(`item?type=${type}&page=${page}&count=${count}`);
  },
  getBoxItemLength : () => {
    return api.sendRequest(`length`);
  },
  sendRequest: (query, method = 'GET') => {
    return fetch(`http://localhost:3000/${query}`, {
      method,
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()
    .then(json => json));
  }
}

module.exports = api;