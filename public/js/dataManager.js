export function dataManager(url, path, filename) {
  return fetch(`${url}/${path}/${filename}`)
    .then((response) => response.json())
    .catch((err) => alert(`에러입니다_dataManager.js 확인: ${err}`));
}
