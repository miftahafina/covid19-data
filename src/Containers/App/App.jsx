import React, { Fragment, useState, useEffect } from 'react';
import 'normalize.css';
import axios from 'axios';

const App = () => {
  const [covidCount, setCovidCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const url = 'https://covid19.mathdro.id/api/countries/id';

  useEffect(() => {
    axios.get(url)
      .then(res => {
        console.log('axios id:', res.data);
        setCovidCount(res.data);
        setLoading(false);
      });
  }, []);

  const lastUpdateIndo = (date) => {
    const d = new Date(date);
    const monthIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    return `${d.getDate()} ${monthIndo[d.getMonth()]} ${d.getFullYear()} pukul ${d.getHours()}.${d.getMinutes()} WIB`;
  }

  const prosentase = (value, total) => {
    return (value / total * 100).toFixed(2);
  }

  const { confirmed, recovered, deaths, lastUpdate } = covidCount;

  return (
    <div className="container">
      <div className="header">
        <div className="title">COVID-19 di Indonesia</div>
      </div>
      
      <div className="content">
        {
          loading ? <p>Memuat...</p> :
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
                  {prosentase(recovered.value, confirmed.value)}%
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
                  {prosentase(deaths.value, confirmed.value)}%
                </div>
              </div>
            </div>

            <div className="footer">
              Data per-{lastUpdateIndo(lastUpdate)} <br></br>
              diambil dari <a href="https://github.com/mathdroid/covid-19-api">mathdroid/covid-19-api</a>
            </div>
          </Fragment>
        }
      </div>
    </div>
  );
}

export default App;
