import React from 'react';

const CounterBox = (props) => {
  
  const percentage = (value, total) => {
    return (value / total * 100).toFixed(2);
  }

  return (
    <div className="counter-container">
      <div className="counter-box">
        <div className="counter-value">
          {props.recovered.value}
        </div>
        <div className="counter-label text-success">
          Sembuh
        </div>
        <div className="counter-percentage">
          {percentage(props.recovered.value, props.confirmed.value)}%
        </div>
      </div>

      <div className="counter-box-separator"></div>

      <div className="counter-box">
        <div className="counter-value">
          {props.deaths.value}
        </div>
        <div className="counter-label text-danger">
          Meninggal
        </div>
        <div className="counter-percentage">
          {percentage(props.deaths.value, props.confirmed.value)}%
        </div>
      </div>
    </div>
  )
}

export default CounterBox;
