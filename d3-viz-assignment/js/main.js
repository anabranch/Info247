var url = "/data/running_data.json",
height = 600;
var width = 600;
var colorRange = ["#1a9850", "#d73027", "#fc8d59", "#fee08b", "#ffffbf", "#d9ef8b", "#91cf60", ];

var fill = d3.scale.ordinal()
  .domain(d3.range(colorRange.length))
  .range(colorRange);

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

$.get(url, function(data) {
      console.log(data);
      var layout = d3.layout.chord()
        .padding(.04)
        .matrix(data);


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
          return fill(d.target.index);
        })
        .attr("d", d3.svg.chord().radius(innerRadius));
    });
