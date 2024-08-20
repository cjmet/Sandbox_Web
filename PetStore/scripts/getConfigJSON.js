"use strict";

var CONFIG;
getConfigJSON();

async function getConfigJSON() {
  console.log("loading getConfigJSON.js");

  return await fetch("/config.json")
    .then(function (config) {
      return config.json();
    })
    .then(function (data) {
      CONFIG = data;
    });
}
