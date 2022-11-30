export function fetchUniversities(query) {
  // TODO
  const searchURL = new URL('https://university-web-api.herokuapp.com/search');
  searchURL.searchParams.append("name", query);
  return fetch(searchURL.toString())
  .then (response => response.ok 
  ? Promise.resolve(response.json())
  : Promise.reject(new Error("response not ok!")))
  .then(json => json.map(uni => uni.name));
}

