import React from 'react';
import notFoundImage from '../../Images/cry.png';

const NotFound = (props) => {
  return (
    <div className="loading">
      <img src={notFoundImage} alt="Cry"/>
      <p>{props.text}</p>
    </div>
  )
}

export default NotFound;
