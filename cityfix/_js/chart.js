// function to return color for each season
function colors(i) {
  switch(i) {
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

function make_chart(series, container, title){
    // set up the initial options
    var options = {
      chart: {
        renderTo: container,
        type: "column",
        style: {
          fontFamily: "Helvetica,Arial,sans-serif"
        }
      },
      legend: {
        borderRadius: 0,
        enabled: true,
        itemStyle: {
          color: "#000000",
          fontFamily: "Helvetica,Arial,sans-serif"
        }
      },

      plotOptions: {
        series: {
          stacking: "normal"
        }
      },
      series: series,
      title: {
        text: title,
        style: {
          color: "#000000",
          fontFamily: "Helvetica,Arial,sans-serif",
          fontSize: "20px",
          fontWeight: "bold"
        }
      },
      tooltip: {
        // hints: borderRadius, borderWidth, shadow
        borderRadius: 5,
        borderWidth: 1.5,
        shadow: true,
        style: {
          // hints: color, fontFamily, fontSize, padding
            color:"black",
            fontFamily: "Helvetica,Arial,sans-serif",
            padding: "5px",
            fontSize: "12px",
        }
      },
      xAxis: {
        categories: ["2009", "2010", "2011", "2012"],
        labels: {
          style: {
            color: "#333333",
            fontFamily: "Helvetica,Arial,sans-serif"
          }
        },
      },
      yAxis: {
        // hints: gridLineColor, gridLineDashStyle
        gridLineColor: "#aaaaaa",
        gridLineDashStyle: "ShortDot",
        labels: {
          style: {
            color: "#333333",
            fontFamily: "Helvetica,Arial,sans-serif",
          }
        },
        min: 0,
        title: {
          style: {
            color: "#333333",
            fontFamily: "Helvetica,Arial,sans-serif"
          },
          text: "Number of Requests"
        }
      }
    }
    console.log(options)
  var chart = new Highcharts.Chart(options);
}


// ajax call to data from the csv file
$.get("_data/cityfixitdata.csv", function (data) {

  // split the csv by line ("\n"), remove header
  lines = data.split("\n").slice(1);
  // make sure data sorted by years
  lines.sort(function(a,b){
      if (a[2]<b[2]) { return -1; }
      if (a[2]>b[2]) { return 1; }
      return 0;
  });
  var problems = {};
  var problemList = [];
  var appSuffix = "through SeeClickFix"
  

  // loop through each line using $.each
  $.each(lines, function(lineNo, line) {
      if (line.length === 0) {return true;}
        var items = line.split(",");
        var problemType = items[0];
        var numRequests = parseFloat(items[1]);
        var year = items[2];
        var numApp = parseFloat(items[4]);

        if (!(problemType in problems)){
            problemList.push(problemType);

            // series for total requests
            problems[problemType] = {
                name: problemType,
                id: problemType,
                color: colors(problemType),
                stack: problemType,
                data: []
            };

            // series for # through app
            problems[problemType + appSuffix] = {
                name: problemType,
                id: problemType + "AppReports",
                linkedTo: problemType,
                color: "#aaa", //colors(problemType),
                dashStyle: "dash",
                stack: problemType,
                data: []
            };

        }

        problems[problemType].data.push(numRequests-numApp);
        problems[problemType + appSuffix].data.push(numApp);

    })
    var overThousand = [];
    var underThousand = [];
    $.each(problemList, function(n, problem){
        var problem_count = problems[problem].data.slice(-2);
        problem_count = problem_count[0]+problem_count[1];
        console.log(problem_count);
        if (problem_count>=1000){
            overThousand.push(problems[problem]);
            overThousand.push(problems[problem + appSuffix])
        } else {
            underThousand.push(problems[problem]);
            underThousand.push(problems[problem + appSuffix])
        }
    });

    make_chart(overThousand, "over1000", "High Frequency Requests");
    make_chart(underThousand, "under1000", "Low Frequency Requests");

});
