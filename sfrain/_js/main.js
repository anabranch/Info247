// function to return color for each season
function colors(i) {
  switch (i) {
    case 0:
      return "#1F77B4"; // winter
      break;
    case 1:
      return "#DBDD8D"; // spring
      break;
    case 2:
      return "#2CA02C"; // summer
      break;
    case 3:
      return "#D62728"; // fall
  };
}

// set up the initial options
var options = {
  chart: {
    renderTo: "container",
    type: "bar",
    style: {
      fontFamily: "Helvetica,Arial,sans-serif"
    }
  },
  legend: {
    borderRadius: 0,
    itemStyle: {
      color: "#000000",
      fontFamily: "Helvetica,Arial,sans-serif"
    }
  },

  plotOptions: {
    series: {
      stacking: "normal" // vs. "percent"
    }
  },
  series: [],
  title: {
    text: "San Francisco Rainfall 2000-2015",
    style: {
      color: "#000000",
      fontFamily: "Helvetica,Arial,sans-serif",
      fontSize: "20px",
      fontWeight: "bold"
    }
  },
  tooltip: {
    // hints: borderRadius, borderWidth, shadow
    borderRadius:5,
    shadow:false,
    borderWidth:2,
    style: {
      // hints: color, fontFamily, fontSize, padding
      color:'black',
      padding:'8px', 
      fontSize:'13px',
    }
  },
  xAxis: {
    categories: [],
    labels: {
      style: {
        color: "#333333",
        fontFamily: "Helvetica,Arial,sans-serif"
      }
    },
  },
  yAxis: {
    // hints: gridLineColor, gridLineDashStyle
    gridLineDashStyle:'dot',
    gridLineColor:'grey',
    labels: {
      style: {
        color: "#333333",
        fontFamily: "Helvetica,Arial,sans-serif"
      }
    },
    min: 0,
    stackLabels: {
      enabled: true,
      style: {
        fontFamily: "Helvetica,Arial,sans-serif",
        fontWeight: "bold",
        color: "#333333"
      }
    },
    title: {
      style: {
        color: "#333333",
        fontFamily: "Helvetica,Arial,sans-serif"
      },
      text: "Inches of Rain"
    }
  }
}

$.get("_data/SF_rainfall_seasons.csv", function(csv) {
  var lines = csv.split("\n");
  var seasons = [];
  var rainBySeason = [
    [],
    [],
    [],
    []
  ];

  var cats = [];

  $.each(lines, function(lineNo, line) {
    var items = line.split(',');

    if (lineNo == 0) {
      seasons = items.slice(1, 5);
    } else {
      cats.push(items[0]);
      rainBySeason[0].push(Number.parseFloat(items[1]));
      rainBySeason[1].push(Number.parseFloat(items[2]));
      rainBySeason[2].push(Number.parseFloat(items[3]));
      rainBySeason[3].push(Number.parseFloat(items[4]));
    };

  });
  options.xAxis.categories = cats;
var tempSeries = [];
  for (var i = 0; i < rainBySeason.length; i++) {
    tempSeries.push({
      name:seasons[i],
      data: rainBySeason[i],
      color: colors(i),
      index: rainBySeason.length -1 -i,
      legendIndex:i

    });
  };
  options.series = tempSeries;
console.log(tempSeries);
  var chart = new Highcharts.Chart(options);
});
