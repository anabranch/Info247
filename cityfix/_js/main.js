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
var options = {
  chart: {
    type: 'bar',
    marginLeft:150,
    marginRight:50
  },
  title: {
    text: 'Average Days to Respond Per Category'
  },
  xAxis: {
    // title: {
    //   text: "Report Type",
    //   rotation:270
    // }
    title: {
      align: 'high',
      offset: 0,
      text: 'Problem Type',
      rotation: 0,
      y: -10
    }
  },
  tooltip: {
    formatter: function() {
      return '<b>' + name + '</b><br/>' +
        this.x + ': ' + this.y;
    }
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    floating: true,
    backgroundColor: '#FFFFFF',
    align: 'right',
    verticalAlign: 'top',
    y: 60,
    x: -60
  },
  series: []
}


$.getJSON("_data/avgdays.json", function(jsondata) {
  var cats = jsondata.map(function(val) {
    return val.name;
  });

  var data = jsondata.map(function(val) {
    return {
      color: colors(val.name),
      y: val.data,
    }
  });


  var values = jsondata.map(function(val) {
    return val.data
  });
  options.xAxis.categories = cats;
  options.series = [{
    data: values
  }];
  console.log(cats);
  console.log(options);

  $('#daystoclose').highcharts(options);
});
