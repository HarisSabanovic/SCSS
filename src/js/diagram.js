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

    // Filtrerar kurser av typen "Kurs"
    const kursData = stat.filter(entry => entry.type === "Kurs");

    // Sorterar kurserna efter antal sökande i ordning och väljer de 6 första
    const top6Kurser = kursData.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 6);

    // Skapa data för stapeldiagrammet
    const kursLabels = top6Kurser.map(entry => entry.name);
    const kursDataTotal = top6Kurser.map(entry => entry.applicantsTotal);



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
        responsive:true,
        plugins: {
            legend: {
                labels: {
                    font: function(context) {
                        let width = context.chart.width;
                        let size = Math.round(width / 32);
                        return {
                            size: size
                        };
                    }
                }
            }
        },      
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


    const programData = stat.filter(entry => entry.type === "Program");

   
    const top6Program = programData.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 5);

  
    const programLabels = top6Program.map(entry => entry.name);
    const programDataTotal = top6Program.map(entry => entry.applicantsTotal);



   
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
            responsive:true, 
            y: {
                beginAtZero: true
            }
        }
    }
});
}


