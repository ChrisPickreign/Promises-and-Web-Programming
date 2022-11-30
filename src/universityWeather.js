import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchUniversities } from "./fetchUniversities.js"

export function fetchUniversityWeather(query) {
  // TODO
  function addToObj(num, uni, obj) { 
    obj[uni] = Number(num);
    return obj;
  }
  function mapHelper(uni) {
    return new Promise((resolve,reject) => {
      fetchLongitudeAndLatitude(uni)
      .then(coord => fetchCurrentWeather(coord.lon, coord.lat))
      .then(temp => ({name: uni, avg: Number(temp.temperature_2m.reduce((acc, e) => acc + e, 0)/temp.temperature_2m.length)}))
      .then(result => resolve(result))
    })
  }
  let promUniArr = fetchUniversities(query).then(uniArr => 
    uniArr.length !== 0 ? Promise.resolve(uniArr) : Promise.reject(new Error("No results found for query.")));
  return promUniArr.then(arr => Promise.all(arr.map(mapHelper)))
    .then(a => a.reduce((acc, e) => addToObj(Number(e.avg), e.name, acc), {}))
    .then(obj => addToObj(Object.values(obj).reduce((acc, e) => acc + e, 0)/Object.values(obj).length, "totalAverage", obj));
}
  
export function fetchUMassWeather() {
  // TODO
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  // TODO
  return fetchUniversityWeather("University of California");
}