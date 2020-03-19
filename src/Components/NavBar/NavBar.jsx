import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import globe from '../../Images/globe.png';
import magnifier from '../../Images/magnifier.png';
import hand from '../../Images/hand.png';
import resume from '../../Images/resume.png';

const NavBar = () => {
  const [currNav, setCurrNav] = useState({
    summary: '',
    chart: '',
    doa: '',
    about: ''
  });

  let history = useHistory();

  const { pathname } = history.location;

  useEffect(() => {
    handleActiveNav(pathname);
  }, [pathname])

  const handleNav = (destination) => {
    history.push(destination);
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

      case '/doa':
        setCurrNav({
          doa: 'active'
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

  const { summary, chart, doa, about } = currNav;

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

      <button className={doa} onClick={() => {handleNav('/doa')}}>
        <img src={hand} alt="hand icon"/>
        <p>Doa</p>
      </button>
      
      <button className={about} onClick={() => {handleNav('/about')}}>
        <img src={resume} alt="resume icon"/>
        <p>Tentang</p>
      </button>
    </nav>
  )
}

export default NavBar;
