import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import useReportsModal from "./ReportsModalContainer";
import "./ReportsModal.css";

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement("#root");

const ReportsModal = ({
  showModal,
  closeCallback,
  submitCallback
}) => {
  const { handleSubmit,
    viewReport,
    requestDownload } = useReportsModal(submitCallback);

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
          top: "0", bottom: "0", left: "0", right: "0",
          height: "90vh",
          width: "90vw",
          position: "relative"
        }
      }}
    >      
      <form className="reports-form" onSubmit={handleSubmit}>
        <h1>Available Reports</h1>
        <hr/>
        <ul className="reports-list">          
          {reportItem( {
            name: "Post Frequency Report",
            description: "Graph report of posts per hour for the last 24 hours.",
            onView: () => viewReport(`PostFreq`)
          })}
          {reportItem( {
            name: "Trending Report",
            description: "Report of the currently trending #tags.",
            onDownload: () => requestDownload(`Trending`)
          })}
        </ul> 
        <hr/>       
        <input type="button" onClick={closeCallback} value="Close"/>
      </form>
    </ReactModal>
  );
};

const reportItem = ( { name, description, image = "default.png", onView, onDownload}) => (
  <li>
    <div className="reports-list-item">
      <div className="reports-list-item-image">
        <img src={`/images/icons/${image}`} alt={name}></img>
      </div>                
      <div className="reports-list-item-details">
        <p>{name}</p>
        <p>{description}</p>
      </div>
      <div className="reports-list-item-options">
        {onView && <input type="button" value="View" onClick={onView} />}
        {onDownload && <input type="button" value="Download" onClick={onDownload} />}
      </div>
    </div>
  </li>
);

ReportsModal.propTypes = {
  showModal: PropTypes.bool.isRequired, 
  closeCallback: PropTypes.func.isRequired, 
  submitCallback: PropTypes.func.isRequired
};

export default ReportsModal;
