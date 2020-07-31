import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Spinner } from 'react-spinners-css';
import OpenMenu from './OpenMenu'
import '../Style/MyWork.css';

function MyWork({ language, uppDateTitle, menuState, upDateMenuState, uppDateLanguage }) {
  const [ data, setData ] = useState([]);
  
  const getData = async () => {
      await fetch (`http://localhost:3000/`)
        .then(res => res.json())
        .then(res => setData(res))
  }

  useEffect(()=> {
    getData()
  },[]);

  const getTitle = (e) => {
    uppDateTitle(e.target.getAttribute('value'))
  }
  
  console.log(data)
  return (
    <>
        {!menuState ?
      <div className="my-work-wrapper">
      {data.length === 0 ? <div className="loading"><Spinner color="white" size={200} /></div> 
      :
      data.map((item,) => 
        <div className="my-work">
          <div className="my-work-title">
            <h1>{item.title}</h1>
            <h4>{language === 'English' ? item.English: item.Svenska}</h4>
          </div>
            <div className="my-work-img">
              <h3>{item.title}</h3>
              <NavLink to={"/my work/" + item.title.toLowerCase()}>
                <img value={item.title} onClick={getTitle} src={item.image} />
              </NavLink>
            </div>
       
        </div>
        
      )
      }
    </div>
    :
      <OpenMenu  menuState={menuState} upDateMenuState={upDateMenuState} language={language} uppDateLanguage={uppDateLanguage}/>
    }
    </>
    
  );
}

export default MyWork;