import React from 'react';
import background from '../../images/Background-Pictures/camera2.jpg';
import OpenMenu from './OpenMenu';
import '../Style/Home.css';

function Home({menuState,language, upDateMenuState, uppDateLanguage}) {
  console.log(window.innerWidth, window.innerHeight)
  return (
    <>
    {!menuState ?
    <div className="home-wrapper">
      <img src={background} />
        <h3 className="home-text">
          we catch the moments
        </h3>
    </div>
    :
      <OpenMenu language={language} upDateMenuState={upDateMenuState} menuState={menuState} uppDateLanguage={uppDateLanguage}/>
    }
    </>
     
  );
}

export default Home;