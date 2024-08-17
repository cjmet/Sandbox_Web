// stict mode
"use strict";

console.log("Welcome to Project Catopia!");
DemoMessage(
  "Welcome to Catopia!",
  "All Praise Our Feline Overlords! (JavaScript)"
);

document.getElementById("WeatherButton").addEventListener("click", function () {
  if (document.getElementById("WeatherButton").textContent != "W") {
    document.getElementById("WeatherButton").textContent = "W";
  } else {
    document.getElementById("WeatherButton").textContent = "w";
  }

  //   ... more code here ...
  //
  // "forecast": "https://api.weather.gov/gridpoints/JKL/65,16/forecast",
  // "forecastHourly": "https://api.weather.gov/gridpoints/JKL/65,16/forecast/hourly",
  // "forecastGridData": "https://api.weather.gov/gridpoints/JKL/65,16",
  // "observationStations": "https://api.weather.gov/gridpoints/JKL/65,16/stations",
  //
  // https://api.weather.gov/stations/KJKL/observations/latest
  // https://api.weather.gov/gridpoints/JKL/65,16/forecast?units=us

  let lat, lon;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      // API URL
      const base =
        "https://api.weather.gov/gridpoints/JKL/65,16/forecast?units=us";

      // Calling the API
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          document.getElementById("WeatherDiv").innerHTML =
            data.properties.periods[0].shortForecast +
            "<br>" +
            data.properties.periods[0].temperature +
            data.properties.periods[0].temperatureUnit.toLowerCase() +
            "<br>" +
            data.properties.periods[0].probabilityOfPrecipitation.value +
            "% chance of precipitation" +
            "<br>" +
            data.properties.periods[0].detailedForecast;
        });
    });
  }

  // /fetch
});
// /WeatherButton
