import React,{useEffect} from 'react';
import './styles/style.css'
import {Route,Switch,BrowserRouter} from 'react-router-dom'

import Navbar from "./components/Navbar"
import AllCountries from './components/AllCountries'
import TrackedCountries from './components/TrackedCountries'
import GlobalSummary from './components/GlobalSummary';

function App() {
  useEffect(() => {
    if(!localStorage.trackedCountries){
      return localStorage.setItem("trackedCountries",[])
    }
  }, [])
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={AllCountries} />
        <Route path="/tracked" component={TrackedCountries} />
        <Route path="/global" component={GlobalSummary} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
