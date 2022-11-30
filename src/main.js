
import { fetchCurrentWeather } from "./fetchCurrentWeather";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude";
import { fetchUniversities } from "./fetchUniversities";
import { fetchUniversityWeather } from "./fetchUniversities";
import { readFromJSONFile } from "./fileUtility";
import { writeToJSONFile } from "./fileUtility";

/*Yearly average temperature of mass: 47.8 F per:http://www.worldclimate.com/climate/us/massachusetts
Yearly average temperature of cal: 61.15 F per: http://www.worldclimate.com/climate/us/california
Calculation gives us the average yearly difference between states is 13.35 deg F
Coords of alaska: long -150, lat 65, Coords of hawaii: long -155.8, lat 19
*/
let avg = 13.35;
let umass = fetchUMassWeather().totalAverage;
let ucal = fetchUCalWeather().totalAverage;
let diff = ((umass >= ucal)? umass - ucal :ucal - umass);
let obj = {};
if(diff > avg){
    let totalDiff = diff - avg;
    obj.result = ("The current difference in temperature between UMass and UCal campuses is " + diff + ". This is " + totalDiff + " degrees Fahrenheit greater than the yearly average difference between Massachusetts and California!")
}
else if(diff < avg){
    let totalDiff = avg - diff;
    obj.result = ("The current difference in temperature between UMass and UCal campuses is " + diff + ". This is " + totalDiff + " degrees Fahrenheit lower than the yearly average difference between Massachusetts and California!")
}
else{
    obj.result = ("The current difference in temperature between UMass and UCal campuses is " + diff+ ". This is the same as the yearly average difference between Massachusetts and California!")
}
writeToJSONFile('./output.json', obj);
