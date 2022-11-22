import { URL } from "node:url";
import fetch from "node-fetch";
import path from "node:path";
import { getSystemErrorMap } from "node:util";
export function fetchCurrentWeather(longitude, latitude) {
  // TODO
  const apiURL = new URL("https://api.open-meteo.com/v1/forecast");
  apiURL.searchParams.append("latitude", latitude);
  apiURL.searchParams.append("longitude", longitude);
  apiURL.searchParams.append("hourly", "temperature_2m");
  apiURL.searchParams.append("temperature_unit", "fahrenheit");
  let usable = apiURL.toString();

fetch(usable)
  .then((response) => response.json())
  .then(
    json=> Array.isArray(json.time) && Array.isArray(json.temperature_2m)
    ? Promise.resolve(json.hourly)
    : Promise.reject(new Error("Information not found."))
  )
  .catch(error => console.log("Unable to retrieve data: " + error))
  }
 /*.then(Promise.resolve(json.hourly))
 .catch(error => console.log("Unable to retrieve data"));
 */
 /*.then(hourly => {
    const time = hourly.map(hourly => hourly.time)
  })
  .then(hourly => {
    const temperature_2m = hourly.map(hourly => hourly.temperature_2m)
  })
  .then()
  */
