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

  // Weather API ===============================================================
  function getWeather() {
  let weatherApiKey = "";
  fetch("/config.json")
    .then(function (config) {
      return config.json();
    })
    .then(function (data) {
      weatherApiKey = data.weatherApiKey;
    })
    .then(async function () {
      console.log(`WeatherApiKey[J3]: ${weatherApiKey}`);

      /*
      Get Current Location
      Read Cached Location
      if Current != null 
        if Cached != null && Current != Cached Then Update Cached
      else if Current == null 
        if cached != null Current = Cached
        else if cached == null then Prompt for Location
      */
      let lat, lon;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          lon = position.coords.longitude;
          lat = position.coords.latitude;
          console.log(`[45] Latitude: ${lat}, Longitude: ${lon}`);
        });
        console.log(`[47] Latitude: ${lat}, Longitude: ${lon}`);
        // API Call

        if (false) {
          let weatherForecastUrl =
            "https://api.weather.gov/gridpoints/JKL/65,16/forecast?units=us";
          await fetch(weatherForecastUrl)
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
        }

        // /Api Call
      }
    });
  }
  getWeather();
  // /Weather API ==============================================================
});
// /WeatherButton
