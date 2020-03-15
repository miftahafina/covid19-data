import React, { Fragment, useState, useEffect } from 'react';
import 'normalize.css';
import axios from 'axios';

const App = () => {
  const [covidCount, setCovidCount] = useState(0);
  const [countryList, setCountryList] = useState({});
  const [countryCode, setCountryCode] = useState('ID');
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(true);
  
  useEffect(() => {
    // spesific country
    axios.get(`https://covid19.mathdro.id/api/countries/${countryCode}`)
      .then(res => {
        setCovidCount(res.data);
        setLoading(false);
        setFound(true);
      })
      .catch(err => {
        console.log(err);
        setFound(false);
      });
  }, [countryCode]);

  useEffect(() => {
    // countries
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log(res.data);
        setCountryList(res.data);
      })
  }, []);

  const percentage = (value, total) => {
    return (value / total * 100).toFixed(2);
  }

  const lastUpdateIndo = (date) => {
    const d = new Date(date);
    const monthIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    
    return `${d.getDate()} ${monthIndo[d.getMonth()]} ${d.getFullYear()} pukul ${d.getHours()}.${d.getMinutes()} WIB`;
  }

  const handleOnChange = (value) => {
    setCountryCode(value);
  }

  const { confirmed, recovered, deaths, lastUpdate } = covidCount;

  return (
    <div className="container">
      <div className="header" onClick={() => handleOnChange('ID')}>
        <div className="title">COVID-19 di Berbagai Negara</div>
      </div>
      
      <div className="content">
        {
          loading ? <p>Memuat...</p> :
          <Fragment>
            <select className="select-box" name="countryCode" id="countryCode" onChange={e => handleOnChange(e.target.value)} value={countryCode}>
              {
                countryList.map((country, index) => 
                  <option value={country.alpha2Code} key={country.alpha2Code}>
                    {country.name}
                  </option>
                )
              }
            </select>
            <small className="help-text">ketuk untuk mengganti negara</small>

            {
              !found ? <p>Data tidak ditemukan.</p> :
              <Fragment>
                <div className="counter-lg-box">
                  <div className="counter-lg-value">
                    {confirmed.value}
                  </div>
                  <div className="counter-lg-label">
                    Terkonfirmasi
                  </div>
                </div>

                <div className="counter-container">
                  <div className="counter-box">
                    <div className="counter-value">
                      {recovered.value}
                    </div>
                    <div className="counter-label">
                      Sembuh
                    </div>
                    <div className="counter-percentage">
                      {percentage(recovered.value, confirmed.value)}%
                    </div>
                  </div>

                  <div className="counter-box-separator"></div>

                  <div className="counter-box">
                    <div className="counter-value">
                      {deaths.value}
                    </div>
                    <div className="counter-label">
                      Meninggal
                    </div>
                    <div className="counter-percentage">
                      {percentage(deaths.value, confirmed.value)}%
                    </div>
                  </div>
                </div>

                <div className="footer">
                  Data per-{lastUpdateIndo(lastUpdate)} <br></br>
                  diambil dari <a href="https://github.com/mathdroid/covid-19-api">mathdroid/covid-19-api</a>
                </div>
              </Fragment>
            }
          </Fragment>
        }
      </div>
    </div>
  );
}

export default App;
