export function fetchUniversities(query) {
  // TODO
  const searchURL = new URL('https://university-web-api.herokuapp.com/search');
  searchURL.searchParams.append("name", query);
  return fetch(searchURL.toString())
  .then(response => response.json())
  .then(data => data.map(uni => uni.name))
  .catch(new Error("No results found"));
}

