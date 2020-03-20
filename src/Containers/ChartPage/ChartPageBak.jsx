import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChartPage = () => {
  const [dailyReport, setDailyReport] = useState([]);
  const [startDate] = useState(new Date('2020-03-02')); // 2 Maret 2020
  const [endDate] = useState(new Date('2020-03-18')); // current date
  const [dateRange, setDateRange] = useState([]);

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
    if (dateRange.length > 0) {
      console.log('dateRange', dateRange);
    }
  }, [dateRange])

  useEffect(() => {
    getDateRange(startDate, endDate);
  }, [startDate, endDate])

  useEffect(() => {
      console.log('dailyReport', dailyReport);
    if (dailyReport.length > 0) {
    }
  }, [dailyReport])

  useEffect(() => {
    let arrFiltered = [];

    dateRange.map((data, index) => (
      axios.get(`https://covid19.mathdro.id/api/daily/${data}`)
        .then(res => {
            const filtered = res.data.filter((data2, index) => (data2.countryRegion === 'Indonesia'));
            return filtered;
          }
        )

        .then(filtered => {
          arrFiltered.push(...filtered);
          setDailyReport(arrFiltered.concat(filtered));
        })

        .then(() => {
          console.log('arrFiltered', arrFiltered);
        })

        .catch((err) => {
          console.log('Error when fetching data from API', err);
        })
    ));

    console.log('arrFiltered outside loop', arrFiltered);
  }, [dateRange]);

  return (
    <div className="content">
      <h1>Daily Report</h1>
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
