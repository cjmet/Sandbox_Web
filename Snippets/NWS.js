// "forecast": "https://api.weather.gov/gridpoints/JKL/65,16/forecast",
// "forecastHourly": "https://api.weather.gov/gridpoints/JKL/65,16/forecast/hourly",
// "forecastGridData": "https://api.weather.gov/gridpoints/JKL/65,16",
// "observationStations": "https://api.weather.gov/gridpoints/JKL/65,16/stations",
//
// https://api.weather.gov/stations/KJKL/observations/latest
// https://api.weather.gov/gridpoints/JKL/65,16/forecast?units=us

if (true) {
  const base = "https://api.weather.gov/gridpoints/JKL/65,16/forecast?units=us";
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
}
