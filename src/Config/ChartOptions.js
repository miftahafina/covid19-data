const ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend:{
    position: 'top',
    labels:{
      fontColor: "white",
    }
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  scales: {
    xAxes: [{
      display: true,
      scaleLabel: {
        // display: true,
        // labelString: 'Tanggal update',
      },
      ticks: {
        fontSize: 10,
        autoSkip: true,
        maxTicksLimit: 10
      },
      gridLines: {
        display: false,
        color: '#182025'
      }
    }],
    yAxes: [{
      ticks: {
        fontSize: 10,
        autoSkip: true,
        maxTicksLimit: 7
      },
      gridLines: {
        display: true,
        color: '#182025',
        height: 200
      }
    }]
  },
  elements: {
    point:{
      radius: 0
    }
  }
}

export default ChartOptions;
