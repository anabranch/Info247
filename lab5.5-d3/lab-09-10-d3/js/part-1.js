// // 1) Select container with ID.

var container = d3.select('#chart-container');

// // 2) Create and append the SVG container.

var svgWidth = 600;
var svgHeight = 400;
var svg = container.append('svg')
					.attr('width', svgWidth)
					.attr('height', svgHeight);

// // // 3) Bind elements to SVG

// var demoCircle = svg.append('circle')
// 										.attr('r', 70)
// 										.attr('cx', 100) // Circles use cx, cy. Other shapes use x,y.
// 										.attr('cy', 70)
// 										.style('fill', 'cornflowerblue')
// 										.style('stroke', 'gray')
// 										.style('stroke-width', 20)
// 										;

var chartTitle = svg.append('text')
        .attr('x', svgWidth / 2)             
        .attr('y', 20)
        .attr('text-anchor', 'middle') 
        .attr('class', 'h4') 
        .style('text-decoration', 'underline')  
        .text('ISchool Enrollment');

// // 4) Bind data to elements
var enrollment = [
	{ 'year' : '2011', 'count': 40 },
	{ 'year' : '2012', 'count': 35 },
	{ 'year' : '2013', 'count': 50 },
	{ 'year' : '2014', 'count': 55 },
	{ 'year' : '2015', 'count': 45 }
]
var bars = svg.selectAll('rect') // Returns a new empty selection, since the SVG container was empty.
							.data(enrollment) // Bind the data to the rectangles.
							.enter() // Leftover unbound data produce the enter selection, which represents missing elements. Read more at http://bost.ocks.org/mike/join/
							.append('rect'); // Append the rectangles.
// console.log(bars);

// // 5) Position and style the elements
var heightScale = 5;
var barHeight = function(count) { return count * heightScale};
var barWidth = function(index) { return index * 100 };
var barStyles = bars
 										.attr('x', function(d, i) { return barWidth(i); })
 										.attr('y', function(d) { return svgHeight - barHeight(d.count); })
 										.attr('width', 40)
 										.attr('height', function(d) { return barHeight(d.count); })
 										.style('fill', 'cornflowerblue');

// // 7) Create labels
var barCountLabels = svg.selectAll('p')
									.data(enrollment)
									.enter()
									.append('text')
									.attr('class', 'font_small')
									.attr('fill', 'black')
									.attr('x', function(d,i) { return barWidth(i) + 12 })
									.attr('y', function(d) { return svgHeight - barHeight(d.count) - 10 })
									.text(function(d) { return d.count.toString() });

var yearLabels = svg.selectAll('p')
									.data(enrollment)
									.enter()
									.append('text')
									.attr('class', 'h5')
									.attr('fill', 'black')
									.attr('x', function(d,i) { return barWidth(i) + 3})
									.attr('y', function(d) { return svgHeight })
									.text(function(d) { return d.year });

// // 8) Create average line
var average = function(data) {
	var sum = 0;
	for (var i = data.length - 1; i >= 0; i--) {
		sum += data[i].count;
	};
	return sum / data.length
}

var lineData = [
	{"x": 0, "y" : average(enrollment) * heightScale},
	{"x": svgWidth, "y" : average(enrollment) * heightScale}
]
var lineFunction = d3.svg.line()
													.x(function(d) { return d.x; })
													.y(function(d) { return d.y; })
													.interpolate('linear');

var lineGraph = svg.append('path')
										.attr('d', lineFunction(lineData))
										.attr('stroke', 'red')
										.attr('stroke-width', 2)
										.attr('fill', 'none');

var lineLabel = svg.append('text')
						        .attr('x', svgWidth - 50)
						        .attr('y', average(enrollment) * heightScale - 10)
						        .attr('class', 'font_small')
						        .text('average');











