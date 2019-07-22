import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

const LoadingSpinner = ({ isDisplayed }) => (
  isDisplayed && <div className="loader" />
);

LoadingSpinner.propTypes = {
  isDisplayed: PropTypes.bool.isRequired
};

export default LoadingSpinner;
