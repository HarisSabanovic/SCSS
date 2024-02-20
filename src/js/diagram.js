"use strict";

const url = "https://studenter.miun.se/~mallar/dt211g/";

import Chart from 'chart.js/auto';

window.onload = init;

async function init() {
    try {
        const response = await fetch(url);
        let stat = await response.json();

        //kör funktion som kör diagram;
        displayBarDiagram(stat);
        displayCircleDiagram(stat);

    } catch {
        console.log("error")
    }
}

function displayBarDiagram(stat) {

    const barChartEl = document.getElementById("barChart");

    // Filtrera kurser av typen "Kurs"
    const kursData = stat.filter(entry => entry.type === "Kurs");

    // Sortera kurserna efter antal sökande i fallande ordning och välj de 6 första
    const top6Kurser = kursData.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 6);

    // Skapa data för stapeldiagrammet
    const kursLabels = top6Kurser.map(entry => entry.name);
    const kursDataTotal = top6Kurser.map(entry => entry.applicantsTotal);



    // Skapa stapeldiagram för de 6 mest sökta kurserna
    new Chart(barChartEl, {
    type: 'bar',
    data: {
        labels: kursLabels,
        datasets: [{
            label: 'De mest sökta kurserna',
            data: kursDataTotal,
            backgroundColor: '#538167',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

function displayCircleDiagram(stat) {

    const circleChartEl = document.getElementById("circleChart");

    // Filtrera kurser av typen "Kurs"
    const programData = stat.filter(entry => entry.type === "Program");

    // Sortera kurserna efter antal sökande i fallande ordning och välj de 6 första
    const top6Program = programData.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 5);

    // Skapa data för stapeldiagrammet
    const programLabels = top6Program.map(entry => entry.name);
    const programDataTotal = top6Program.map(entry => entry.applicantsTotal);



    // Skapa stapeldiagram för de 6 mest sökta kurserna
    new Chart(circleChartEl, {
    type: 'pie',
    data: {
        labels: programLabels,
        datasets: [{
            label: 'De mest sökta programmen',
            data: programDataTotal,
            backgroundColor: ['Yellow', 'Green', 'Blue', 'Red', 'Purple'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}


