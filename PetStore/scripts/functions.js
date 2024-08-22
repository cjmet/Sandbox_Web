// "use strict";

console.log("loading functions.js");

function DemoMessage(message, description) { 
    document.getElementById('MainDataTitleId').innerHTML = message;
    document.getElementById('MainDataDescriptionId').innerHTML = description;
}

function ElapsedTime(startTime) {
    let endTime = new Date();
    // let elapsed = Math.abs(endTime - startTime);
    let elapsed = (endTime - startTime);
    let seconds = Math.trunc(elapsed / 1000);
    let minutes = Math.trunc(seconds / 60);
    let hours = Math.trunc(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    
    if (hours) return `${hours}h`;
    if (minutes) return `${minutes}m`;
    if (seconds) return `${seconds}s`;

    return `${hours}h ${minutes}m ${seconds}s`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  