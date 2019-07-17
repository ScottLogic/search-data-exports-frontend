import React, { useState } from 'react';
import { useInputForm } from '../../utilities/hooks';
import { createRequest, updateRequestPage } from '../../utilities/requestCreator';
import mockAPICall from '../../utilities/mockAPICall';
import App from './App';

const AppContainer = () => {
  const searchCriteria = useInputForm('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(1);
  const [lastRequest, setLastRequest] = useState({});
  const [showModal, setShowModal] = useState(false);

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
    const response = mockAPICall(request);
    setMaxPages(Math.ceil(response.hits.total.value / request.results));
    setData(response.hits.hits);
  };

  const handleExportClick = () => {
    setShowModal(true);    
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = (modalData) => {
    handleModalClose();
    switch (modalData.selectedType) {
      case "directDownload": break;
      case "email": break;
      case "pushNotification": break;
      default: break;
    }
  };

  const appProps = {
    data,
    currentPage,
    maxPages,
    searchCriteria,
    handleSearch,
    handlePageChange,
    handleExportClick,
    showModal,
    handleModalClose,
    handleModalSubmit
  };

  return (
    <App {...appProps} />
  );
};

export default AppContainer;
