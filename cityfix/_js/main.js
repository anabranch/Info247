function colors(i) {
  switch (i) {
    case "IllegalDumping":
      return "#1F77B4";
      break;
    case "BuildingMaintenance":
      return "#DBDD8D";
      break;
    case "Electrical":
      return "#2CA02C";
      break;
    case "StreetSweeping":
      return "#D62728";
      break;
    case "RoadRepair":
      return "#B23AEE";
      break;
    case "VegetationControl":
      return "#03070b";
      break;
    case "Graffiti":
      return "#ffff66";
      break;
    case "Survey":
      return "#ff8d00";
      break;
    case "Drainage":
      return "#00ff7f";
      break;
    case "StreetLights":
      return "#01aebf";
      break;

      return "Pink";
  };
}


var groupData = function(data, col) {
  var groups = {};
  var all = data.map(function(line, i) {
    return data[col];
  });
  for (var val in all) {
    groups[val] = {};
  }
};

var splitCsv = function(data) {
  var lines = data
    .split("\n");
  lines = lines.map(function(line, i) {
    return line.split(",");
  });
  return {
    headers: lines.shift(),
    lines: lines
  };
};

var avgDayOptions = {
  chart: {
    type: 'bar',
    marginLeft: 120
  },
  title: {
    text: 'Average Days to Respond Per Category'
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    title: {
      align: 'high',
      offset: 0,
      text: 'Problem Type',
      rotation: 0,
      y: -10
    }
  },
  yAxis: {
    showEmpty: true,
    labels: {
      enabled: false
    },
    gridLineWidth: 0
  }
}


// Average Days Set up
$.getJSON("_data/avgdays.json", function(jsondata) {
  // Get our Series Categories
  var cats = jsondata.map(function(val) {
    return val.name;
  });
  // Map the data to a better series format
  var data = jsondata.map(function(val, i) {
    return {
      color: colors(val.name),
      y: val.data,
      name: val.name,
      dataLabels: {
        enabled: true,
      }
    }
  });

  // Set our options
  avgDayOptions.xAxis.categories = cats;
  avgDayOptions.series = [{
    data: data
  }];
  $('#daystoclose').highcharts(avgDayOptions);

});

// handle comparison graphs

var overTimeOptions = function() {
  return {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Total Number of Complaints by Type'
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      title: {
        align: 'high',
        offset: 0,
        text: 'Problem Type',
        rotation: 0,
        y: -10
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    yAxis: {}
  };
};

$.get("_data/cityfixitdata.csv", function(data) {
  // split the csv by line("\n"), remove header, sort
  var csv = splitCsv(data);
  var otOp = overTimeOptions();

  var year_index = csv.headers.indexOf('Year');
  var prob_index = csv.headers.indexOf('ProblemType');
  var num_index = csv.headers.indexOf('NumRequests');
  var app_index = csv.headers.indexOf('%ReportedBySeeClickFix');
  var year_data = {};

  csv.lines.map(function(line) {
    if (line[year_index] !== undefined) {

      if (line[year_index] in year_data) {
        year_data[line[year_index]].push(line);
      } else {
        year_data[line[year_index]] = [line];
      }
    };
  });

  otOp.xAxis.categories = Object.keys(year_data);

  var series = [];
  var total, fromApp, intTotal, intFromApp;

  for (var i = 0; i <= 4; i++) {
    total = [];
    fromApp = [];
    for (var year in year_data) {
      intTotal = parseInt(year_data[year][i][num_index]);
      intFromApp = intTotal * parseFloat(year_data[year][i][app_index]) / 100;
      total.push(intTotal - intFromApp);
      fromApp.push(intFromApp);
    }
    series.push({
      name: 'Not From App',
      stack: year_data[2009][i][prob_index],
      color: colors(year_data[2009][i][prob_index]),
      data: total
    });
    series.push({
      name: 'From App',
      stack: year_data[2009][i][prob_index],
      color: colors(year_data[2009][i][prob_index]),
      data: fromApp
    });
  }
  otOp.series = series;
  console.log(series);
  $('#comp1').highcharts(otOp);
});



$.get("_data/cityfixitdata.csv", function(data) {
  // split the csv by line("\n"), remove header, sort
  var csv = splitCsv(data);
  var otOp = overTimeOptions();

  var year_index = csv.headers.indexOf('Year');
  var prob_index = csv.headers.indexOf('ProblemType');
  var num_index = csv.headers.indexOf('NumRequests');
  var app_index = csv.headers.indexOf('%ReportedBySeeClickFix');
  var year_data = {};

  csv.lines.map(function(line) {
    if (line[year_index] !== undefined) {

      if (line[year_index] in year_data) {
        year_data[line[year_index]].push(line);
      } else {
        year_data[line[year_index]] = [line];
      }
    };
  });

  otOp.xAxis.categories = Object.keys(year_data);

  var series = [];
  var total, fromApp, intTotal, intFromApp;

  for (var i = 5; i <= 9; i++) {
    total = [];
    fromApp = [];
    for (var year in year_data) {
      intTotal = parseInt(year_data[year][i][num_index]);
      intFromApp = intTotal * parseFloat(year_data[year][i][app_index]) / 100;
      total.push(intTotal - intFromApp);
      fromApp.push(intFromApp);
    }
    series.push({
      name: 'Not From App',
      stack: year_data[2009][i][prob_index],
      color: colors(year_data[2009][i][prob_index]),
      data: total
    });
    series.push({
      name: 'From App',
      stack: year_data[2009][i][prob_index],
      color: colors(year_data[2009][i][prob_index]),
      data: fromApp
    });
  }
  otOp.series = series;
  console.log(series);
  $('#comp2').highcharts(otOp);
});
