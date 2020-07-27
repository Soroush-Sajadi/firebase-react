import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../images/Logo/Logo-white.png'
import menu from '../../images/Logo/menu.png'
import flagBritish from '../../images/Flag/uk.svg'
import flagSwedish from '../../images/Flag/sweden.svg'
import '../Style/Header.css';

function Header({ uppDateLanguage, upDateMenuState, menuStateHeader }) {
  const [ language, setLanguage ] = useState('English');
  // const [ menuOpen, setMenuOpen ] = useState(false);

  const getLanguage = (e) => {
    setLanguage(e.target.getAttribute('value'));
    uppDateLanguage(e.target.getAttribute('value'));
  }

  const menuState = () => {
    upDateMenuState(!menuStateHeader);
    // setMenuOpen(!menuOpen)
  }
  // console.log(menuOpen)
  return (
    
      <div className="header-wrapper">
        <div className="header-logo">
          <img src={logo} alt="logo" />
        </div>
        <nav className="header">
          <ul>
            <NavLink to="/" style={{ textDecoration: 'none'}}>
              <li>
                <p>{language === 'Svenska' ? 'Hem': 'Home'}</p>
              </li>
            </NavLink>
            <NavLink to="/my work" style={{ textDecoration: 'none' }}>
              <li>
              <p>{language === 'Svenska' ? 'Galleri': 'My Work'}</p>
              </li>
            </NavLink>
            <NavLink to="/about me" style={{ textDecoration: 'none' }}>
              <li >
                <p>{language === 'Svenska' ? 'Om Mig': 'About Me'}</p>
              </li>
              </NavLink>
            <NavLink to="/contacts" style={{ textDecoration: 'none' }}>
              <li>
                <p>{language === 'Svenska' ? 'Kontakter': 'Contacts'}</p>
              </li>
            </NavLink>
          </ul>
          </nav>
          <div className="header-flag">
            <img src={language === 'Svenska' ? flagSwedish: flagBritish} alt="Language" />
            <div className="languages">
              <p value ="English" onClick={getLanguage}>English</p>
              <p value="Svenska" onClick={getLanguage}>Svenska</p>
            </div>
          </div>
          <div>
            <img className="menu" src={menu} alt="menu" onClick={menuState}/>
          </div>
        </div>
  );
}

export default Header;