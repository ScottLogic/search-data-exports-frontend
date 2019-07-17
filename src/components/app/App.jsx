import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from '../header/Header';
import ReactPaginate from 'react-paginate';
import ResultList from '../list/ResultList';

const App = ({ data, currentPage, maxPages, searchCriteria, handleSearch, handlePageChange }) => (
  <div className="app">
    <Header email="oforeman@scottlogic.com" />
    <div className="paper-display-page">
      <div className="container-index-select-form">
        <form onSubmit={handleSearch}>          
          <input name="searchInput" placeholder="Input search criteria" type="text" {...searchCriteria} required />
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className="container-result-list">
        <ResultList data={data} />
      </div>

      <ReactPaginate
        pageCount={maxPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        containerClassName={'pagination'}
        activeClassName={'active'}
        onPageChange={handlePageChange}
        forcePage={currentPage}
      />
    </div>
  </div>
);

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  searchCriteria: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

export default App;
