import React from 'react';
import virusWhite from '../../Images/virus-white.png';

const Header = (props) => {
  return (
    <div className="header">
      <div className="title">
        C<img src={virusWhite} alt="logo" className="logo" />VID-19 Data
      </div>
    </div>
  )
}

export default Header;
