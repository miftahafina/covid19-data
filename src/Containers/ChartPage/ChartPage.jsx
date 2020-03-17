import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import ListBox from '../../Components/ListBox/ListBox';
import Loading from '../../Components/Loading/Loading';

const ChartPage = () => {
  const [countryChartList, setCountryChartList] = useState([]);
  const [indonesiaNumber, setIndonesiaNumber] = useState(0);
  const [showRow] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://covid19.mathdro.id/api/confirmed')
      .then(res => {
        setCountryChartList(res.data)
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
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
      {
        loading ? <Loading /> : 
        <ol className="chartList">
          {
            countryChartList
            .filter((data, index) => (index < showRow || data.countryRegion === 'Indonesia' ))
            .map((data, index) => (
              <ListBox
                key={index} 
                index={index}
                data={data} 
                showOrder={(a, b) => showOrder(a, b)}
                toggleProvinceState={(a, b) => toggleProvinceState(a, b)}/>
            ))
          }
        </ol>
      }
    </div>
  )
}

export default ChartPage;
