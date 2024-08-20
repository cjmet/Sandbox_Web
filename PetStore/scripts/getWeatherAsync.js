"use strict";

console.log("loading getWeatherAsync.js");

async function getWeatherAsync(lat, lon) {
  console.log(`[getWeatherAsync] Latitude: ${lat}, Longitude: ${lon}`);
  // Get Location and check cached location, ... use, update, etc.
  // check the cached forecasturl, cwa, gridId, gridX, gridY ... use, update, etc.
  // ...

  // Notes
  // -----
  // https://api.weather.gov/points/36.82565689086914%2C-83.32009887695312
  // https://api.weather.gov/gridpoints/JKL/65,16/stations
  // https://api.weather.gov/stations/${Station_ID}/observations

  // We need the GridID, GridX, GridY to get the forecast

  // localStorage.setItem('user', JSON.stringify(userArray));
  // const userData = JSON.parse(localStorage.getItem('user'));

  // Read Local Storage, if note available, create it
  let cached = JSON.parse(localStorage.getItem("weather"));
  if (cached === null) {
    console.log("[getWeatherAsync] No Cached Weather Data");
    cached = {
      forecastUrl: "",
      forecastUrlTimeStamp: 0,
      shortForecast: "",
      temperature: -999,
      temperatureUnit: "",
      probabilityOfPrecipitation: -9,
      detailedForecast: "",
      forecastTimeStamp: "",
      observationStationsUrl: "",

      observationStationID: "",
      observationStationName: "",
      observationStationTimeStamp: 0,

      observationTimeStamp: 0,
      observationShortText: "",
      observationTemperature: -999,
      observationTemperatureUnit: "",
    };
    localStorage.setItem("weather", JSON.stringify(cached));
  }
  console.log("[getWeatherAsync] Cached Weather Data");
  console.log(cached);

  // Get the forecast URL
  let weatherForecastUrl = "";
  if (
    cached.forecastUrl !== null &&
    cached.forecastUrlTimeStamp > Date.now() - 3600000 * 24
  ) {
    console.log(`[getWeatherAsync] Using Cached Weather Url`);
    weatherForecastUrl = cached.forecastUrl;
  } else {
    console.log("[getWeatherAsync] Fetching New Weather Url");
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
        weatherForecastUrl = String(data.properties.forecast);
        cached.forecastUrl = String(weatherForecastUrl);
        cached.observationStationsUrl = String(
          data.properties.observationStations
        );
        cached.forecastUrlTimeStamp = Date.now();
        localStorage.setItem("weather", JSON.stringify(cached));
      });
  }

  // Get "Featured" Observation Station ... from Stations
  // https://api.weather.gov/stations/KI35/observations
  if (
    cached?.observationStationsUrl !== null &&
    cached?.observationStationTimeStamp > Date.now() - 3600000 * 24
  ) {
    console.log("[getWeatherAsync] Using Cached Observation Station");
  } else {
    console.log("[getWeatherAsync] Fetching new Observation Station");
    await fetch(cached.observationStationsUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(
          `[ObservationStations] Station ID: ${data.features[0].properties.stationIdentifier}`
        );
        console.log(
          `[ObservationStations] Station Name: ${data.features[0].properties.name}`
        );
        cached.observationStationID = String(
          data.features[0].properties.stationIdentifier
        );
        cached.observationStationName = String(
          data.features[0].properties.name
        );
        cached.observationStationTimeStamp = Date.now();
        localStorage.setItem("weather", JSON.stringify(cached));
      });
  }

  // Get Current Observation
  if (cached?.observationStationID === "") {
    console.log("[getWeatherAsync] No Observation Station ID available");
  } else if (cached?.observationTimeStamp > Date.now() - 3600000 * 1) {
    console.log("[getWeatherAsync] Using Cached Observation Data");
    /* ... */
  } else {
    console.log("[getWeatherAsync] Fetching New Observation Data");
    let observationUrl = `https://api.weather.gov/stations/${cached.observationStationID}/observations`;
    await fetch(observationUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(
          `[Observation] Timestamp: ${data.features[0].properties.timestamp}`
        );
        console.log(
          `[Observation] Weather: ${data.features[0].properties.textDescription}`
        );
        console.log(
          `[Observation] Temperature: ${data.features[0].properties.temperature.value}`
        );
        console.log(
          `[Observation] Temperature Unit: ${data.features[0].properties.temperature.unitCode.replace(/wmoUnit\:deg/i, "")}`
        );
        cached.observationTimeStamp = Date.now();
        cached.observationShortText = String(
          data.features[0].properties.textDescription
        );
        cached.observationTemperature = String(
          data.features[0].properties.temperature.value
        );
        cached.observationTemperatureUnit = String(
          data.features[0].properties.temperature.unitCode
        ).replace(/wmoUnit\:deg/i, "");
        localStorage.setItem("weather", JSON.stringify(cached));
      });
  }

  // Get the forecast
  // https://api.weather.gov/gridpoints/JKL/65,16/forecast
  if (cached?.forecastTimeStamp > Date.now() - 3600000 * 1) {
    console.log("[getWeatherAsync] Using Cached Weather Data");
  } else if (weatherForecastUrl !== "") {
    console.log("[getWeatherAsync] Fetching New weather Data");
    await fetch(weatherForecastUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        cached.shortForecast = String(data.properties.periods[0].shortForecast);
        cached.temperature = String(data.properties.periods[0].temperature);
        cached.temperatureUnit = String(
          data.properties.periods[0].temperatureUnit
        );
        cached.probabilityOfPrecipitation = String(
          data.properties.periods[0].probabilityOfPrecipitation.value
        );
        cached.detailedForecast = String(
          data.properties.periods[0].detailedForecast
        );
        cached.forecastTimeStamp = Date.now();
        localStorage.setItem("weather", JSON.stringify(cached));
      });
  } else {
    console.log(`[getWeatherAsync] No weatherForecastUrl available`);
  }

  {
    console.log("[getWeatherAsync] Weather Data HTML");
    document.getElementById("WeatherDiv").innerHTML =
      "Current Observations: <br>" +
      cached.observationTemperature +
      cached.observationTemperatureUnit +
      " and " +
      cached?.observationShortText +
      "<br> &nbsp <br>" +
      "Forecast: " +
      "<br>" +
      cached?.shortForecast +
      "<br>" +
      cached?.temperature +
      cached?.temperatureUnit.toLowerCase() +
      "<br>" +
      cached?.probabilityOfPrecipitation.value +
      "% chance of precipitation" +
      "<br>" +
      cached?.detailedForecast;
  }

  console.log("[getWeatherAsync] Done.");
}
