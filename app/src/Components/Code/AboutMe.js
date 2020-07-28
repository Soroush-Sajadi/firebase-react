import React from 'react';
import { NavLink } from 'react-router-dom'
import OpenMenu from './OpenMenu'
import '../Style/AboutMe.css';

function AboutMe({ menuState, language,upDateMenuState, uppDateLanguage }) {
  console.log(menuState)
  return (
     <div className="about-me-wrapper">
       {menuState ? 
       <OpenMenu language={language} upDateMenuState={upDateMenuState} menuState={menuState} uppDateLanguage={uppDateLanguage} />
       : 
       <div>About me</div>}
    </div>
  );
}

export default AboutMe;