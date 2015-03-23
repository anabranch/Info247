// ************ Guess 1 ************
var guess01 = d3.select('#guess-01');
var svg01 = guess01.append('svg')
										.attr('width', 300)
										.attr('height', 200);

var element01_01 = svg01.append('rect')
										.attr('width', 50)
										.attr('height', 50)
										.attr('x', 0)
										.attr('y', 0)
										.style('fill', 'aquamarine')
										.style('stroke', 'red')
										.style('stroke-width', 2);

// ************ Guess 2 ************
var guess02 = d3.select('#guess-02');
var svg02 = guess02.append('svg')
										.attr('width', 300)
										.attr('height', 200);

var element02_01 = svg02.append('rect')
											.attr('width', 150)
											.attr('height', 150)
											.attr('x', 75)
											.attr('y', 25)

var element02_03 = svg02.append('circle')
										.attr('width', 100)
										.attr('height', 100)
										.attr('r', 50)
										.attr('cx', 150)
										.attr('cy', 100)
										.style('fill', 'coral')

// ************ Guess 3 ************
var guess03 = d3.select('#guess-03');
var svg03 = guess03.append('svg')
										.attr('width', 300)
										.attr('height', 200);

var element03_01 = svg03.append('ellipse')
												.attr("cx", 70)
												.attr("cy", 50)
                        .attr("rx", 50)
												.attr("ry", 20)
												.style('fill', 'blue');

var element03_02 = svg03.append('ellipse')
												.attr("cx", 200)
												.attr("cy", 50)
                        .attr("rx", 50)
												.attr("ry", 20)
												.style('fill', 'blue');

// ************ Guess 4 ************
var reverse_guess = d3.select('#reverse-guess');

var reverseSVG = reverse_guess.append('svg')
										.attr('width', 300)
										.attr('height', 200);

var element04_01 = reverseSVG.append('circle')
										.attr('r', 40)
										.attr('cx', 50)
										.attr('cy', 50)
										.style('fill', 'red');

var element04_02 = reverseSVG.append('circle')
										.attr('r', 20)
										.attr('cx', 50)
										.attr('cy', 50)
										.style('fill', 'orange');

var element04_03 = reverseSVG.append('circle')
										.attr('r', 10)
										.attr('cx', 50)
										.attr('cy', 50)
										.style('fill', 'yellow');