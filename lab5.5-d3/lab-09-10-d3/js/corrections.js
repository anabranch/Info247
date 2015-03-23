// Modify SVG

var margin = {top: 20, right: 30, bottom: 20, left: 30};

var chartHeight = 560;
var svgHeight = chartHeight + margin.top + margin.bottom;

var chartWidth = 760;
var svgWidth = chartWidth + margin.right + margin.left;


// Move x axis down
.attr('transform', 'translate(0,' + (chartHeight) + ')')

// Move y axis right
.attr('transform', 'translate(' + (margin.left) + ',0)')

// Flip the y axis

var yScale = d3.scale.linear()
								.domain([0,	yDomainMax])
								.range([chartHeight, margin.top]);


.attr("y", function(d) {
	// console.log(yScale(d.y0 + d.y))
	return yScale(d.y + d.y0)
})

// Change the y axis scale
