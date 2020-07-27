import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from'react-router-dom';
import Header from './Components/Code/Header';
import Home from './Components/Code/Home';
import MyWork from './Components/Code/MyWork';
import AboutMe from './Components/Code/AboutMe';
import Contacts from './Components/Code/Contacts';
import Gallery from './Components/Code/Gallery';
import './App.css';

function App() {
  const [ language, setLanguage ] = useState('English');
  const [ title, setTitle ] = useState('');
  const [ menuState, setMenuState ] = useState(false)

  const uppDateLanguage = (childData) => {
    setLanguage(childData);
  }

  const uppDateTitle = (childData) => {
    setTitle(childData);
  }

  const upDateMenuState = (childData) => {
    setMenuState(childData)
  }
  return (
    <div className="App">
      <BrowserRouter>
          <Header uppDateLanguage={uppDateLanguage} menuStateHeader={menuState} upDateMenuState={upDateMenuState}/>
              <Switch>
                <Route exact path="/" render={() => <Home menuState={menuState} language={language} upDateMenuState={upDateMenuState} />}/>
                <Route exact path="/my work" render={() => <MyWork language={language} language={language} uppDateTitle={uppDateTitle} upDateMenuState={upDateMenuState} menuState={menuState} />}/>
                <Route path="/about me" render={() => <AboutMe menuState={menuState} language={language} upDateMenuState={upDateMenuState}/>}/>
                <Route path="/contacts" render={() => <Contacts language={language} upDateMenuState={upDateMenuState} menuState={menuState} />} />
                <Route path={"/my work/" + title.toLowerCase() } render={() => <Gallery title={title} language={language} upDateMenuState={upDateMenuState} menuState={menuState} />} />
              </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
