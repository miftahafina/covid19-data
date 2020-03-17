import React from 'react';
import { withRouter } from 'react-router';

import globe from '../../Images/globe.png';
import magnifier from '../../Images/magnifier.png';
import resume from '../../Images/resume.png';

const NavBar = (props) => {

  const handleNav = (destination) => {
    props.history.push(destination);
  }

  return (
    <nav className="navbar">
      <button onClick={() => {handleNav('/')}}>
        <img src={globe} alt="globe icon"/>
        <p>Ringkasan</p>
      </button>

      <button onClick={() => {handleNav('/chart')}}>
        <img src={magnifier} alt="magnifier icon"/>
        <p>Urutan</p>
      </button>
      
      <button onClick={() => {handleNav('/about')}}>
        <img src={resume} alt="resume icon"/>
        <p>Tentang</p>
      </button>
    </nav>
  )
}

export default withRouter(NavBar);
