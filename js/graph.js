let date = document.querySelector('.date')
let clock = document.querySelector('.time');

function getTime() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDay();

    const h = today.getHours();
    const m = today.getMinutes();

    const dateString = year + '.' + month + '.' + day;
    date.innerHTML = dateString;
    const timeString = h + ':' + m;
    clock.innerHTML = `${h<10 ? `0${h}`:h}:${m<10 ? `0${m}`:m}`
}

function init_Clock() {
    setInterval(getTime, 1000);
}

init_Clock();
updateGraph1();
updateGraph2();
updateGraph3();
updateGraph4();
updateGraph5();

for(let i = 0; i < 14; i++) {
    document.querySelector('.li' + i).addEventListener('click', function() {
        updateGraph1();
        updateGraph2();
        updateGraph3();
        updateGraph4();
        updateGraph5();
    });
}

/*chart1*/
function updateGraph1() { 
    Highcharts.chart('container1', {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Speedometer'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'km/h'
            },
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B' // green
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D' // yellow
            }, {
                from: 160,
                to: 200,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [80],
            tooltip: {
                valueSuffix: ' km/h'
            }
        }]

    },
    // Add some life
    function (chart) {
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal,
                    inc = Math.round((Math.random() - 0.5) * 20);

                newVal = point.y + inc;
                if (newVal < 0 || newVal > 200) {
                    newVal = point.y - inc;
                }

                point.update(newVal);

            }, 3000);
        }
    });
}

/*chart2*/
function updateGraph2() {
    am5.ready(function() {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdiv");
        
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout
        }));
        
        
        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
          am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
          })
        );
        
        var data = [{
          "year": "2021",
          "europe": 2.5,
          "namerica": 2.5,
          "asia": 2.1,
          "lamerica": 1,
          "meast": 0.8,
          "africa": 0.4
        }, {
          "year": "2022",
          "europe": 2.6,
          "namerica": 2.7,
          "asia": 2.2,
          "lamerica": 0.5,
          "meast": 0.4,
          "africa": 0.3
        }, {
          "year": "2023",
          "europe": 2.8,
          "namerica": 2.9,
          "asia": 2.4,
          "lamerica": 0.3,
          "meast": 0.9,
          "africa": 0.5
        }]
        
        
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          renderer: am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
          }),
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        xAxis.data.setAll(data);
        
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        }));
        
        
        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name, fieldName) {
          var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "year"
          }));
        
          series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}:{valueY}",
            width: am5.percent(90),
            tooltipY: 0
          });
        
          series.data.setAll(data);
        
          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          series.appear();
        
          series.bullets.push(function () {
            return am5.Bullet.new(root, {
              locationY: 0,
              sprite: am5.Label.new(root, {
                text: "{valueY}",
                fill: root.interfaceColors.get("alternativeText"),
                centerY: 0,
                centerX: am5.p50,
                populateText: true
              })
            });
          });
        
          legend.data.push(series);
        }
        
        makeSeries("Europe", "europe");
        makeSeries("North America", "namerica");
        makeSeries("Asia", "asia");
        makeSeries("Latin America", "lamerica");
        makeSeries("Middle East", "meast");
        makeSeries("Africa", "africa");
        
        
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        
        }); // end am5.ready()
}

