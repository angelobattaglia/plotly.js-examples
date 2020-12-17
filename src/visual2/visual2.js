import Plotly from 'plotly.js-dist';

 function visualizzaBarre(id, dati, group, names) {

            // costruisce gli array di dati
            var uscenti = [];
            var oggi = [];
            var formazioni = [];
            var uscenti_lab = [];
            var oggi_lab = [];
            var annotations = [];
            for (var i = 0; i < dati.length; ++i) {
                uscenti.push(dati[i][names[0]]);
                oggi.push(dati[i][names[1]]);
                formazioni.push(dati[i][group]);
                uscenti_lab.push("2012: " + dati[i][names[0]] + " comuni");
                oggi_lab.push("2017: " + dati[i][names[1]] + " comuni");
                annotations.push({
                    x :  dati[i][names[0]],
                    y : dati[i]["Formazione"],
                    text : dati[i][names[0]],
                    showarrow: false,
                    xanchor: "left",
                    xshift: 3,
                    yanchor: "bottom"
                });
                annotations.push({
                    x :  dati[i][names[1]],
                    y : dati[i]["Formazione"],
                    text : dati[i][names[1]],
                    showarrow: false,
                    xanchor: "left",
                    xshift: 3,
                    yanchor: "top"
                });
            }

            var tracce = [ {
                name: names[0],
                y: formazioni,
                x: uscenti,
                text: uscenti_lab,
                type: 'bar',
                orientation: 'h',
                hoverinfo: "text+y"
            },{
                name: names[1],
                y: formazioni,
                x: oggi,
                type: 'bar',
                orientation: 'h',
                text: oggi_lab,
                hoverinfo: "text+y"
            }];
            var layout = {
                width: 800,
                height: 600,
                title: "Colore Politico dei 160 Comuni con più di 160 Abitanti",
                xaxis: {
                    title: 'Numero di comuni'
                },
                yaxis: {
                    title: 'Colore Politico',
                    autorange:'reversed'
                },
                margin: {
                    l: 200, r: 70, t: 100, b: 50
                },
                legend: {
                    x: 0.5, y: 1.02, yanchor: "bottom", xanchor: "center",
                    orientation: 'h'
                },
                annotations : annotations
            };
            var g = document.getElementById("grafico3");
            g.innerHTML = "";
            Plotly.newPlot(g, tracce, layout, {displayModeBar: false});
        }

        /**
         * Visualizza uno slopegraph
         *
         * @param id id dell'elemento HTML in cui disegnare il grafico
         * @param dati array di oggetti contenente i dati
         * @param group nome della 'colonna' con i gruppi di valori
         * @param names array con due nomi di colonne contenenti i valori per i due assi
         */

        function visualizzaSlope(id, dati, group, names) {

            var traces = [];
            var shift_left = 0;
            var shift_right = 0;
            var annotations = [];
            for (var i = 0; i < dati.length; ++i) {
                var row = dati[i];
                traces.push({
                    name: row[group],
                    x: names,
                    y: names.map(function(x){
                        return row[x];
                    }),
                    text: [row[group] + ": " + row[names[0]] ,
                        row[group] + ": " + row[names[1]] ],
                    type: "scatter",
                    hoverinfo: 'text'
                });
                annotations.push({
                    y : row[names[0]],
                    x : names[0],
                    text : row[names[0]],
                    xshift : -2,
                    xanchor: "right"
                });
                annotations.push({
                    y : row[names[1]],
                    x : names[1],
                    text : row[names[1]] + " : " + row[group],
                    xshift : 2,
                    xanchor : "left"
                });
            }
            annotations.forEach(function (a) {
                a.showarrow = false;
                a.font = {size: 10};
            });

            var layout = {
                title: "Colore Politico dei 160 Comuni con più di 160 Abitanti",
                width: 800,
                height: 700,
                //showlegend: false,
                hoverinfo: "text",
                margin: {
                    l: 80, r: 40, t: 50, b: 40
                },
                yaxis: {
                    showgrid: false,
                    showticklabels: false
                },
                xaxis: {
                    type: "category",
                    tickfont: {size: 25}
                },
                showlegend: false,
                annotations: annotations
            };

            var g = document.getElementById("grafico4");
            g.innerHTML = "";
            Plotly.newPlot(g, traces, layout, {displayModeBar: false});
        }


        /**
         * Visualizza un dot plot
         *
         * @param id id dell'elemento HTML in cui disegnare il grafico
         * @param dati array di oggetti contenente i dati
         * @param group nome della 'colonna' con i gruppi di valori
         * @param names array con due nomi di colonne contenenti i valori per i due assi
         */

        function visualizzaDot(id, dati, group, names) {

            let cfg = { // plot configuration
                displayModeBar: false // avoid showing the modal bar
            };

            // costruisce gli array di dati

            var uscenti = [];
            var oggi = [];
            var formazioni = [];

            var uscenti_lab = [];
            var oggi_lab = [];
            var annotation = [];
            for (var i = 0; i < dati.length; ++i) {
                uscenti.push(dati[i][names[0]]);
                oggi.push(dati[i][names[1]]);
                formazioni.push(dati[i][group]);
                uscenti_lab.push("2012: " + dati[i][2012] + " comuni");
                oggi_lab.push("2017: " + dati[i][2017] + " comuni");
                annotation.push(
                    {
                        x: dati[i][names[1]],
                        y: dati[i][group],
                        axref: 'x',
                        ayref: 'y',
                        ax : dati[i][names[0]],
                        ay : dati[i][group],
                        text : dati[i][names[0]],
                        font: { color: "white", size: 0.8, family: "Arial"},
                        opacity: 0.5,
                        standoff: 10,
                        arrowsize: 0.8,
                        arrowhead: 4
                    }
                );
                annotation.push(
                    {
                        x: dati[i][names[1]],
                        y: dati[i][group],
                        showarrow: false,
                        text : dati[i][names[1]],
                        font: { color: "black", size: 0.9, family: "Arial"},
                    }
                );
            }

            var tracce = [ {
                name: names[0],
                y: formazioni,
                x: uscenti,
                text: uscenti_lab,
                type: 'scatter',
                mode: 'markers',
                orientation: 'h',
                hoverinfo: "text+y",
                marker:{
                    size:20
                }
            },{
                name: names[1],
                y: formazioni,
                x: oggi,
                type: 'scatter',
                mode: 'markers',
                orientation: 'h',
                text: oggi_lab,
                hoverinfo: "text+y",
                marker:{
                    opacity: 0.8,
                    size:25
                }
            }];
            var layout = {
                width: 800,
                height: 500,
                title: "Colore Politico dei 160 Comuni con più di 160 Abitanti",
                xaxis: {
                    title: 'Numero di comuni'
                },
                yaxis: {
                    title: 'Colore Politico',
                    autorange:'reversed'
                },
                margin: {
                    l: 200, r: 70, t: 100, b: 50
                },
                legend: {
                    x: 0.5, y: 1.02, yanchor: "bottom", xanchor: "center",
                    orientation: 'h'
                },
                annotations : annotation,
                hovermode: "closer"
            };
            for(i=0; i<oggi.length; ++i){

            }
            var g = document.getElementById("grafico5");
            g.innerHTML = "";
            // Tecnicamente al posto di "grafico3" andrebbe la variabile g
            Plotly.newPlot(g, tracce, layout, {displayModeBar: false});
            //Plotly.plot("grafico3", tracce, layout, cfg);
        }


        window.onload = function showOnWindow () {
            Plotly.d3.csv("../src/visual2/amministrative.csv", function (error, dati) {
                if (error) {
                    console.log("Impossibile caricare i dati: " + error);
                    return;
                }

                visualizzaBarre('barre', dati, 'Formazione',
                    ["2012", "2017"]);

                visualizzaSlope('slope', dati, 'Formazione',
                    ["2012", "2017"]);

                visualizzaDot('dot', dati, 'Formazione',
                    ["2012", "2017"]);
            });
        };












