import React from 'react';
import { NavLink } from 'react-router-dom'
import flagBritish from '../../images/Flag/uk.svg';
import flagSwedish from '../../images/Flag/sweden.svg';
import '../Style/OpenMenu.css';

function OpenMenu({ language, upDateMenuState ,menuState, uppDateLanguage }) {
    const updateState = () => {
      upDateMenuState(false)
    }
    const updateLanguageState = () => {
      uppDateLanguage(language === 'English' ? 'Svenska': 'English' )
    }
  return (
     <div className="Open-menu-wrapper">
       <nav className="header-open-menu" onClick={updateState}>
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
       <div className="flag-mobile" onClick={updateLanguageState}>
        <img src={language === 'English' ? flagBritish : flagSwedish} alt="flag" />
       </div>
    </div>
  );
}

export default OpenMenu;