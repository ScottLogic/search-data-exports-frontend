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
  const { handleSubmit } = useReportsModal(submitCallback);

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
            Name: "Post Frequency Report",
            Description: "Graph report of posts per hour for the last 24 hours.",
            onView: () => console.log(`Dummy View Event`),
            onDownload: () => console.log(`Dummy Download Event`)
          })}
          {reportItem( {
            Name: "Trending Report",
            Description: "Report of the currently trending #tags.",
            onView: () => console.log(`Dummy View Event 2`),
            onDownload: () => console.log(`Dummy Download Event 2`)
          })}
        </ul>        
        <button type="button" onClick={closeCallback}>Cancel</button>        
      </form>
    </ReactModal>
  );
};

const reportItem = ( { Name, Description, Image = "default.png", onView, onDownload}) => (
  <li>
    <div className="reports-list-item">
      <div className="reports-list-item-image">
        <img src={`/images/icons/${Image}`} alt={Name}></img>
      </div>                
      <div className="reports-list-item-details">
        <p>{Name}</p>
        <p>{Description}</p>
      </div>
      <div className="reports-list-item-options">
        <input type="button" value="View" onClick={onView} />
        <input type="button" value="Download" onClick={onDownload} />
      </div>
    </div>
  </li>
);

ReportsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,  
  submitCallback: PropTypes.func.isRequired
};

export default ReportsModal;
