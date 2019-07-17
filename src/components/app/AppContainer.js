import React, { useState } from 'react';
import { useInputForm } from '../../utilities/hooks';
import { createRequest, updateRequestPage } from '../../utilities/requestCreator';
import APICall from '../../utilities/APICall';
import App from './App';

const AppContainer = () => {
  const searchCriteria = useInputForm('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(1);
  const [lastRequest, setLastRequest] = useState({});

  const handlePageChange = ({ selected }) => {
    const request = updateRequestPage(lastRequest, selected);

    setCurrentPage(selected);
    fetchAndSetData(request);
  };

  const handleSearch = e => {
    e.preventDefault();
    setCurrentPage(0);

    const request = createRequest(e.target.indexSearch.value, 10, 0, e.target.searchInput.value);
    setLastRequest(request);
    fetchAndSetData(request);
  };

  //Make API call with request data
  const fetchAndSetData = request => { 
    APICall(request).then( (result) => { 
      setMaxPages(Math.ceil(result.TotalResults / request.results));
      setData(result.Results);
      }
    ).catch( error => { 
      console.error(`Error in Search API-`,error);
      setMaxPages(0);
      setData([]);
    })
  };

  const appProps = {
    data,
    currentPage,
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
