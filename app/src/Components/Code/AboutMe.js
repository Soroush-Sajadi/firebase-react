import React from 'react';
import { NavLink } from 'react-router-dom'
import OpenMenu from './OpenMenu'
import MakanOne from '../../images/Background-Pictures/Makan1.jpg'
import '../Style/AboutMe.css';

function AboutMe({ menuState, language,upDateMenuState, uppDateLanguage }) {
  return (
     <div className="about-me-wrapper">
       {menuState ? 
       <OpenMenu language={language} upDateMenuState={upDateMenuState} menuState={menuState} uppDateLanguage={uppDateLanguage} />
       : 
       <div className="About-me-wrapper">
          <div className="profile">
            <div className="about-me-image">
              <img src={MakanOne} alt="Makan" />
            </div>
            <div className="about-me-biografi">
              {language === 'English' ? 
                <h3> Makan is an Irainian photografer with more than 10 years exprience. He started his career 
                  with passion and love. To be a photografer needs both good undrestanding of art and perspective 
                  Makan has taken pictures in many different countries
                </h3>
                :
                <h3> Makan är en Iranskt fotografer med mer än 10 år erfarenhet.</h3>
              } 
            </div>
          </div>
        </div>}
    </div>
  );
}

export default AboutMe;