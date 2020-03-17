import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import confirmed from '../../Images/confirmed.png';
import recovered from '../../Images/recovered.png';
import deaths from '../../Images/deaths.png';

const ChartPage = () => {
  const [countryChartList, setCountryChartList] = useState([]);
  const [indonesiaNumber, setIndonesiaNumber] = useState(0);
  const [showRow] = useState(10)

  useEffect(() => {
    axios.get('https://covid19.mathdro.id/api/confirmed')
      .then(res => {
        setCountryChartList(res.data)
      });
  }, []);

  const toggleProvinceState = (provinceState, countryRegion) => (
    provinceState && (provinceState !== countryRegion) ? `(${provinceState})` : ''
  )

  const showOrder = (countryRegion, index) => (
    <Fragment>{(countryRegion === 'Indonesia') ? indonesiaNumber : index + 1}</Fragment>
  )

  useEffect(() => {
    countryChartList.filter((data, index) => 
      data.countryRegion === 'Indonesia' ? setIndonesiaNumber(index + 1) : ''
    )
  }, [countryChartList])

  return (
    <div className="content">
      <ol className="chartList">
        {
          countryChartList
          .filter((data, index) => (index < showRow || data.countryRegion === 'Indonesia' ))
          .map((data, index) => (
            <li key={index}>
              <div className="chart-number">
                <div className="position">
                  { showOrder(data.countryRegion, index) }
                </div>
              </div>
              <div className="chart-content">
                <div className="country-name">
                  {data.countryRegion.split(', ').reverse().join(' ')} {' '}
                  <span className="province-state-name">{toggleProvinceState(data.provinceState, data.countryRegion)}</span>
                </div>
                <div className="case-summary">
                  <img src={confirmed} alt="icon confirmed" className="icon"  />{' '}
                  <span className="case-summary-text text-warning">{data.confirmed}</span>{' '}

                  <img src={recovered} alt="icon recovered" className="icon"  />{' '}
                  <span className="case-summary-text text-success">{data.recovered}</span>{' '}

                  <img src={deaths} alt="icon deaths" className="icon"  />{' '}
                  <span className="case-summary-text text-danger">{data.deaths}</span>
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
