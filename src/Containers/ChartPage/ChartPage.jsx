import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChartPage = () => {
  const [countryChartList, setCountryChartList] = useState([]);

  useEffect(() => {
    axios.get('https://covid19.mathdro.id/api/confirmed')
      .then(res => {
        setCountryChartList(res.data)
      });
  }, []);

  const toggleProvinceState = (provinceState, countryRegion) => (
    provinceState && (provinceState !== countryRegion) ? `(${provinceState})` : ''
  )

  return (
    <div className="content">
      <ol className="chartList">
        {
          countryChartList.map((data, index) => (
            <li key={index}>
              <div className="chartNumber">
                <div className="position">{index + 1}</div>
              </div>
              <div className="chartContent">
                <div className="countryName">
                  {data.countryRegion} {' '}
                  <span className="provinceStateName">{toggleProvinceState(data.provinceState, data.countryRegion)}</span>
                </div>
                <div className="caseSummary">
                  <span className="text-warning">{data.confirmed}</span>{' '}
                  <span className="text-success">{data.recovered}</span>{' '}
                  <span className="text-danger">{data.deaths}</span>
                </div>
              </div>
            </li>
          ))
        }
      </ol>
    </div>
  )
}

export default ChartPage;
