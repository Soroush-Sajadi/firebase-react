import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import * as firebase from 'firebase';
import '../Style/MyWork.css';

function MyWork({ language, uppDateTitle }) {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState('Loading');
  
  const getData = () => {
    const rootRef = firebase.database().ref().child('cathgory');
    rootRef.on('value', snap => {
        console.log('jasbd',snap.val())
        setData(snap.val())
    })
  }
  // const saveDataToLocalStorage = (name, data) => {
  //   window.localStorage.setItem(name, JSON.stringify(data));
  // }

  // const getDataFromLocalStorage = (name) => {
  //   setData(JSON.parse(window.localStorage.getItem(name)));
  // }
  useEffect(()=> {
    getData()
    
  },[]);

  // const getTitle = (e) => {
  //   uppDateTitle(e.target.getAttribute('value'))
  // }

  return (
    <div className="my-work-wrapper">
      {/* {data.length === 0 ? loading 
      :
      data.map((item,) => 
        <div className="my-work">
          <div className="my-work-title">
            <h1>{item.title}</h1>
            <h4>{language === 'English' ? item.English: item.Svenska}</h4>
          </div>
            <div className="my-work-img">
            <NavLink to={"/my work/" + item.title.toLowerCase()}>
              <img value={item.title} onClick={getTitle} src={item.picture} />
            </NavLink>
            </div>
       
        </div>
        
      )
      } */}
      {data.length === 0 ? loading: data.map(item => <h1>{item.title}</h1>)}
      <h1></h1>
    </div>
  );
}

export default MyWork;