/*chart3*/
function updateGraph3() {
    Highcharts.chart('container', {
        chart: {
            type: 'area',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 30,
                depth: 200
            }
        },
        title: {
            text: 'Visual comparison of Mountains Panorama'
        },
        accessibility: {
            description: 'The chart is showing the shapes of three mountain ranges as three area line series laid out in 3D behind each other.',
            keyboardNavigation: {
                seriesNavigation: {
                    mode: 'serialize'
                }
            }
        },
        lang: {
            accessibility: {
                axis: {
                    xAxisDescriptionPlural: 'The chart has 3 unlabelled X axes, one for each series.'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Height Above Sea Level',
                x: -40
            },
            labels: {
                format: '{value:,.0f} MAMSL'
            },
            gridLineDashStyle: 'Dash'
        },
        xAxis: [{
            visible: false
        }, {
            visible: false
        }, {
            visible: false
        }],
        plotOptions: {
            area: {
                depth: 100,
                marker: {
                    enabled: false
                },
                states: {
                    inactive: {
                        enabled: false
                    }
                }
            }
        },
        tooltip: {
            valueSuffix: ' MAMSL'
        },
        series: [{
            name: 'Tatra Mountains visible from Rusinowa polana',
            lineColor: 'rgb(180,90,50)',
            color: 'rgb(200,110,50)',
            fillColor: 'rgb(200,110,50)',
            data: [
                ['Murań', 1890],
                ['Nowy Wierch', 2009],
                ['Hawrań', 2152],
                ['Płaczliwa Skała', 2142],
                ['Szalony Wierch', 2061],
                ['Karczmarski Wierch', 1438],
                ['Jagnięcy Szczyt', 2230],
                ['Czerwona Turnia', 2284],
                ['Kołowy Szczyt', 2418],
                ['Czarny Szczyt', 2429],
                ['Baranie Rogi', 2526],
                ['Śnieżny Szczyt', 2465],
                ['Lodowy Szczyt', 2627],
                ['Lodowa Kopa', 2602],
                ['Szeroka Jaworzyńska', 2210],
                ['Horwacki Wierch', 1902],
                ['Spismichałowa Czuba', 2012],
                ['Zielona Czuba', 2130],
                ['Wielicki Szczyt', 2318],
                ['Gerlach', 2655],
                ['Batyżowiecki Szczyt', 2448],
                ['Kaczy Szczyt', 2395],
                ['Zmarzły Szczyt', 2390],
                ['Kończysta', 2538],
                ['Młynarz', 2170],
                ['Ganek', 2462],
                ['Wysoka', 2547],
                ['Ciężki Szczyt', 2520],
                ['Rysy', 2503],
                ['Żabi Mnich', 2146],
                ['Żabi Koń', 2291],
                ['Żabia Turnia Mięguszowiecka', 2335],
                ['Wołowa Turnia', 2373]
            ]
        }, {
            xAxis: 1,
            lineColor: 'rgb(120,160,180)',
            color: 'rgb(140,180,200)',
            fillColor: 'rgb(140,180,200)',
            name: 'Dachstein panorama seen from Krippenstein',
            data: [
                ['Kufstein', 2049],
                ['Hohe Wildstelle', 2746],
                ['Kleiner Miesberg', 2173],
                ['Großer Miesberg', 2202],
                ['Hochstein', 2543],
                ['Lackner Miesberg', 2232],
                ['Wasenspitze', 2257],
                ['Sinabell', 2349],
                ['Feister Scharte', 2198],
                ['Eselstein', 2556],
                ['Landfriedstein', 2536],
                ['Scheichenspitz', 2667],
                ['Schmiedstock', 2634],
                ['Gamsfeldspitze', 2611],
                ['Edelgriess', 2305],
                ['Koppenkarstein', 2863],
                ['Niederer Gjaidstein', 2483],
                ['Hoher Gjaidstein', 2794],
                ['Hoher Dachstein', 2995],
                ['Niederer Dachstein', 2934],
                ['Hohes Kreuz', 2837],
                ['Hoher Ochsenkogel', 2513]
            ]
        }, {
            xAxis: 2,
            lineColor: 'rgb(200, 190, 140)',
            color: 'rgb(200, 190, 140)',
            fillColor: 'rgb(230, 220, 180)',
            name: 'Panorama from Col Des Mines',
            data: [
                ['Combin de la Tsessette', 4141],
                ['Grand Combin de Grafeneire', 4314],
                ['Combin de Corbassière', 3716],
                ['Petit Combin', 3672],
                ['Pointe de Boveire', 3212],
                ['Grand Aget', 3133],
                ['Mont Rogneux', 3084],
                ['Dents du Grand Lé', 2884],
                ['Monts Telliers', 2951],
                ['Grand Golliat', 3238],
                ['Mont Grande Rochère', 3326],
                ['Mont de la Fouly', 2871],
                ['Tête de la Payanne', 2452],
                ['Pointe Allobrogia', 3172],
                ['Six Blanc', 2334],
                ['Mont Dolent', 3820],
                ['Aiguille de Triolet', 3870],
                ['Le Tour Noir', 3836],
                ["Aiguille de l'A Neuve", 3753],
                ["Aiguille d'Argentière", 3900],
                ['Aiguille du Chardonnet', 3824],
                ['Aiguille du Tour', 3540],
                ['Aiguille du Pissoir', 3440],
                ['Le Catogne', 2598],
                ['Pointe de Prosom', 2762],
                ['Pointe Ronde', 2700],
                ['Mont Buet', 3096],
                ['Le Cheval Blanc', 2831],
                ['Pointe de la Finive', 2838],
                ['Pic de Tenneverge', 2985],
                ["Pointe d'Aboillon", 2819],
                ['Tour Sallière', 3220],
                ['Le Dôme', 3138],
                ['Haute Cime', 3257],
                ['Pierre Avoi', 2473],
                ["Cime de l'Est", 3178]
            ]
        }]
    });
    
}

