import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/Footer';
import Weather from './components/Weather';

function App() {

  return (
    <div className="App">
      <Weather/>
      <Footer />   
    </div>
  );
}

export default App;
