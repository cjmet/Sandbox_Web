// stict mode
// "use strict";

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

  getLocationCallBack(getWeatherAsync);
});
