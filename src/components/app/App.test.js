import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const appProps = {
    data: [],
    currentPage: 0,
    maxPages: 1,
    searchCriteria: {},
    handleSearch: jest.fn(),
    handlePageChange: jest.fn()
  };

  ReactDOM.render(<App {...appProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
