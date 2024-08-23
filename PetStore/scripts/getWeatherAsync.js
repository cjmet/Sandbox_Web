"use strict";
let debug = true;

// tldr: Pick 6m for alerts or 1 hour for forecasts.
//
// Cache for 6 minutes so we can setinterval for 7 minutes which is
// about half of the 15 minutes interval the weather service updates
// it's possible we would want to set this as low as 4 or 5 minutes to
// catch weather alerts, or as high as 4 hours which is the forecast interval.

let shortCacheTime = 60000 * 6; // 7 (-1) minutes so we can catch weather alerts
let longCacheTime = 60000 * 60 * 24; // 24 hours

console.log("loading getWeatherAsync.js");

async function getWeatherAsync(lat, lon, callBack) {
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
      forecastUrlTimeStamp: "",
      shortForecast: "",
      temperature: "",
      temperatureUnit: "",
      probabilityOfPrecipitation: "",
      detailedForecast: "",
      forecastStartTime: "",
      forecastTimeStamp: "",
      observationStationsUrl: "",

      observationStationID: "",
      observationStationName: "",
      observationStationTimeStamp: "",

      observationTimeStamp: "",
      observationShortText: "",
      observationTemperature: "",
      observationTemperatureUnit: "",
    };
    // localStorage.setItem("weather", JSON.stringify(cached));
  } else {
    console.log(
      `[getWeatherAsync] Cached Weather Data [${ElapsedTime(
        cached.forecastTimeStamp + shortCacheTime
      )}]`
    );
    console.log(cached);
  }

  // Deal with Cache-ing of Weather Data
  /* 
  var myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');

  var myInit = {
    method: 'GET',
    headers: myHeaders,
  };
  */

  /* 
  {
    headers: {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    }
  }
  */

  // Get the forecast URL
  let weatherForecastUrl = "";
  if (
    cached.forecastUrl !== null &&
    cached.forecastUrlTimeStamp > Date.now() - longCacheTime
  ) {
    console.log(
      `[getWeatherAsync] Using Cached Weather Url [${ElapsedTime(
        cached.forecastUrlTimeStamp + longCacheTime
      )}]`
    );
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

        // cjm - this is not the best way to handle this, but it works for now
        if (data?.properties === null || data?.properties === undefined) {
          console.log(
            "[getWeatherAsync] *** ABORT ***: Fetch Failed: No Data Available"
          );
          return;
        }

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
    cached?.observationStationTimeStamp > Date.now() - longCacheTime
  ) {
    console.log(
      `[getWeatherAsync] Using Cached Observation Station [${ElapsedTime(
        cached.observationStationTimeStamp + longCacheTime
      )}]`
    );
  } else if (cached?.observationStationsUrl !== "") {
    console.log("[getWeatherAsync] Fetching new Observation Station");
    await fetch(cached.observationStationsUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        // cjm - this is not the best way to handle this, but it works for now
        if (data?.features === null || data?.features === undefined) {
          console.log(
            "[getWeatherAsync] *** ABORT ***: Fetch Failed: No Data Available"
          );
          return;
        }

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
  } else if (cached?.observationTimeStamp > Date.now() - shortCacheTime) {
    console.log(
      `[getWeatherAsync] Using Cached Observation Data [${ElapsedTime(
        cached.observationTimeStamp + shortCacheTime
      )}]`
    );
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

        // cjm - this is not the best way to handle this, but it works for now
        if (data?.features === null || data?.features === undefined) {
          console.log(
            "[getWeatherAsync] *** ABORT ***: Fetch Failed: No Data Available"
          );
          return;
        }

        cached.observationTimeStamp = Date.now();
        cached.observationShortText = String(
          data.features[0].properties.textDescription
        );

        // Temperature, read it first, then convert it to Fahrenheit
        {
          cached.observationTemperature = String(
            data.features[0].properties.temperature.value
          );
          cached.observationTemperatureUnit = String(
            data.features[0].properties.temperature.unitCode
          ).replace(/wmoUnit\:deg/i, "");
          cached.observationTemperature = WeatherTemperatureFahrenheit(
            cached.observationTemperature,
            cached.observationTemperatureUnit
          );
          cached.observationTemperatureUnit = "°f";
        }

        localStorage.setItem("weather", JSON.stringify(cached));
      });
  }

  // Get the forecast
  // https://api.weather.gov/gridpoints/JKL/65,16/forecast
  if (cached?.forecastTimeStamp > Date.now() - shortCacheTime) {
    console.log(
      `[getWeatherAsync] Using Cached Weather Data [${ElapsedTime(
        cached.forecastTimeStamp + shortCacheTime
      )}]`
    );
  } else if (weatherForecastUrl !== "") {
    console.log("[getWeatherAsync] Fetching New weather Data");
    await fetch(weatherForecastUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        // cjm - this is not the best way to handle this, but it works for now
        if (
          data?.properties?.periods === null ||
          data?.properties?.periods === undefined
        ) {
          console.log(
            "[getWeatherAsync] *** ABORT ***: Fetch Failed: No Data Available"
          );
          return;
        }

        cached.shortForecast = String(data.properties.periods[0].shortForecast);

        // Temperature, read it first, then convert it to Fahrenheit
        {
          cached.temperature = String(data.properties.periods[0].temperature);
          cached.temperatureUnit = String(
            data.properties.periods[0].temperatureUnit
          );
          cached.temperature = WeatherTemperatureFahrenheit(
            cached.temperature,
            cached.temperatureUnit
          );
          cached.temperatureUnit = "°f";
        }

        let rain = data.properties.periods[0].probabilityOfPrecipitation.value;
        if (rain === null || rain === undefined || rain === "") {
          rain = 0;
        }
        cached.probabilityOfPrecipitation = String(rain);
        cached.detailedForecast = String(
          data.properties.periods[0].detailedForecast
        );
        cached.forecastStartTime = String(data.properties.periods[0].startTime);
        cached.forecastTimeStamp = Date.now();
        localStorage.setItem("weather", JSON.stringify(cached));
      });
  } else {
    console.log(`[getWeatherAsync] No weatherForecastUrl available`);
  }

  // Call the callback function
  callBack(cached);
  console.log("[getWeatherAsync] Done.");
}

function WeatherTemperatureFahrenheit(temperature, temperatureUnit) {
  // ((fahrenheit - 32) * 5 / 9) °F to °C;
  // celcius to fahrenheit: (celsius * 9 / 5) + 32
  let fahrenheit = -999;
  if (
    temperatureUnit == "F" ||
    temperatureUnit == "f" ||
    temperatureUnit == "°F" ||
    temperatureUnit == "°f"
  )
    fahrenheit = Math.round(temperature);
  else fahrenheit = Math.round((temperature * 9) / 5 + 32);
  console.log(
    `[WeatherTemperatureFahrenheit] ${temperature} ${temperatureUnit} = ${fahrenheit} °F`
  );
  return fahrenheit;
}
