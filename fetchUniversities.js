export function fetchUniversities(query) {
  // TODO
  function nameHelp(a, name, elem) {
    if ('name' in elem && elem.name === name) { a.push(elem.name); }
  }
  let arr = [];
  fetch('https://university-web-api.herokuapp.com/search?name=University+of+Massachusetts').then(response => response.json())
  .then(Array.isArray(json.results) && json.results.length > 0 ? 
    Promise.resolve(json.results[0]) 
  : Promise.reject(new Error("No results found"))
  )
  .then(data => fetch(path.join(data.url, "/sections/"))) 
  .then(res => res.json())
  .then(data => nameHelp(arr, query, data));
  return arr;
}
