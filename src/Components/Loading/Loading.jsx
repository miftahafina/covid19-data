import React from 'react';
import loadingImage from '../../Images/virus.png';

const Loading = () => {
  return (
    <div className="loading">
      <img src={loadingImage} alt="Loading..." className="rotating"/>
      <p>Memuat...</p>
    </div>
  )
}

export default Loading;
