import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import globe from '../../Images/globe.png';
import magnifier from '../../Images/magnifier.png';
import resume from '../../Images/resume.png';

const NavBar = (props) => {
  const [currNav, setCurrNav] = useState({
    summary: '',
    chart: '',
    about: ''
  });

  const { pathname } = props.history.location;

  useEffect(() => {
    handleActiveNav(pathname);
  }, [pathname])

  const handleNav = (destination) => {
    props.history.push(destination);
  }

  const handleActiveNav = (current) => {
    switch (current) {
      case '/':
        setCurrNav({
          summary: 'active'
        })
        break;

      case '/chart':
        setCurrNav({
          chart: 'active'
        })
        break;

      case '/about':
        setCurrNav({
          about: 'active'
        })
        break;

      default:
        break;
    }
  }

  const { summary, chart, about } = currNav;

  return (

    <nav className="navbar">
      <button className={summary} onClick={() => {handleNav('/')}}>
        <img src={globe} alt="globe icon"/>
        <p>Ringkasan</p>
      </button>

      <button className={chart} onClick={() => {handleNav('/chart')}}>
        <img src={magnifier} alt="magnifier icon"/>
        <p>Urutan</p>
      </button>
      
      <button className={about} onClick={() => {handleNav('/about')}}>
        <img src={resume} alt="resume icon"/>
        <p>Tentang</p>
      </button>
    </nav>
  )
}

export default withRouter(NavBar);
