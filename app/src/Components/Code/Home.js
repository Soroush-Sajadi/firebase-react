import React from 'react';
import background from '../../images/Background-Pictures/Background3.jpg'
import OpenMenu from './OpenMenu'
import '../Style/Home.css';

function Home({menuState,language, upDateMenuState, uppDateLanguage}) {
  return (
    <>
    {!menuState ?  
    <div className="home-wrapper">
      <img src={background} alt="background" />
      <h3 className="home-text">mproved own provided blessing may 
      peculiar domestic. Sight house has sex never. No visited 
      raising gravity outward subject my cottage mr be. Hold do at 
      tore in park feet near my case. Invitation at understood 
      occasional sentiments insipidity inhabiting in. Off melancholy 
      alteration principles old. Is do speedily kindness properly oh. 
      Respect article painted cottage he is offices parlors. </h3>
    </div>
    :
      <OpenMenu language={language} upDateMenuState={upDateMenuState} menuState={menuState} uppDateLanguage={uppDateLanguage}/>
    }
    </>
     
  );
}

export default Home;