import React from 'react';
import PropTypes from 'prop-types';
import './ResultList.css';

const ResultList = ({ data }) => (
  <ul className="result-list">
    {data.map((value, index) => <li key={index}>{resultFormat(value._source)}</li>)}
  </ul>
);

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
      <i>
        {Tags.map(tag => `${tag} `)}
      </i>
    </div>
  </div>
);

ResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ResultList;
