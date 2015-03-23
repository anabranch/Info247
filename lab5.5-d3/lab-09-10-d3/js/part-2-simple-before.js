// Pretend data set, where each array/color is a fruit, and each which fruits an I School group prefers.
var data = [
	[
	// Votes for apples across I School group
	        { x: 0, y: 5 },
	        { x: 1, y: 4 },
	        { x: 2, y: 2 },
	        { x: 3, y: 7 },
	        { x: 4, y: 23 }
	],
	[
		// Votes for oranges across I School group
	        { x: 0, y: 10 },
	        { x: 1, y: 12 },
	        { x: 2, y: 19 },
	        { x: 3, y: 23 },
	        { x: 4, y: 17 }
	],
	[
		// Votes for mangoes across I School group
	        { x: 0, y: 22 },
	        { x: 1, y: 28 },
	        { x: 2, y: 32 },
	        { x: 3, y: 35 },
	        { x: 4, y: 43 }
	]
];

// // 1) Select container with ID.
var container = d3.select('#chart-container');

// // 2) Create and append the SVG container.
var svgWidth = 800;
var svgHeight = 600;
var svg = container.append('svg')
					.attr('width', svgWidth)
					.attr('height', svgHeight);

// Initiate the stack
var stack = d3.layout.stack();
stack(data);

// Set up the scales
var xScale = d3.scale.ordinal()
	.domain(d3.range(data[0].length))
	.rangeRoundBands([0, svgWidth]);

var yDomainMax = d3.max(data, function(d) {
	return d3.max(d, function(d) {
		return d.y0 + d.y;
	});
})

var yScale = d3.scale.linear()
	.domain([0,	yDomainMax])
	.range([0, svgHeight]);

// // Add easy colors via a 10-step ordinal scale
// var colors = d3.scale.category10();

// Add a group for each subcategory
var groups = svg.selectAll("g")
								.data(data)
								.enter()
								.append("g")
								// .style("fill", function(d, i) {
								// 	return colors(i);
								// });

// Add a rectangle for each data point to each group.
var rects = groups.selectAll("rect")
									.data(function(d) { return d; })
									.enter()
									.append("rect")
									.attr("x", function(d, i) {
										return xScale(i);
									})
									.attr("y", function(d) {
										return yScale(d.y0);
									})
									.attr("height", function(d) {
										return yScale(d.y);
									})
									.attr("width", xScale.rangeBand());
// Set up the axes
var xAxis = d3.svg.axis()
									.scale(xScale)
									.ticks(5)
									.orient('bottom') // Specify where the labels should appear relative to the axis itself. 
									// .tickFormat(function (i) { // Custom tick marks
									//   var fruits = ["MIMS '16","MIMS '15", 'MIDS', "Faculty", 'Staff']
									//   return fruits[i]
									// })

var yAxis = d3.svg.axis()
									.scale(yScale)
									.orient('left');

// Append the axes
svg.append("g")
		.attr('class', 'axis')
    .call(xAxis); // takes the incoming selection (g), as received from the prior link in the chain, and hands that selection off to any function (xAxis).

svg.append("g")
		.attr('class', 'axis')
    .call(yAxis);


// Chart title
var chartTitle = svg.append('text')
        .attr('x', svgWidth / 2)             
        .attr('y', 20)
        .attr('text-anchor', 'middle') 
        .attr('class', 'h4') 
        .style('text-decoration', 'underline')  
        .text('I School Fruit Preferences');

// To do
// - Give the chart title a gutter. Move down the chart.
// - Make a legend or label each fruit.
// - Re-create the chart where the bars are sorted by height.
// - Put a total count on top of each bar.
// - Make a tool tip for each fruit's count.
