import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ChartPage = () => {
  const [dailyReport, setDailyReport] = useState([]);
  const [sortedDailyReport, setSortedDailyReport] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dateRange, setDateRange] = useState([]);

  const [chartLabel, setChartLabel] = useState([]);
  const [chartDataConfirmed, setChartDataConfirmed] = useState([]);
  const [chartDataRecovered, setChartDataRecovered] = useState([]);
  const [chartDataDeaths, setChartDataDeaths] = useState([]);

  const compare = (a, b) => {
    if ( a.lastUpdate < b.lastUpdate ){
      return -1;
    }
    if ( a.lastUpdate > b.lastUpdate ){
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    let sorted = dailyReport;
    setSortedDailyReport(sorted.sort(compare));

  }, [dailyReport])

  useEffect(() => {
    let monthIndo = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    
    setChartLabel(sortedDailyReport.map(data => {
      return `${new Date(data.lastUpdate).getDate()} ${monthIndo[new Date(data.lastUpdate).getMonth()]}`
    }));
  }, [sortedDailyReport])


  useEffect(() => {
    setChartDataConfirmed(sortedDailyReport.map(data => data.confirmed));
    setChartDataRecovered(sortedDailyReport.map(data => data.recovered));
    setChartDataDeaths(sortedDailyReport.map(data => data.deaths));
  }, [sortedDailyReport])

  const initDate = () => {
    let firstCaseDate = new Date('2020-03-02');
    let today = new Date();

    setStartDate(firstCaseDate);
    setEndDate(today.setDate(today.getDate() - 1));
  }

  useEffect(() => {
    initDate();
  }, [])

  const getDateRange = (start, end) => {
    let arrDate = [];
    let arrDateFormatted = [];
    let date = new Date(start);

    while (date <= end) {
      arrDate.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    arrDate.map((data, index) => (
      arrDateFormatted.push(`${data.getMonth()+1}-${data.getDate()}-${data.getFullYear()}`)
    ));

    setDateRange(arrDateFormatted);
  }
  
  useEffect(() => {
    getDateRange(startDate, endDate);
  }, [startDate, endDate])

  useEffect(() => {
    dateRange.map((data, index) => (
      axios.get(`https://covid19.mathdro.id/api/daily/${data}`)
        .then(res => {
            const filtered = res.data.filter((data2, index) => (data2.countryRegion === 'Indonesia'));
            return filtered;
          }
        )

        .then(filtered => {
          setDailyReport(dailyReport => [...dailyReport, ...filtered])
        })

        .catch(err => {
          console.log('Error when fetching data from API', err);
        })
    ));
  }, [dateRange]);

  const getChartOptions = () => {
    return {
      legend:{
        position: 'bottom',
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
            display: true,
            labelString: 'Tanggal update',
          },
          ticks: {
            fontSize: 10,
            autoSkip: true,
            // maxTicksLimit: 10
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
            maxTicksLimit: 6
          },
          gridLines: {
            display: true,
            color: '#182025',
            height: 200
          }
        }]
      }
    }
  }

  const getChartData = () => {
    return {
      labels: chartLabel,
      datasets: [
        {
          label: 'Terkonfirmasi',
          data: chartDataConfirmed,
          backgroundColor: '#000A12',
          borderColor: '#f2b900',
          borderWidth: 1
        },
        {
          label: 'Sembuh',
          data: chartDataRecovered,
          backgroundColor: '#000A12',
          borderColor: '#52cc99',
          borderWidth: 1
        },
        {
          label: 'Meninggal',
          data: chartDataDeaths,
          backgroundColor: '#000A12',
          borderColor: '#f26353',
          borderWidth: 1
        },
      ]
    }
  }

  return (
    <div className="content">
      <h2>
        Grafik Perkembangan<br />
        <small>Kasus COVID-19 di Indonesia</small>
      </h2>

      <div className="card-chart">
        <Line data={getChartData()} options={getChartOptions()}/>
      </div>

      <div className="footer">
        Perhatian! Saat ini masih terdapat redudansi data pada tanggal update yang diperoleh, insya Allah akan segera diperbaiki. Data diambil dari <a href="https://github.com/mathdroid/covid-19-api">mathdroid/covid-19-api</a>
      </div>
    </div>
  )
}

export default ChartPage;
