import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ChartPage = () => {
  const [dailyReport, setDailyReport] = useState([]);
  const [startDate, setStartDate] = useState(); // 2 Maret 2020
  const [endDate, setEndDate] = useState(); // current date
  const [dateRange, setDateRange] = useState([]);

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
  
  // useEffect(() => {
  //   if (dateRange.length > 0) {
  //     console.log('dateRange', dateRange);
  //   }
  // }, [dateRange])

  useEffect(() => {
    getDateRange(startDate, endDate);
  }, [startDate, endDate])

  // useEffect(() => {
  //   if (dailyReport.length > 0) {
  //     console.log('dailyReport', dailyReport);
  //   }
  // }, [dailyReport])

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
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  }

  return (
    <div className="content">
      <h1>Daily Report</h1>

      <Line data={getChartData} />
      
      
      <ul>
        {
          dailyReport.map((data, index) => (
          <li key={index}>
            <small>
              Country {data.countryRegion}<br />
              Confirmed {data.confirmed}<br />
              Recovered {data.recovered}<br />
              Deaths {data.deaths}<br />
              last Update {data.lastUpdate}
            </small>
          </li>
          ))
        }
      </ul>

      <h1>Date Range</h1>
      <ul>
        {
          dateRange.map((data, index) => (
            <li key={index}>{data}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default ChartPage;
