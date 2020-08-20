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
                <h3> Makan is an Iranian photographer with more than 10 years of experience. His career started out from 
                    pure passion and love. He believes that To be a photographer needs both good understanding of art and perspective. 
                    Makan has had photo shoots in many different countries such as Iran, Georgia, Turkey, Dubai etc.
                </h3>
                :
                <h3>
                  Makan är en iransk fotograf med mer än 10 års erfarenhet. Hans karriär tog avstamp från ren
                  kärlek och passion. Han tror att en bra fotograf behöver både god förståelse för konst och perspektiv.
                  Makan har haft fotograferingar i många olika länder, såsom Iran, Georgien, Turkiet, Dubai m.m.

                  </h3>
              } 
            </div>
            
          </div>
        </div>}
    </div>
  );
}

export default AboutMe;