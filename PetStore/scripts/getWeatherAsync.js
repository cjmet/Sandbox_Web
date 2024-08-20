"use strict";

console.log("loading getWeatherAsync.js");

async function getWeatherAsync(lat, lon) {
  console.log(`[getWeatherAsync] Latitude: ${lat}, Longitude: ${lon}`);
  // Get Location and check cached location, ... use, update, etc.
  // check the cached forcasturl, cwa, gridId, gridX, gridY ... use, update, etc.
  // ...

  // Notes
  // -----
  // https://api.weather.gov/points/36.82565689086914%2C-83.32009887695312
  // https://api.weather.gov/gridpoints/JKL/65,16/stations
  // https://api.weather.gov/stations/${Station_ID}/observations

  // We need the GridID, GridX, GridY to get the forecast
  let cached = {
    forecastUrl: null,
    urlTimeStamp: null,
    shortForcast: null,
    temperature: null,
    temperatureUnit: null,
    probabilityOfPrecipitation: null,
    detailedForecast: null,
    forecastTimestamp: null,
  };

  {
    cached.forecastUrl = localStorage.getItem("weatherForecastUrl");
    cached.urlTimeStamp = localStorage.getItem("weatherForecastUrlTimestamp");
    cached.shortForcast = localStorage.getItem("weatherShortForcast");
    cached.temperature = localStorage.getItem("weatherTemperature");
    cached.temperatureUnit = localStorage.getItem("weatherTemperatureUnit");
    cached.probabilityOfPrecipitation = localStorage.getItem(
      "weatherProbabilityOfPrecipitation"
    );
    cached.detailedForecast = localStorage.getItem("weatherDetailedForecast");
    cached.forecastTimestamp = localStorage.getItem("weatherForecastTimestamp");
  }

  let weatherForecastUrl = "";
  if (
    cached.forecastUrl != null &&
    cached.urlTimeStamp > Date.now() - 3600000 * 24
  ) {
    console.log(
      `[getWeatherAsync] Using cached weather url: ${cached.forecastUrl}`
    );
    weatherForecastUrl = cached.forecastUrl;
  } else {
    let stationLocationUrl = `https://api.weather.gov/points/${lat},${lon}`;
    await fetch(stationLocationUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(
          `[stationLocation] cwa: ${data.properties.cwa} GridID: ${data.properties.gridId}, GridX: ${data.properties.gridX}, GridY: ${data.properties.gridY} `
        );
        console.log(
          `[stationLocation] Relative Location: ${data.properties.relativeLocation.properties.city}, ${data.properties.relativeLocation.properties.state}`
        );
        console.log(
          `[stationLocation] Forecast URL: ${data.properties.forecast}`
        );
        weatherForecastUrl = data.properties.forecast;
        localStorage.setItem("weatherForecastUrl", weatherForecastUrl);
        localStorage.setItem("weatherForecastUrlTimestamp", Date.now());
      });
  }

  if (true && weatherForecastUrl != "") {
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
        console.log("Weather data loaded");
      });
  } else {
    console.log(`[getWeatherAsync] No weatherForecastUrl available`);
  }
  console.log("[getWeatherAsync] Done.");
}
