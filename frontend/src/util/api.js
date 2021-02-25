const END_POINT = "http://localhost:3333/api";

const API = {
  get: {
    bannerInfo() {
      const result = fetch(`${END_POINT}/planning-events`)
        .then((response) => {
          return response.json();
        })
        .then((serializedData) => {
          // console.log(JSON.stringify(serializedData));
          return serializedData;
          // return serializedData;
          // return JSON.stringify(serializedData);
        });
        
      return result;
    }
  }
}

export default API;