import React from 'react';

const Header = (props) => {
  return (
    <div className="header" onClick={() => props.handleOnChange('ID')}>
      <div className="title">COVID-19 di Berbagai Negara</div>
    </div>
  )
}

export default Header;
