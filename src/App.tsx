import React from 'react';
import logo from './logo.svg';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Version 2
        </p>
       <CircularProgress color='inherit' />
      </header>
    </div>
  );
}

export default App;
