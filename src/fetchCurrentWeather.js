export function fetchCurrentWeather(longitude, latitude) {
  // TODO
  const apiURL = new URL("https://api.open-meteo.com/v1/forecast");
  apiURL.searchParams.append("latitude", latitude);
  apiURL.searchParams.append("longitude", longitude);
  apiURL.searchParams.append("hourly", "temperature_2m");
  apiURL.searchParams.append("temperature_unit", "fahrenheit");
  let usable = apiURL.toString();

  return fetch(usable)
    .then(
      response => response.ok
      ? Promise.resolve(response)
      : Promise.reject(new Error("Information not found."))
    )
    .catch(error => console.log("Unable to return: "))
    .then(response => (response.json()))
    .then(json => {
      return {time: json.hourly.time, temperature_2m: json.hourly.temperature_2m }
    })
}