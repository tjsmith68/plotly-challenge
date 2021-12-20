

// fetch("static/js/samples.json").then(function(response){
//     response.text().then(function(text){
//         console.log(text);
//     })
// });




// Create arrays of sample id's, sample demographics, and sample data
var names = Object.values(data.names);
var demogs = Object.values(data.metadata);
var samples = Object.values(data.samples);

var sampleMetadata = [];
var sampleData = [];

var person = 0;

// Data for Gauge Layout
var traceGauge = {
    type: 'pie',
    showlegend: false,
    hole: 0.5,
    rotation: 90,
    values: [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 90],
    text: ['0','1','2','3','4','5','6','7','8','9'],
    direction: 'clockwise',
    textinfo: 'text',
    textposition: 'inside',
    marker: {
      colors: ["rgba(220, 40, 50, 0.6)",
                "rgba(200, 60, 50, 0.6)",
                "rgba(180, 80, 50, 0.6)",
                "rgba(160, 100, 50, 0.6)",
                "rgba(140, 120, 50, 0.6)",
                "rgba(120, 140, 50, 0.6)",
                "rgba(100, 160, 50, 0.6)",
                "rgba(80, 180, 50, 0.6)",
                "rgba(60, 200, 50, 0.6)",
                "rgba(40, 220, 50, 0.6)",'white']
    //   labels: ['0','1','2','3','4','5','6','7','8','9'],
    }
  };

var dataGauge = [traceGauge];

// Function to filter demographics by selected sample
function selectDemogs(demogs) {
    return demogs.id == person;
  };
 
// Function to filter sample data by selected sample  
function selectSample(samples) {
    return samples.id == person;
  };

// Loop through sample id list and build drop down
var dropD = d3.select("select");
for(let i = 0;i<names.length;i++) {
    var newOption = dropD.append("option").text(`Sample ${names[i]}`);
    newOption.attr("value", parseInt(names[i]));
}

// Log some stuff to console for a sanity check
console.log(names);
console.log(demogs);
console.log(samples);

// Function to update demographics info on page
function updateDemogsTable() {



    d3.selectAll("p").remove();

    var metaD = d3.select("div.panel-body");

    metaD.append("p").text(`ID: ${sampleMetadata[0].id}`);
    metaD.append("p").text(`Ethnicity: ${sampleMetadata[0].ethnicity}`);
    metaD.append("p").text(`Gender: ${sampleMetadata[0].gender}`);
    metaD.append("p").text(`Age: ${sampleMetadata[0].age}`);
    metaD.append("p").text(`BB Type: ${sampleMetadata[0].bbtype}`);
    metaD.append("p").text(`Location: ${sampleMetadata[0].location}`);
    metaD.append("p").text(`Wash Freq: ${sampleMetadata[0].wfreq}`);

}

// Function to build Bar Chart
function updateBarChart() {

    var sampleValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sampleOTUs = ['','','','','','','','','',''];
    var otuLabels = ['','','','','','','','','',''];

    var otuArray = sampleData[0].otu_ids;
    var sampleArray = sampleData[0].sample_values;
    var hoverArray = sampleData[0].otu_labels;


    for(i=0;i<10;i++) {

        sampleValues[9-i] = sampleArray[i];
        sampleOTUs[9-i] = `OTU: ${otuArray[i]}`;
        otuLabels[9-i] = hoverArray[i];


    }
    
    
    var data = [{
        type: 'bar',
        x: sampleValues,
        y: sampleOTUs,
        orientation: 'h',
        width: .8,
        hovertext: otuLabels
      }];

    var layout = {
        height: 500,
        margin:{t:5},
        yaxis:{
            tickmode: "array", 
            tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            ticktext: sampleOTUs
        }
    }; 

    Plotly.newPlot('bar', data, layout);

    console.log(`Bar Chart for ${person}`);
    console.log(sampleValues);
    console.log(sampleOTUs);
    console.log(otuLabels);

}

// Function to build Bubble Graph
function updateBubbleGraph() {

    
    var markerSize = [];
    var opacityArray = [];
    var otuArray = sampleData[0].otu_ids;
    var sampleArray = sampleData[0].sample_values;
    var hoverArray = sampleData[0].otu_labels;

    for(i=0;i<otuArray.length;i++) {
        markerSize.push(Math.sqrt(sampleArray[i])*10);
        opacityArray.push(.7);


    };


    var trace1 = {
        x: otuArray,
        y: sampleArray,
        hovertext: hoverArray,
        mode: 'markers',
        marker: {
        color: otuArray,
        colorscale: 'Earth',
        opacity: opacityArray,
        size: markerSize
        }
      };
      
      var data = [trace1];
      
      var layout = {
        margin:{t:10},
        showlegend: false,
        height: 550,
        width: 1200,
        xaxis:{
            title: 'OTU ID'
        }
      };
      
      Plotly.newPlot('bubble', data, layout);

    console.log(`Bubble Graph for ${person}`);

}


// Function to build Wash Frequency Gauge
function updateWashGauge(washes) {

  var position = washes;
  var needleColor = 'rgba(200,0,0,1)';
  var degrees = 171 - (18 * position), needleLength = .25, needleWidth = .02
  var radians = degrees * Math.PI / 180;
  var xa = .5 + needleLength * Math.cos(radians) 
  var ya = .5 + needleLength * Math.sin(radians)
  var xb = .5 + needleWidth * Math.cos(radians-Math.PI/2) 
  var yb = .5 + needleWidth * Math.sin(radians-Math.PI/2)
  var xc = .5 + needleWidth * Math.cos(radians+Math.PI/2) 
  var yc = .5 + needleWidth * Math.sin(radians+Math.PI/2)

  var gaugeLayout = {
    shapes: [
        {
            type: 'line',
            x0: xa,
            y0: ya,
            x1: xb,
            y1: yb,
            line: {
              color: needleColor,
              width: 3
            }
          },
          {
            type: 'line',
            x0: xb,
            y0: yb,
            x1: xc,
            y1: yc,
            line: {
              color: needleColor,
              width: 3
            }
          },
          {
            type: 'line',
            x0: .5,
            y0: .5,
            x1: xa,
            y1: ya,
            line: {
              color: needleColor,
              width: 3
            }
          },
          {
            type: 'line',
            x0: xc,
            y0: yc,
            x1: xa,
            y1: ya,
            line: {
              color: needleColor,
              width: 3
            }
          },
          {
            type: 'circle',
            fillcolor: needleColor,
            x0: .5 - needleWidth,
            y0: .5 + needleWidth,
            x1: .5 + needleWidth,
            y1: .5 - needleWidth,
            line: {
              color: needleColor,
              width: 3
            }
          },
    ],
    title:'<b>Belly Button Washing Frequency</b> <br>Scrubs per Week',
    hovermode: false, 
    xaxis: {visible: false, range: [-1, 1]},
    yaxis: {visible: false, range: [-1, 1]}
  }

  Plotly.newPlot('gauge', dataGauge, gaugeLayout)

}

// Function called by DOM changes
function optionChanged(option) {
    
    console.log(option);

    person = option;

    sampleMetadata = demogs.filter(selectDemogs);
    sampleData = samples.filter(selectSample);

    console.log(sampleMetadata);
    console.log(sampleData);

    updateDemogsTable();
    updateBarChart();
    updateBubbleGraph();
    updateWashGauge(sampleMetadata[0].wfreq);


};
