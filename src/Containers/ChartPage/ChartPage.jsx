import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ChartPage = () => {
  const [dailyReport, setDailyReport] = useState([]);
  const [sortedDailyReport, setSortedDailyReport] = useState([]);

  const [startDate, setStartDate] = useState(); // 2 Maret 2020
  const [endDate, setEndDate] = useState(); // current date
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
    setChartLabel(sortedDailyReport.map(data => {
      return `${new Date(data.lastUpdate).getDate()}/${new Date(data.lastUpdate).getMonth()+1}`
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
      <h1>Daily Report</h1>
      <Line data={getChartData} />
    </div>
  )
}

export default ChartPage;
