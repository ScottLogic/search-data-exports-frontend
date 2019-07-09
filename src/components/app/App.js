import React from 'react';
import './App.css';
import Header from '../header/Header';
import ReactPaginate from 'react-paginate';

const App = () => {
  const handlePageChange = ({ selected }) => {
    console.log(selected);
  };

  return (
    <div className="app">
      <Header email="oforeman@scottlogic.com" />
      <div style={{ display: 'flex', flexDirection: 'column' }} className="paper-display-page">
        <div style={{ margin: 'auto' }}>Search functionality goes here</div>
        <div style={{ margin: 'auto' }}>Search results</div>
        <ReactPaginate
          pageCount={50}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          containerClassName={'pagination'}
          activeClassName={'active'}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;
