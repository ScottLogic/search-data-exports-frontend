//import { useState } from "react";

const useReportsModal = submitCallback => {    
  
    const handleSubmit = event => {
      if (event) event.preventDefault();
      submitCallback();
    };
  
    return {
      handleSubmit
    };
  };
  
  export default useReportsModal;