import React, { useState } from 'react';
import { useInputForm } from '../../utilities/hooks';
import { createRequest, updateRequestPage } from '../../utilities/requestCreator';
import { handleEmailRequest } from '../../utilities/downloadRequest';
import APICall from '../../utilities/APICall';
import { toast } from 'react-toastify';
import App from './App';

const AppContainer = () => {
  const searchCriteria = useInputForm('');
  const [data, setData] = useState([]);
  const [totalHitsCount, setTotalHitsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(1);
  const [lastRequest, setLastRequest] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handlePageChange = ({ selected }) => {
    const request = updateRequestPage(lastRequest, selected);

    setCurrentPage(selected);
    fetchAndSetData(request);
  };

  const handleSearch = e => {
    e.preventDefault();
    setCurrentPage(0);

    const request = createRequest("post", 10, 0, e.target.searchInput.value);
    setLastRequest(request);
    fetchAndSetData(request);
  };

  //Make API call with request data
  const fetchAndSetData = request => {
    APICall(request).then( (result) => { 
      setMaxPages(Math.ceil(result.TotalResults / request.results));
      setData(result.Results);
      setTotalHitsCount(result.TotalResults);
      }
    ).catch( error => { 
      console.error(`Error in Search API-`,error);
      setMaxPages(0);
      setData([]);
      setTotalHitsCount(0);
      });
  };

  const handleExportClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = modalData => {
    handleModalClose();
    switch (modalData.selectedType) {
      case "directDownload": break;
      case "email":
        handleEmailRequest(lastRequest, modalData.emailAddress)
        .then(() =>
            toast.success("Success! You will shortly receive an email."))
        .catch(error => {
            toast.error("Something went wrong, please try again.");
            console.error(error);
          });
        break;
      case "pushNotification":
        break;
      default:
        break;
    }
  };

  const handleReportsModalClick = () => {
    setShowReportModal(true);    
  };

  const handleReportsModalClose = () => {
    setShowReportModal(false);
  };

  const handleRequestSubmit = (mode,report) => {    
    console.log(mode,report);    
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
    totalHitsCount,
    handleModalClose,
    handleModalSubmit,
    showReportModal,
    handleReportsModalClick,
    handleReportsModalClose,
    handleRequestSubmit
  };

  return <App {...appProps} />;
};

export default AppContainer;
