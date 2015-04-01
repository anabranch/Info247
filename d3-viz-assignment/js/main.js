
var filename = "/data/running_data.json";
// columns = lengths
// rows = days

var cols = [0.0, 0.7, 0.9, 1.0, 1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.9, 3.0, 3.1, 3.4, 4.0, 4.1, 4.6, 5.0, 5.2, 5.3, 5.6, 6.5, 12.0, 14.8, 26.2];
var rows = d3.range(7);

var mtx = [
  [11, 1, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [12, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [14, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [15, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [10, 0, 0, 0, 1, 1, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 3, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
  [13, 1, 0, 0, 0, 1, 1, 2, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
  [12, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var height = 600;
var width = 600;
var colorRange = [];

var fill = d3.scale.ordinal()
  .domain(d3.range(colorRange.length))
  .range(colorRange);

var outerRadius = Math.min(width, height) / 2 - 8,
  innerRadius = outerRadius - 20;

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

var svg = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var layout = d3.layout.chord()
  .padding(.04)
  .matrix(mtx);


svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .selectAll("path")
  .data(layout.groups)
  .enter()
  .append("path")
  .style("fill", function(d, i) {
    return fill(d.index);
  })
  .style("stroke", function(d) {
    return fill(d.index);
  })
  .attr("d", arc);


svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .attr("class", "chord")
  .selectAll("path")
  .data(layout.chords)
  .enter().append("path")
  .style("fill", function(d) {
    return "#333";
  })
  .attr("d", d3.svg.chord().radius(innerRadius));