/*chart4*/
function updateGraph4() {
    // Data retrieved from https://www.vikjavev.no/ver/snjomengd

    Highcharts.chart('container4', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Snow depth at Vikjafjellet, Norway'
        },
        subtitle: {
            text: 'Irregular time data in Highcharts JS'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Snow depth (m)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 2.5
                }
            }
        },

        colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

        // Define the data points. All series have a year of 1970/71 in order
        // to be compared on the same x axis. Note that in JavaScript, months start
        // at 0 for January, 1 for February etc.
        series: [
            {
                name: "Winter 2019-2020",
                data: [
                    [Date.UTC(1970, 9, 24), 0],
                    [Date.UTC(1970, 9, 27), 0.12],
                    [Date.UTC(1970, 9, 30), 0.09],
                    [Date.UTC(1970, 10,  3), 0.13],
                    [Date.UTC(1970, 10,  6), 0.12],
                    [Date.UTC(1970, 10,  9), 0.13],
                    [Date.UTC(1970, 10, 12), 0.13],
                    [Date.UTC(1970, 10, 15), 0.16],
                    [Date.UTC(1970, 10, 18), 0.19],
                    [Date.UTC(1970, 10, 21), 0.25],
                    [Date.UTC(1970, 10, 24), 0.26],
                    [Date.UTC(1970, 10, 27), 0.24],
                    [Date.UTC(1970, 10, 30), 0.25],
                    [Date.UTC(1970, 11,  3), 0.26],
                    [Date.UTC(1970, 11,  6), 0.36],
                    [Date.UTC(1970, 11,  9), 0.43],
                    [Date.UTC(1970, 11, 12), 0.32],
                    [Date.UTC(1970, 11, 15), 0.48],
                    [Date.UTC(1970, 11, 18), 0.5],
                    [Date.UTC(1970, 11, 21), 0.44],
                    [Date.UTC(1970, 11, 24), 0.43],
                    [Date.UTC(1970, 11, 27), 0.45],
                    [Date.UTC(1970, 11, 30), 0.4],
                    [Date.UTC(1971, 0,  3), 0.39],
                    [Date.UTC(1971, 0,  6), 0.56],
                    [Date.UTC(1971, 0,  9), 0.57],
                    [Date.UTC(1971, 0, 12), 0.68],
                    [Date.UTC(1971, 0, 15), 0.93],
                    [Date.UTC(1971, 0, 18), 1.11],
                    [Date.UTC(1971, 0, 21), 1.01],
                    [Date.UTC(1971, 0, 24), 0.99],
                    [Date.UTC(1971, 0, 27), 1.17],
                    [Date.UTC(1971, 0, 30), 1.24],
                    [Date.UTC(1971, 1,  3), 1.41],
                    [Date.UTC(1971, 1,  6), 1.47],
                    [Date.UTC(1971, 1,  9), 1.4],
                    [Date.UTC(1971, 1, 12), 1.92],
                    [Date.UTC(1971, 1, 15), 2.03],
                    [Date.UTC(1971, 1, 18), 2.46],
                    [Date.UTC(1971, 1, 21), 2.53],
                    [Date.UTC(1971, 1, 24), 2.73],
                    [Date.UTC(1971, 1, 27), 2.67],
                    [Date.UTC(1971, 2,  3), 2.65],
                    [Date.UTC(1971, 2,  6), 2.62],
                    [Date.UTC(1971, 2,  9), 2.79],
                    [Date.UTC(1971, 2, 13), 2.93],
                    [Date.UTC(1971, 2, 20), 3.09],
                    [Date.UTC(1971, 2, 27), 2.76],
                    [Date.UTC(1971, 2, 30), 2.73],
                    [Date.UTC(1971, 3,  4), 2.9],
                    [Date.UTC(1971, 3,  9), 2.77],
                    [Date.UTC(1971, 3, 12), 2.78],
                    [Date.UTC(1971, 3, 15), 2.76],
                    [Date.UTC(1971, 3, 18), 2.76],
                    [Date.UTC(1971, 3, 21), 2.7],
                    [Date.UTC(1971, 3, 24), 2.61],
                    [Date.UTC(1971, 3, 27), 2.52],
                    [Date.UTC(1971, 3, 30), 2.53],
                    [Date.UTC(1971, 4,  3), 2.55],
                    [Date.UTC(1971, 4,  6), 2.52],
                    [Date.UTC(1971, 4,  9), 2.44],
                    [Date.UTC(1971, 4, 12), 2.43],
                    [Date.UTC(1971, 4, 15), 2.43],
                    [Date.UTC(1971, 4, 18), 2.48],
                    [Date.UTC(1971, 4, 21), 2.41],
                    [Date.UTC(1971, 4, 24), 2.16],
                    [Date.UTC(1971, 4, 27), 2.01],
                    [Date.UTC(1971, 4, 30), 1.88],
                    [Date.UTC(1971, 5,  2), 1.62],
                    [Date.UTC(1971, 5,  6), 1.43],
                    [Date.UTC(1971, 5,  9), 1.3],
                    [Date.UTC(1971, 5, 12), 1.11],
                    [Date.UTC(1971, 5, 15), 0.84],
                    [Date.UTC(1971, 5, 18), 0.54],
                    [Date.UTC(1971, 5, 21), 0.19],
                    [Date.UTC(1971, 5, 23), 0]
                ]
            }, {
                name: "Winter 2020-2021",
                data: [
                    [Date.UTC(1970, 10, 14), 0],
                    [Date.UTC(1970, 11,  6), 0.35],
                    [Date.UTC(1970, 11, 13), 0.35],
                    [Date.UTC(1970, 11, 20), 0.33],
                    [Date.UTC(1970, 11, 30), 0.53],
                    [Date.UTC(1971, 0, 13), 0.62],
                    [Date.UTC(1971, 0, 20), 0.6],
                    [Date.UTC(1971, 1,  2), 0.69],
                    [Date.UTC(1971, 1, 18), 0.67],
                    [Date.UTC(1971, 1, 21), 0.65],
                    [Date.UTC(1971, 1, 24), 0.66],
                    [Date.UTC(1971, 1, 27), 0.66],
                    [Date.UTC(1971, 2,  3), 0.61],
                    [Date.UTC(1971, 2,  6), 0.6],
                    [Date.UTC(1971, 2,  9), 0.69],
                    [Date.UTC(1971, 2, 12), 0.66],
                    [Date.UTC(1971, 2, 15), 0.75],
                    [Date.UTC(1971, 2, 18), 0.76],
                    [Date.UTC(1971, 2, 21), 0.75],
                    [Date.UTC(1971, 2, 24), 0.69],
                    [Date.UTC(1971, 2, 27), 0.82],
                    [Date.UTC(1971, 2, 30), 0.86],
                    [Date.UTC(1971, 3,  3), 0.81],
                    [Date.UTC(1971, 3,  6), 1],
                    [Date.UTC(1971, 3,  9), 1.15],
                    [Date.UTC(1971, 3, 10), 1.35],
                    [Date.UTC(1971, 3, 12), 1.26],
                    [Date.UTC(1971, 3, 15), 1.18],
                    [Date.UTC(1971, 3, 18), 1.14],
                    [Date.UTC(1971, 3, 21), 1.04],
                    [Date.UTC(1971, 3, 24), 1.06],
                    [Date.UTC(1971, 3, 27), 1.05],
                    [Date.UTC(1971, 3, 30), 1.03],
                    [Date.UTC(1971, 4,  3), 1.01],
                    [Date.UTC(1971, 4,  6), 0.98],
                    [Date.UTC(1971, 4,  9), 0.94],
                    [Date.UTC(1971, 4, 12), 0.8],
                    [Date.UTC(1971, 4, 15), 0.61],
                    [Date.UTC(1971, 4, 18), 0.43],
                    [Date.UTC(1971, 4, 21), 0.29],
                    [Date.UTC(1971, 4, 24), 0.1],
                    [Date.UTC(1971, 4, 26), 0]
                ]
            }, {
                name: "Winter 2021-2022",
                data: [
                    [Date.UTC(1970, 10,  5), 0],
                    [Date.UTC(1970, 10, 12), 0.1],
                    [Date.UTC(1970, 10, 21), 0.15],
                    [Date.UTC(1970, 10, 22), 0.19],
                    [Date.UTC(1970, 10, 27), 0.17],
                    [Date.UTC(1970, 10, 30), 0.27],
                    [Date.UTC(1970, 11,  2), 0.25],
                    [Date.UTC(1970, 11,  4), 0.27],
                    [Date.UTC(1970, 11,  5), 0.26],
                    [Date.UTC(1970, 11,  6), 0.25],
                    [Date.UTC(1970, 11,  7), 0.26],
                    [Date.UTC(1970, 11,  8), 0.26],
                    [Date.UTC(1970, 11,  9), 0.25],
                    [Date.UTC(1970, 11, 10), 0.25],
                    [Date.UTC(1970, 11, 11), 0.25],
                    [Date.UTC(1970, 11, 12), 0.26],
                    [Date.UTC(1970, 11, 22), 0.22],
                    [Date.UTC(1970, 11, 23), 0.22],
                    [Date.UTC(1970, 11, 24), 0.22],
                    [Date.UTC(1970, 11, 25), 0.24],
                    [Date.UTC(1970, 11, 26), 0.24],
                    [Date.UTC(1970, 11, 27), 0.24],
                    [Date.UTC(1970, 11, 28), 0.24],
                    [Date.UTC(1970, 11, 29), 0.24],
                    [Date.UTC(1970, 11, 30), 0.22],
                    [Date.UTC(1970, 11, 31), 0.18],
                    [Date.UTC(1971, 0,  1), 0.17],
                    [Date.UTC(1971, 0,  2), 0.23],
                    [Date.UTC(1971, 0,  9), 0.5],
                    [Date.UTC(1971, 0, 10), 0.5],
                    [Date.UTC(1971, 0, 11), 0.53],
                    [Date.UTC(1971, 0, 12), 0.48],
                    [Date.UTC(1971, 0, 13), 0.4],
                    [Date.UTC(1971, 0, 17), 0.36],
                    [Date.UTC(1971, 0, 22), 0.69],
                    [Date.UTC(1971, 0, 23), 0.62],
                    [Date.UTC(1971, 0, 29), 0.72],
                    [Date.UTC(1971, 1,  2), 0.95],
                    [Date.UTC(1971, 1, 10), 1.73],
                    [Date.UTC(1971, 1, 15), 1.76],
                    [Date.UTC(1971, 1, 26), 2.18],
                    [Date.UTC(1971, 2,  2), 2.22],
                    [Date.UTC(1971, 2,  6), 2.13],
                    [Date.UTC(1971, 2,  8), 2.11],
                    [Date.UTC(1971, 2,  9), 2.12],
                    [Date.UTC(1971, 2, 10), 2.11],
                    [Date.UTC(1971, 2, 11), 2.09],
                    [Date.UTC(1971, 2, 12), 2.08],
                    [Date.UTC(1971, 2, 13), 2.08],
                    [Date.UTC(1971, 2, 14), 2.07],
                    [Date.UTC(1971, 2, 15), 2.08],
                    [Date.UTC(1971, 2, 17), 2.12],
                    [Date.UTC(1971, 2, 18), 2.19],
                    [Date.UTC(1971, 2, 21), 2.11],
                    [Date.UTC(1971, 2, 24), 2.1],
                    [Date.UTC(1971, 2, 27), 1.89],
                    [Date.UTC(1971, 2, 30), 1.92],
                    [Date.UTC(1971, 3,  3), 1.9],
                    [Date.UTC(1971, 3,  6), 1.95],
                    [Date.UTC(1971, 3,  9), 1.94],
                    [Date.UTC(1971, 3, 12), 2],
                    [Date.UTC(1971, 3, 15), 1.9],
                    [Date.UTC(1971, 3, 18), 1.84],
                    [Date.UTC(1971, 3, 21), 1.75],
                    [Date.UTC(1971, 3, 24), 1.69],
                    [Date.UTC(1971, 3, 27), 1.64],
                    [Date.UTC(1971, 3, 30), 1.64],
                    [Date.UTC(1971, 4,  3), 1.58],
                    [Date.UTC(1971, 4,  6), 1.52],
                    [Date.UTC(1971, 4,  9), 1.43],
                    [Date.UTC(1971, 4, 12), 1.42],
                    [Date.UTC(1971, 4, 15), 1.37],
                    [Date.UTC(1971, 4, 18), 1.26],
                    [Date.UTC(1971, 4, 21), 1.11],
                    [Date.UTC(1971, 4, 24), 0.92],
                    [Date.UTC(1971, 4, 27), 0.75],
                    [Date.UTC(1971, 4, 30), 0.55],
                    [Date.UTC(1971, 5,  3), 0.35],
                    [Date.UTC(1971, 5,  6), 0.21],
                    [Date.UTC(1971, 5,  9), 0]
                ]
            }
        ]
    });
}

/*chart5*/
function updateGraph5() {
   // Data retrieved from https://worldpopulationreview.com/country-rankings/countries-by-density
   Highcharts.chart('container5', {
        chart: {
            type: 'variablepie'
        },
        title: {
            text: 'Countries compared by population density and total area, 2022.'
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'Area (square km): <b>{point.y}</b><br/>' +
                'Population density (people per square km): <b>{point.z}</b><br/>'
        },
        series: [{
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'countries',
            data: [{
                name: 'Spain',
                y: 505992,
                z: 92
            }, {
                name: 'France',
                y: 551695,
                z: 119
            }, {
                name: 'Poland',
                y: 312679,
                z: 121
            }, {
                name: 'Czech Republic',
                y: 78865,
                z: 136
            }, {
                name: 'Italy',
                y: 301336,
                z: 200
            }, {
                name: 'Switzerland',
                y: 41284,
                z: 213
            }, {
                name: 'Germany',
                y: 357114,
                z: 235
            }]
        }]
    });
}