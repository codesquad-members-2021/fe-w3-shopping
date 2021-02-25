// export const api = {
//   sendRequest: (url, method = "GET") => {
//     return fetch(url)
//       .then((res) => res.json())
//       .then((data) => data);
//   },
// };

export default function api(url) {
  return fetch(url).then((res) => res.json());
}
