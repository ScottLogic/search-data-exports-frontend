import React from 'react';
import './App.css';
import Header from '../header/Header';
import ReactPaginate from 'react-paginate';
import { useInputForm } from '../../utilities/hooks';
import ResultList from '../list/ResultList';

const App = () => {
  const searchCriteria = useInputForm('');

  const handlePageChange = ({ selected }) => {
    console.log(selected);
  };

  const handleSearch = e => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <Header email="oforeman@scottlogic.com" />
      <div style={{ flexDirection: 'column' }} className="paper-display-page">
        <div style={{ margin: 'auto', padding: '1vmin' }}>
          <form onSubmit={handleSearch}>
            <div>
              <input type="radio" id="userPostSearch" name="indexSearch" value="both" defaultChecked />
              <label htmlFor="userPostSearch">Both</label>
              <input type="radio" id="userSearch" name="indexSearch" value="user" />
              <label htmlFor="userSearch">User</label>
              <input type="radio" id="postSearch" name="indexSearch" value="post" />
              <label htmlFor="postSearch">Post</label>
            </div>
            <input name="searchInput" placeholder="Input search criteria" type="text" {...searchCriteria} required />
            <input type="submit" value="Search" />
          </form>
        </div>
        <div style={{ margin: 'auto', flexGrow: 2 }}>
          <ResultList data={['Result 1', 'Result 2']} />    
        </div>

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
