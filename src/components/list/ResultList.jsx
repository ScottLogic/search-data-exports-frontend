import React from "react";
import PropTypes from "prop-types";
import "./ResultList.css";

const ResultList = ({ data, handleExportClick }) => {
  const exportButton = data.length ? (<button onClick={handleExportClick}>Export Results</button>) : ("");
  return (
    <ul className="result-list">
      {exportButton}
      {data.map((value, index) => (
        <li key={index}>{resultFormat(value)}</li>
      ))}
    </ul>
  );
};

const resultFormat = ({ UserID, DateCreated, Content, Tags }) => (
  <div className="container-result-row">
    <div className="container-result-row-contents container-result-row-user-date">
      <div>{UserID}</div>
      <div>{DateCreated}</div>
    </div>
    <hr />
    <div className="container-result-row-contents container-result-row-content">
      {Content}
    </div>
    <div className="container-result-row-contents container-result-row-tags">
      <i>{Tags.map(tag => `${tag} `)}</i>
    </div>
  </div>
);

ResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleExportClick: PropTypes.func.isRequired
};

export default ResultList;
