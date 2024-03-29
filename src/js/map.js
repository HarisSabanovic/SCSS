"use strict";


//hämta element från html
const searchButtonEl = document.getElementById("searchBtn");
const inputEl = document.getElementById("search");
const mapEl = document.getElementById("map");

let map = L.map('map').setView([62.03668594355586, 17.256738663000018], 3);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



//klick på sök knapp
searchButtonEl.addEventListener("click", displayLocation);


async function displayLocation() {
  let userInput = inputEl.value;
  const url =  `https://nominatim.openstreetmap.org/search?format=json&q=${userInput}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      let latitude = data[0].lat;
      let longitude = data[0].lon;

      map.setView([latitude, longitude], 16);
      
      let singleMarker = L.marker([latitude, longitude]).addTo(map);

      mapEl.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude},${longitude},${latitude}&layer=mapnik`;
  } catch (error) {
      console.log(error);
  }
}