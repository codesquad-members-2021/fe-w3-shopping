export class DataManager {
  #planningEventJSON = 'planningEvent.json';
  #homeContentsJSON = 'homeContents.json';

  constructor() {
    this.host = 'http://localhost';
    this.port = 3000;
    this.path = 'data';
    this.count = 5;
  }

  responsedJSONData() {
    return fetch(
      `${this.host}:${this.port}/${this.path}/${this.#planningEventJSON}`
    )
      .then((response) => response.json())
      .catch((err) => alert(`에러입니다_dataManager.js 확인: ${err}`));
  }
}
