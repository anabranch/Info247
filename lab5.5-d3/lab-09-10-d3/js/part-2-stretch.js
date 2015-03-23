// // 1) Select container with ID.
var container = d3.select('#chart-container');

// // 2) Create and append the SVG container.
var margin = {top: 20, right: 30, bottom: 20, left: 40};

var chartHeight = 560;
var svgHeight = chartHeight + margin.top + margin.bottom;

var chartWidth = 760;
var svgWidth = chartWidth + margin.right + margin.left;

var svg = container.append('svg')
					.attr('width', svgWidth)
					.attr('height', svgHeight);

// Set up the scales. Only set the ranges right now, because we don't have data to set the domain.


// Set up the axes
var xAxis = d3.svg.axis()
									.scale(xScale)
									.orient('bottom'); // Specify where the labels should appear relative to the axis itself. 

var yAxis = d3.svg.axis()
									.scale(yScale)
									.orient('left')
									.ticks(10)

// Set up colors
colors = d3.scale.category20c();

// Import data. Everything that requires data takes place in here.
d3.json("data/file", function (error, data){
	//Re-structure data for your purposes here if you use food_recalls_top_15.json. 
	// If you want to re-implement the stacked bar using this data, use stacked_bar.json. I used Ruby for time's sake (for me) to save a new fil, but it would be a good challenge to do it in JS.


	// Layout here, if appropriate


	// Once you have your data, set the domains for the scales


	// Select and append elements


	// Call the axes at the bottom

})
// do not use data anymore


// To Try on the Stacked Bar Chart
// - Use the time scale on the x axis instead of the ordinal scale.







