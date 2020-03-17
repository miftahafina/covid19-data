import React from 'react';

const CounterBoxLg = (props) => {
  return (
    <div className="counter-lg-box">
      <div className="counter-lg-value">
        {props.confirmed.value}
      </div>
      <div className="counter-lg-label text-warning">
        Terkonfirmasi
      </div>
    </div>
  )
}

export default CounterBoxLg;
