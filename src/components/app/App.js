import React from 'react';
import './App.css';
import Header from '../header/Header';

const App = () => (
  <div className="app">
    <Header email="oforeman@scottlogic.com" />
    <div className="paper-display-page">
      <div>Search functionality goes here</div>
      <div>Search results</div>
      <div>Pagination controls</div>
    </div>
  </div>
);

export default App;
