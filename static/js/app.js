// Create a function to unpack an array of objects
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
};

function filterRecords(records,id){
    return records.id === id;
    console.log(records.id === id);
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
    var initSample = samples.filter(record => record.id ==='940');
    var initMetadata = metadata.filter(record => +record.id === 940);
    console.log(initSample);
    // console.log(`initSample: ${initSample.id}`);
    var initOtuIds = initSample[0].otu_ids;
    var initSampleVals = initSample[0].sample_values;
    var initOtuLabels = initSample[0].otu_labels;
     console.log(initOtuIds);

     // make an array of objects so we can sort by sample values in desc order and get the top 10
     var idResults = [];
     initOtuIds.forEach(function (id,i){ 
        var newObj = {};
        newObj.otu_id = id;
        newObj.sample_value = initSampleVals[i];
        newObj.otu_label = initOtuLabels[i];
        idResults.push(newObj);
     });
     console.log(idResults);
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
