const biodiversity = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(biodiversity).then(function(data) {
    console.log(data);
    const dropdownbox = d3.select("#selDataset")
    for(let i=0; i<data.names.length; i++){
      dropdownbox.append("option").text(data.names[i]).property("value",data.names[i])
    }
    buildcharts(data.names[0])
  });
function optionChanged(value){
  buildcharts(value)
}
function buildcharts(sampleid){
  d3.json(biodiversity).then(function(data) {
    console.log(data);
    const result = data.samples.filter(element => element.id ==sampleid)[0]
    console.log (result)
    const otu_ids = result.otu_ids
    const otu_labels = result.otu_labels
    const sample_values = result.sample_values
    let y_values = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
    let x_values = sample_values.slice(0, 10).reverse()
    let hovertext = otu_labels.slice(0,10).reverse()
    let trace1 = {
      x: x_values,
      y: y_values,
      text: hovertext,
      type: "bar", 
      orientation:"h"
    }; 
    let layout = []
    Plotly.newPlot("bar",[trace1],layout)

    let bubbletrace = {
      x: otu_ids,
      y: sample_values,
      text: hovertext,
      mode: "markers", 
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }
    Plotly.newPlot("bubble",[bubbletrace],layout)
  });
}