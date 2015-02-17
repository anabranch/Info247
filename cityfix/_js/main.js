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
    marginLeft: 125,
    height:550,
    width:320,
  },
  title: {
    text: 'Average Days to Respond'
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    title: {
      align: 'high',
      offset: 0,
      text: '',
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
  jsondata.sort(function(a,b){return a.data-b.data;});
  jsondata.reverse();
  var cats = jsondata.map(function(val) {
    return val.name;
  });
  console.log(cats);
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
  console.log(data);


  // Set our options
  avgDayOptions.xAxis.categories = cats;
  avgDayOptions.series = [{
    data: data
  }];
  $('#daystoclose').highcharts(avgDayOptions);

});

// handle comparison graphs

var overTimeOptions = function(title) {
  return {
    chart: {
      type: 'column',
      width:480,
      height:250
    },
    title: {
      text: title
    },
    legend: {
      enabled: true,
      itemStyle:{
          fontSize: "6pt"
      }
    },
    xAxis: {
      title: {
        align: 'high',
        offset: 0,
        //text: 'Problem Type',
        rotation: 0,
        y: -10
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    yAxis: {
        title:{text:"# Requests"}
    }
  };
};

$.get("_data/cityfixitdata.csv", function(data) {
  // split the csv by line("\n"), remove header, sort
  var csv = splitCsv(data);
  var otOp = overTimeOptions("High Frequency Requests");

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
      name: year_data[2009][i][prob_index],
      id: year_data[2009][i][prob_index],
      stack: year_data[2009][i][prob_index],
      color: colors(year_data[2009][i][prob_index]),
      data: total
    });
    series.push({
      name: year_data[2009][i][prob_index],
      linkedTo: year_data[2009][i][prob_index],
      stack: year_data[2009][i][prob_index],
      color: "black",
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
  var otOp = overTimeOptions("Low Frequency Requests");

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
      name: year_data[2009][i][prob_index],
      id: year_data[2009][i][prob_index],
      stack: year_data[2009][i][prob_index],
      color: colors(year_data[2009][i][prob_index]),
      data: total
    });
    series.push({
      name: year_data[2009][i][prob_index],
      linkedTo: year_data[2009][i][prob_index],
      stack: year_data[2009][i][prob_index],
      color: "black",
      data: fromApp
    });

  }
  otOp.series = series;
  console.log(series);
  $('#comp2').highcharts(otOp);
});
