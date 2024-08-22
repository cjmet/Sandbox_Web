
"use strict";

let cacheTime = 60000 * 5; // 5? minutes just in case we are in a car and chasing a tornado?

console.log("loading getLocationAsync.js");

async function getWeatherLocationAsync(callBack) {
  let cached = { lat: null, lon: null, timestamp: null };

  // localStorage.setItem('user', JSON.stringify(userArray));
  // const userData = JSON.parse(localStorage.getItem('user'));

  cached = JSON.parse(localStorage.getItem("location"));
  console.log(`[getLocationAsync] Checking Location Data`);

  if (cached.lat != null && cached.lon != null && cached.timestamp != null && cached.timestamp > Date.now() - cacheTime) {
    console.log(
      `[getLocationAsync] Using cached location: ${cached.lat}, ${cached.lon}, ${cached.timestamp}, [${ElapsedTime(cached.timestamp + cacheTime)}]`
    );
    getWeatherAsync(cached.lat, cached.lon, callBack);
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        console.log(`[getLocationAsync] Latitude: ${lat}, Longitude: ${lon}`);
        localStorage.setItem(
          "location",
          JSON.stringify({
            lat: String(lat),
            lon: String(lon),
            timestamp: Date.now(),
          })
        );
        getWeatherAsync(lat, lon, callBack);
      },

      (error) => {
        console.log(`[getLocationAsync] Error: ${error.message}`);
        if (cached.lat != null && cached.lon != null) {
          console.log(
            `[getLocationAsync] Using cached location: ${cached.lat}, ${cached.lon}, ${cached.timestamp}`
          );
          getWeatherAsync(cached.lat, cached.lon, callBack);
        }
      }
    );
  } else {
    console.log("Geolocation data is not available.");
  }
}
