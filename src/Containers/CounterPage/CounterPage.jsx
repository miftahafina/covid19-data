import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import SelectBox from '../../Components/SelectBox/SelectBox';
import CounterBoxLg from '../../Components/CounterBoxLg/CounterBoxLg';
import CounterBox from '../../Components/CounterBox/CounterBox';
import Disclaimer from '../../Components/Disclaimer/Disclaimer';

const CounterPage = () => {
  const [covidCount, setCovidCount] = useState(0);

  const [countryList, setCountryList] = useState({});
  const [countryCode, setCountryCode] = useState('ID');

  const [loadingCovidCount, setloadingCovidCount] = useState(true);
  const [loadingCountryList, setloadingCountryList] = useState(true);

  const [found, setFound] = useState(true);
  
  useEffect(() => {
    // covid data
    axios.get(`https://covid19.mathdro.id/api/countries/${countryCode}`)
      .then(res => {
        setCovidCount(res.data);
        setloadingCovidCount(false);
        setFound(true);
      })
      .catch(err => {
        console.log(err);
        setFound(false);
      });
  }, [countryCode]);

  useEffect(() => {
    // country list
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountryList(res.data);
        setloadingCountryList(false)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleOnChange = (value) => {
    setCountryCode(value);
  }

  useEffect(() => {
    console.log('effect:', loadingCountryList);
  }, [loadingCountryList])

  const { confirmed, recovered, deaths, lastUpdate } = covidCount;

  return (
    <div className="content">
      {
        loadingCountryList ? <p>Memuat...</p> :
        <Fragment>
          <SelectBox countryList={countryList} countryCode={countryCode} handleOnChange={(e) => handleOnChange(e)}/>
          {
            !found || loadingCovidCount ? <p>Data tidak ditemukan.</p> :
            <Fragment>
              <CounterBoxLg confirmed={confirmed} />
              <CounterBox confirmed={confirmed} recovered={recovered} deaths={deaths} />
              <Disclaimer lastUpdate={lastUpdate} />
            </Fragment>
          }
        </Fragment>
      }
    </div>
  )
}

export default CounterPage;
