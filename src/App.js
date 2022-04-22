import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes'
import './App.css';
import Header from './components/layout/Header';

function App() {
  return (
    <div>
      <Router>
      <Header />
        <Routes />
      </Router>      
    </div>

  );
}

export default App;
