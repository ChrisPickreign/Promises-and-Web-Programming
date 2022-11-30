import { URL } from "node:url"; // Import the URL class from the url library
import fetch from "node-fetch"; // Third-party fetching library, fetch fully supported in Node.js 18+

export function makeSearchURL(query) {
  // Construct a new URL object using the resource URL
  const searchURL = new URL("https://geocode-cache.herokuapp.com/search");

  // Access the searchParams field of the constructed url
  // The field holds an instance of the URLSearchParams
  // Add a new "q" parameter with the value of the functions input
  searchURL.searchParams.append("q", query);

  return searchURL.toString(); // Return the resulting complete URL
}

export function fetchLongitudeAndLatitude(query) {
  // TODO Chris
  const sUrl = makeSearchURL(query);
  return fetch(sUrl)
    .then(response => response.ok ? response.json() : new Error(response.statusText))
    .then(json => Array.isArray(json) && json.length > 0
        ? Promise.resolve({lon: Number(json[0].lon) , lat: Number(json[0].lat)})
        : Promise.reject(new Error("No results found for query."))
    );
}

