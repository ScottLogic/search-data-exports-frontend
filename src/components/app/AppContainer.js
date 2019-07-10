import React, { useState } from 'react';
import { useInputForm } from '../../utilities/hooks';
import mockAPICall from '../../utilities/mockAPICall';
import App from './App';

const AppContainer = () => {
  const searchCriteria = useInputForm('');
  const [data, setData] = useState([]);
  const [maxPages, setMaxPages] = useState(1);
  const [lastRequest, setLastRequest] = useState({});

  const handlePageChange = ({ selected }) => {
    const request = {
      ...lastRequest,
      page: selected
    };

    fetchAndSetData(request);
  };

  const handleSearch = e => {
    e.preventDefault();
    
    const request = {
      type: e.target.indexSearch.value,
      results: 10,
      page: 0,
      search: [
        { field: 'all', value: e.target.searchInput.value }
      ]
    };
    
    setLastRequest(request);
    fetchAndSetData(request);
  };

  //Make API call with request data
  const fetchAndSetData = request => {
    const response = mockAPICall(request);
    setMaxPages(response.hits.total.value / request.results);
    setData(response.hits.hits);
  };

  const appProps = {
    data,
    maxPages,
    searchCriteria,
    handleSearch,
    handlePageChange
  };

  return (
    <App {...appProps} />
  );
};

export default AppContainer;
