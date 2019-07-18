import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import useExportResultsModal from "./ExportResultsModalContainer";

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement("#root");

const ExportResultsModal = ({
  showModal,
  showDirectDownloadOption,
  closeCallback,
  submitCallback
}) => {
  const {
    handleSubmit,
    handleRadioInputChange,
    handleEmailInputChange,
    selectedType,
    emailInput
  } = useExportResultsModal(submitCallback);

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={closeCallback}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        content: {
          height: "200px",
          width: "200px",
          position: "relative"
        }
      }}
    >
      <p>Select the download type:</p>
      <form className="export-results-form" onSubmit={handleSubmit}>
        <input
          type="radio"
          name="exportType"
          id="pushNotification"
          checked={selectedType === "pushNotification"}
          onChange={handleRadioInputChange}
        />
        <label htmlFor="pushNotification">Push Notification</label>
        <br />
        <div className="direct-download" style={showDirectDownloadOption ? {} : { display: "none" }}>
          <input
            type="radio"
            name="exportType"
            id="directDownload"
            checked={selectedType === "directDownload"}
            onChange={handleRadioInputChange}
          />
          <label htmlFor="directDownload">Direct Download</label>
          <br />
        </div>
        <input
          type="radio"
          name="exportType"
          id="email"
          checked={selectedType === "email"}
          onChange={handleRadioInputChange}
        />
        <label htmlFor="email">Email</label>
        <br />
        <div className="email" style={selectedType === "email" ? {} : { display: "none" }}>
          <label htmlFor="emailInput">Enter your email:</label>
          <input
            type={selectedType === "email" ? "email" : "hidden"}
            id="emailInput"
            onChange={handleEmailInputChange}
            value={emailInput}
            required
          />
          <br />
        </div>
        <button type="button" onClick={closeCallback}>Cancel</button>
        <button type="submit">Download</button>
      </form>
    </ReactModal>
  );
};

ExportResultsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  showDirectDownloadOption: PropTypes.bool.isRequired,
  submitCallback: PropTypes.func.isRequired
};

export default ExportResultsModal;
