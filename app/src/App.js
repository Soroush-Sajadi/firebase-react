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

  const uppDateLanguage = (childData) => {
    setLanguage(childData);
  }

  const uppDateTitle = (childData) => {
    setTitle(childData);
  }
  
  return (
    <div className="App">
      <BrowserRouter>
          <Header uppDateLanguage={uppDateLanguage}/>
              <Switch>
                <Route exact path="/" render={() => <Home />}/>
                <Route exact path="/my work" render={() => <MyWork language={language} uppDateTitle={uppDateTitle}/>}/>
                <Route path="/about me" render={() => <AboutMe />}/>
                <Route path="/contacts" render={() => <Contacts />} />
                <Route path={"/my work/" + title.toLowerCase() } render={() => <Gallery title={title} />} />
              </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
