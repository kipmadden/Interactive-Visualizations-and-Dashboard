// Create a function to unpack an array of objects
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
};

function buildDropdown(ids){
    var selectDropdown = d3.select("#selDataset");
    for (var i = 0; i <ids.length; i++){
        selectDropdown.append("option").text(ids[i]).attr("value",ids[i]);
    }

};

function filterRecords(records,id){
    return records.filter(record => +record.id === +id);
    console.log(records.id === id);
}


function plotTopTen(samples,id){
    var focusSample = filterRecords(samples,id);
    //console.log(focusSample);
    var otuIds = focusSample[0].otu_ids;
    var sampleVals = focusSample[0].sample_values;
    var otuLabels = focusSample[0].otu_labels;
     //console.log(otuIds);

     // make an array of objects so we can sort by sample values in desc order 
     // and get the top 10 objects
     var idResults = [];
     otuIds.forEach(function (id,i){ 
        var newObj = {};
        newObj.otu_id = id;
        newObj.sample_value = sampleVals[i];
        newObj.otu_label = otuLabels[i];
        idResults.push(newObj);
    });

    // Sort the objects by sample_value and then slice the top ten
    var sortedById = idResults.sort((a,b) => b.sample_value - a.sample_value);
    var slicedTopTen = sortedById.slice(0,10);
    var reversedTopTen = slicedTopTen.reverse();
    

      // Trace1 for the Top Ten Data
    var trace1 = {
        x: reversedTopTen.map(row => row.sample_value),
        y: reversedTopTen.map(row => `OTU ${row.otu_id}`),
        text: reversedTopTen.map(row => row.otu_label),
        name: `id: ${id}`,
        marker:{
            'color': reversedTopTen.map(row => row.otu_id),
            'colorscale': 'Portland'
        },
        type: "bar",
        orientation: "h"
    };

    // data
    var chartData = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
        title: `id: ${id} Bacteria Presence`,
        hoverlabel:{
            bgcolor: "black",
            font: {color: 'white'}
        },
        margin: {
        l: 70,
        r: 70,
        t: 30,
        b: 100
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar-plot", chartData, layout);
    return reversedTopTen;
}

function buildDemoData(metadata,id){
    var focusMetaData = filterRecords(metadata,id);
    //console.log(focusMetaData);
    var selectMetaID = d3.select("#sample-metadata").html("");
    
    for(let [key, value] of Object.entries(focusMetaData[0])){
        //console.log(`${key}: ${value}`);
        selectMetaID.append("h6").text(`${key}: ${value}`);
    }
    // for (var i = 0; i <ids.length; i++){
    //     ;
    // }
    return focusMetaData;
};

function plotBubbleChart(samples,id){
    var focusSample = filterRecords(samples,id);
    //console.log(focusSample);
    var otuIds = focusSample[0].otu_ids;
    var sampleVals = focusSample[0].sample_values;
    var otuLabels = focusSample[0].otu_labels;
    //console.log(otuIds);

  
     var desired_max_marker_size = 100;
     var size = sampleVals;
      // Trace1 for the Top Ten Data
    var trace1 = {

        x: otuIds,
        y: sampleVals,
        text: otuLabels,
        name: `id: ${id}`,
        mode: 'markers',
        marker: {
            color: otuIds,
            colorscale: "Portland",
            size: size,
            sizeref: 2.0* Math.max(...size) / (desired_max_marker_size**2),
            sizemode: 'area'
        }
    };

    // data
    var chartData = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
        title: `id: ${id} Bacteria Bubble Chart`,
        xaxis: {
            title:{
            text:"OTU ID"
        }},
        showlegend: false,
        hoverlabel:{
            bgcolor: "black",
            font: {color: 'white'}
        },
        margin: {
        l: 30,
        r: 30,
        t: 30,
        b: 100
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", chartData, layout);
    // return reversedTopTen;
}

function plotGaugeChart(metadata,id){
    var focusMetaData = filterRecords(metadata,id);
    console.log(focusMetaData);
    var wFreq = parseFloat(focusMetaData[0].wfreq);
    console.log(`wFreq: ${wFreq}`);

    var data = [
        {
          type: "indicator",
          mode: "gauge+number",
          value: wFreq,
          title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week", font: { size: 24 } },
          // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [null, 10], tickwidth: 2, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 1], color: "lightseagreen" },
              { range: [1, 2], color: "mediumspringgreen" },
              { range: [2, 3], color: "lightgreen" },
              { range: [3, 4], color: "yellowgreen" },
              { range: [4, 5], color: "darkseagreen" },
              { range: [5, 6], color: "mediumseagreen" },
              { range: [6, 7], color: "seagreen" },
              { range: [7, 8], color: "forestgreen" },
              { range: [8, 9], color: "green" },
              { range: [9, 10], color: "darkgreen" },
            ]
          }
        }
      ];
      
      var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot('gauge', data, layout);
}
var metadataObj = [];
var samplesObj = [];

// Using D3 read in the samples.json file
d3.json("data/samples.json").then((sampleData) => {
    
    var data = sampleData;
    //console.log(data);
    var names = data.names;
    //console.log(names);
    var metadata = data.metadata;
    metadata.forEach(obj => metadataObj.push(obj));
     console.log(metadata.map(val => val.wfreq));

    var samples = data.samples;
    samples.forEach(obj => samplesObj.push(obj));
    //console.log(samplesObj);
    //console.log(metadata);
    // console.log(samples);
    buildDropdown(names);
   
        
    plotTopTen(samples,940);
    //console.log(initTopTenSamples);
    buildDemoData(metadata,940);

    plotBubbleChart(samples,940);
    //console.log(initMetadata);

    plotGaugeChart(metadata,940);
});
//console.log(metadataObj);
//console.log(samplesObj);
// d3.selectAll("#selDataset").on("change", 
// console.log(this.value),
// buildDemoData(metadataObj,this.value),
// plotTopTen(samplesObj,this.value));

function optionChanged(id){
    console.log(id),
    buildDemoData(metadataObj,id),
    plotTopTen(samplesObj,id);
    plotBubbleChart(samplesObj,id);
    plotGaugeChart(metadataObj,id);
}





