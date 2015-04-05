var height = 627,
  width = 627,
  originalMatrix,
  layout;

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

function generateLayout() {
  return d3.layout.chord()
    .padding(0.02);
}

//////////////////////////////////////////////////
// Now Creating Functions
//////////////////////////////////////////////////

function filterMatrix(nodes, matrix) {
  var newMatrix = matrix
    .map(function(d, i) {
      return filterArray(nodes, d);
    })
  return filterArray(nodes, newMatrix);
}

function filterArray(nodes, array) {
  return array.filter(function(d, i) {
    return ($.inArray(i, nodes) > -1);
  });
}

function getIncludedChords(origin) {
  var asSource = layout.chords().filter(function(d, ind) {
    return d.source.index === origin;
  });

  var asTarget = layout.chords().filter(function(d, ind) {
    return d.target.index === origin;
  });

  return _.uniq(asSource.concat(asTarget));
}

function getIncludedGroups(chords, origin) {
  var targets = chords.map(function(d, i) {
    return d.source.index === origin ? d.target.index : undefined;
  });
  var sources = chords.map(function(d, i) {
    return d.target.index === origin ? d.source.index : undefined;
  });

  return _.uniq(targets.concat(sources).filter(function(d) {
    return d !== undefined;
  }));
}

function groupClick(g, i) {
  console.log("Source Node => " + i);

  var includedChords = getIncludedChords(i);
  var includedGroups = getIncludedGroups(includedChords, i);

  var newMatrix = filterMatrix(includedGroups, originalMatrix);
  layout = generateLayout();
  layout.matrix([]);
  draw();

  setTimeout(function() {

    layout = generateLayout();
    layout.matrix(newMatrix);

    draw();
  }, 500);



}



function draw() {
  var dataGroups = groups.selectAll('path')
    .data(layout.groups);

  var dataChords = chords.selectAll('path')
    .data(layout.chords);

  var enterGroups = dataGroups
    .enter()
    .append('path')
    .attr("d", arc)
    .on("click", groupClick);

  var enterChords = dataChords
    .enter()
    .append('path')
    .attr("d", d3.svg.chord().radius(innerRadius));

  dataGroups.exit().transition().remove();
  dataChords.exit().transition().remove();
}


//////////////////////////////////////////////////
// Initialization
//////////////////////////////////////////////////
$.get("/data/airports.csv", function(airports) {
  airports = airports.split("\n");
  d3.json("/data/matrix.json", function(matrix) {
    layout = generateLayout();
    layout.matrix(matrix);
    originalMatrix = matrix;
    draw();
  });
});
