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
var avgDayOptions = {
  chart: {
    type: 'bar',
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
  var cats = jsondata.map(function(val) {
    return val.name;
  });

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


  var values = jsondata.map(function(val) {
    return val.data
  });

  avgDayOptions.xAxis.categories = cats;
  avgDayOptions.series = [{
    data: data
  }];
  console.log(cats);
  console.log(avgDayOptions);

  $('#daystoclose').highcharts(avgDayOptions);
});
