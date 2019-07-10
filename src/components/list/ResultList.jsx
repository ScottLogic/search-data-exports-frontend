import React from 'react';
import PropTypes from 'prop-types';
import './ResultList.css';

const ResultList = ({ data }) => (
  <ul className="result-list">
    {data.map((value, index) => <li key={index}>{value}</li>)}
  </ul>
);

ResultList.propTypes = {
  data: PropTypes.arrayOf(String).isRequired
};

export default ResultList;
