"use strict";

console.log("loading getLocationAsync.js");

async function getLocationCallBack(callBack) {
  let cached = { lat: null, lon: null, timestamp: null };

  // localStorage.setItem('user', JSON.stringify(userArray));
  // const userData = JSON.parse(localStorage.getItem('user'));

  cached = JSON.parse(localStorage.getItem("location"));

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        console.log(`[getLocationAsync] Latitude: ${lat}, Longitude: ${lon}`);
        localStorage.setItem(
          "location",
          JSON.stringify({ lat: String(lat), lon: String(lon), timestamp: Date.now() })
        );
        callBack(lat, lon);
      },

      (error) => {
        console.log(`[getLocationAsync] Error: ${error.message}`);
        if (cached.lat != null && cached.lon != null) {
          console.log(
            `[getLocationAsync] Using cached location: ${cached.lat}, ${cached.lon}, ${cached.timestamp}`
          );
          callBack(cached.lat, cached.lon);
        }
      }
    );
  } else if (cached.lat != null && cached.lon != null) {
    console.log(
      `[getLocationAsync] *** ERROR *** \n\t\t Using cached location: ${cached.lat}, ${cached.lon}, ${cached.timestamp}`
    );
    callBack(cached.lat, cached.lon);
  } else {
    console.log("Geolocation data is not available.");
  }
}
