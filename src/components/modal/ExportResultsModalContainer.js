import { useState } from "react";

const useExportResultsModal = submitCallback => {
  const [emailInput, setEmailInput] = useState("");
  const [selectedType, setSelectedType] = useState("directDownload");

  const handleRadioInputChange = event => {
    event.persist();
    setSelectedType(event.target.id);
  };

  const handleEmailInputChange = event => {
    event.persist();
    setEmailInput(event.target.value);
  };

  const handleSubmit = event => {
    if (event) event.preventDefault();
    submitCallback({ selectedType: selectedType, emailInput: emailInput });
  };

  return {
    handleSubmit,
    handleRadioInputChange,
    handleEmailInputChange,
    selectedType,
    emailInput
  };
};

export default useExportResultsModal;
