import Plotly from 'plotly.js-dist';

function esameVIQ() {
    let cfg = { // plot configuration
        displayModeBar: false // avoid showing the modal bar
    };
    // "../src/dati.csv" è dove viene effettuata la richiesta GET a partire dall'index.html
    Plotly.d3.csv("../src/visual1/dati.csv", function (error, data) {
        if (error) {
            alert("Cannot load data: " + error.toString());
            return;
    }

        //load dei dati dal file dati.csv
        let percentages = [];
        let quantitative = [];
        let year = [];
        for (let i = 0; i < data.length; ++i) {
            year.push(data[i].year);
            percentages.push(data[i].percentages);
            quantitative.push(data[i].quantitative);
        }
        //Qui vi sono le tracce:
        let trace1 = [
            //prima traccia
            {
                type: "bar",
                x: year,
                y: percentages
            }
        ];
        let trace2 = [
            {
                 type: "scatter",
                 yaxis: "y2",
                 x: year,
                 y: quantitative,
                 line:
                     {
                         color: "red",
                         width: "s",
                         shape: "spline"
                     },
                 marker:
                     {
                         color: "orange",
                         symbol: "diamond",
                         size: 10
                     }
             }
        ];

        //Qui i layout
        let layout1 = {
            xaxis: {
                title: "Year of the crysis",
                anchor: "y"
            },
            yaxis: {
                title: "Proportion of unemployment",
                tickformat: ".1%",
                domain: [0, 0.49]
            },
            margin: {t: 1, b: 35, r: 1, l: 60},
            showlegend: false
        };
        let layout2={
            xaxis: {

                title: "Year of the crysis",
                anchor: "y"
            },

            yaxis2: {
                title: "Unemployment quantitatively",
                domain: [0.51, 1]
            },
            margin: {t: 1, b: 35, r: 1, l: 60},
            showlegend: false
        };
        //Utilizzo il metodo plot di plotly:
        Plotly.plot("grafico1", trace1, layout1, cfg);
        Plotly.plot("grafico2", trace2, layout2, cfg);
    });
}

window.onload = esameVIQ();
