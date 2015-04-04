var url = "/data/matrix.json",
  height = 600;
var width = 600;

// Colors Can be substituted to preference, in many ways less colors makes it nice...
var colorRange = ["#1a9850", "#d73027", "#fc8d59", "#fee08b", "#ffffbf", "#d9ef8b", "#91cf60"];
var fill = d3.scale.ordinal()
  .domain(d3.range(colorRange.length))
  .range(colorRange);

var fill = d3.scale.category20b();



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

function fadeChords(opacity, data) {
  return function(g, i) {
    var selected, notSelected, nonSelectIndexes;

    selected = svg.selectAll("g.chord path")
      .filter(function(d) {
        return d.source.index == i || d.target.index == i;
      });

    notSelected = svg.selectAll("g.chord path")
      .filter(function(d) {
        return d.source.index != i && d.target.index != i;
      });

    nonSelectIndexes = data[i]
      .map(function(d, i) {
        if (d == 0) {
          return i;
        }
        return undefined;
      })
      .filter(function(d) {
        return d != undefined;
      });

    nonSelectPaths = svg.selectAll("g.group path")
      .filter(function(g, i) {
        return ($.inArray(i, nonSelectIndexes) > -1);
      });

      console.log(nonSelectPaths);
    // Actions
    notSelected
      .transition()
      .style({
        "opacity": opacity
      });

   nonSelectPaths 
      .transition()
      .style({
        "opacity": opacity
      });
  };
}


$.getJSON(url, function(data) {
  var layout = d3.layout.chord()
    .padding(.02) // feasibly could put a sort right here
    .matrix(data);

  svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("class", "group animate")
    .selectAll("path")
    .data(layout.groups)
    .enter()
    .append("path")
    .style("fill", function(d) {
      return fill(d.index);
    })
    .style("stroke", function(d) {
      return fill(d.index);
    })
    .attr("d", arc)
    .on("mouseover", fadeChords(0, data))
    .on("mouseout", fadeChords(1, data));


  svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("class", "chord animate")
    .selectAll("path")
    .data(layout.chords)
    .enter().append("path")
    .style("fill", function(d) {
      return fill(d.target.index);
    })
    .attr("d", d3.svg.chord().radius(innerRadius));
});
