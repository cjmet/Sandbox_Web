// stict mode
// "use strict";

console.log("Welcome to Project Catopia!");

DemoMessage(
  "Welcome to Catopia!",
  "All Praise Our Feline Overlords! (JavaScript)"
);

// Weather Button
document.getElementById("WeatherButton").addEventListener("click", function () {
  if (document.getElementById("WeatherButton").textContent != "W") {
    document.getElementById("WeatherButton").textContent = "W";
  } else {
    document.getElementById("WeatherButton").textContent = "w";
  }

  // Weather Button Clicked
  getWeatherLocationAsync(function (weather) {
    console.log("[Weather Button] Weather Data");
    // console.log(weather);
    document.getElementById("WeatherDiv").style.display = "none";
    document.getElementById("WeatherObservationsDiv").innerHTML =
      "Observation Station: <br>" +
      weather.observationStationID +
      " " +
      weather.observationStationName +
      "<br>" +
      weather.observationShortText +
      " " +
      weather.observationTemperature +
      " " +
      weather.observationTemperatureUnit +
      "<br>";
    document.getElementById("WeatherForecastDiv").innerHTML =
      "<br>Forecast: <br>" +
      weather.shortForecast +
      "<br>" +
      weather.temperature +
      " " +
      weather.temperatureUnit +
      "<br>" +
      weather.probabilityOfPrecipitation +
      "% chance of precipitation<br>" +
      weather.detailedForecast +
      "<br>" +
      weather.forecastStartTime;
  });
});
// /Weather Button
