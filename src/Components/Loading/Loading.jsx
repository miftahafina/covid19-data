import React from 'react';
import virusImage from '../../Images/virus.png';

const Loading = () => {
  return (
    <div className="loading">
      <img src={virusImage} alt="Loading..." className="rotating"/>
      <p>Memuat...</p>
    </div>
  )
}

export default Loading;
