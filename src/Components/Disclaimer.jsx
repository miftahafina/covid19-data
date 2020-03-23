import React from 'react';

const Disclaimer = (props) => {

  const lastUpdateIndo = (date) => {
    const d = new Date(date);
    const monthIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    
    return `${d.getDate()} ${monthIndo[d.getMonth()]} ${d.getFullYear()} pukul ${d.getHours()}.${d.getMinutes()} WIB`;
  }

  return (
    <div className="footer">
      Data per-{lastUpdateIndo(props.lastUpdate)} <br></br>
      diambil dari <a href="https://github.com/mathdroid/covid-19-api">mathdroid/covid-19-api</a>
    </div>
  )
}

export default Disclaimer;
