var height = 627,
  width = 627;

var outerRadius = Math.min(width, height) / 2 - 8,
  innerRadius = outerRadius - 30;

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

var svg = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var groups = svg.append("g")
  .attr("class", "groups")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var chords = svg.append("g")
  .attr("class", "chords")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var layout = d3.layout.chord()
  .padding(0.02);

$.get("/data/airports.csv", function(airports) {
  airports = airports.split("\n");
  d3.json("/data/matrix.json", function(matrix) {
    layout.matrix(matrix);

    var dataGroups = groups.selectAll('path')
     .data(layout.groups);

    var dataChords = chords.selectAll('path')
      .data(layout.chords);

    dataGroups
      .enter()
      .append('path')
      .attr("d", arc);

    dataChords
      .enter()
      .append('path')
      .attr("d", d3.svg.chord().radius(innerRadius));

    svg.selectAll("g.chords path").data(layout.chords().slice(0, 100)).exit().remove();
  });
});
