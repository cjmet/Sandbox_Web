// Current Weather   -   Only version 2.5 is free-ish. 3.0 is less free-ish.
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// 5-Day Weather and 3-Hour Weather
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// Basic Maps
// https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API key}

// Geocoding
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

if (false) {
  let weatherCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
  console.log(`Weather Current Url: ${weatherCurrentUrl}`);
  fetch(weatherCurrentUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.getElementById("WeatherDiv").innerText = JSON.stringify(
        data
      ).replace(/,/g, ", ");
    });
}

if (false) {
  let weatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
  console.log(`Weather Forecast Url: ${weatherForecastUrl}`);
  fetch(weatherForecastUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.getElementById("WeatherForecastDiv").innerText = JSON.stringify(
        data
      ).replace(/,/g, ", ");
    });
}

if (false) {
  let weatherMapUrl = `https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=${weatherApiKey}`;
  console.log(`Weather Map Url: ${weatherMapUrl}`);
  fetch(weatherMapUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.getElementById("WeatherMapDiv").innerText = JSON.stringify(
        data
      ).replace(/,/g, ", ");
    });
}
