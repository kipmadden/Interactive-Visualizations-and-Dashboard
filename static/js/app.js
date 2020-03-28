// Create a function to unpack an array of objects
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
};

function filterRecords(records,id){
    return records.filter(record => +record.id === id);
    console.log(records.id === id);
}


function getTopTen(focusSample){
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
    //var reversedTopTen = slicedTopTen.reverse();
    return slicedTopTen;
}
// Using D3 read in the samples.json file
d3.json("data/samples.json").then((sampleData) => {
    
    var data = sampleData;
    //console.log(data);
    var names = data.names;
    //console.log(names);
    var metadata = data.metadata;
    //var metadataObjs = metadataArr.map(obj => obj);
    var samples = data.samples;
    // console.log(metadata);
    // console.log(samples);
    buildDropdown(names);
    //var initSample = samples.filter(record => record.id ==='940');
    var initSample = filterRecords(samples,940);
    var initMetadata = filterRecords(metadata,940);
    console.log(initMetadata);
        
    var topTenSamples = getTopTen(initSample,initMetadata);
    console.log(topTenSamples);
});



function init(samples, metadata){
    var initSample = samples.filter(samples.id === '940');
    var initMetadata = metadata.filter(metadata.id === '940');

    var initOtuIds = initSample.otu_ids;
    var initSampleVals = initSample.sample_values;
    var initOtuLabels = initSample.otu_labels;
    console.log(`otu_ids: ${initOtuIds}`);
    // data = [{
    //     x: 
    // }]



}


function buildDropdown(ids){
    var selectDropdown = d3.select("#selDataset");
    for (var i = 0; i <ids.length; i++){
        selectDropdown.append("option").text(ids[i]).attr("value",ids[i]);
    }

};

d3.selectAll("#selDataset").on("change", updateBarChart);

function updateBarChart(id){
    var dropdownMenuVal = d3.select("selDataset").property("value");



}
