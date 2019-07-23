const useReportsModal = submitCallback => {    
  
    const handleSubmit = event => {
      if (event) event.preventDefault();
      submitCallback();
    };

    const viewReport = reportName => {
      submitCallback("View",reportName);
    };

    const requestDownload = reportName => {
      submitCallback("Download",reportName);
    };
  
    return {
      handleSubmit,
      viewReport,
      requestDownload
    };
  };
  
  export default useReportsModal;
