"use strict";


//hämta element från html
const searchButtonEl = document.getElementById("searchBtn");
const inputEl = document.getElementById("search");
const mapEl = document.getElementById("map");

let map = L.map('map').setView([62.03668594355586, 17.256738663000018], 3);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});
Stadia_AlidadeSmoothDark.addTo(map);

//klick på sök knapp
searchButtonEl.addEventListener("click", displayLocation);

function displayLocation() {
    let userInput = inputEl.value;
    const url =  `https://nominatim.openstreetmap.org/search?format=json&q=${userInput}`;

    fetch(url)
          .then(response => response.json())
          .then(data => {

            let latitude = data[0].lat;
            let longitude = data[0].lon;

            map.setView([latitude, longitude], 16);
            
            let singleMarker = L.marker([latitude, longitude]).addTo(map);

            mapEl.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude},${longitude},${latitude}&layer=mapnik`;
          })

          .catch(error => {
            console.log(error);
          })
};

