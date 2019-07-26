import React from 'react';
import PropTypes from 'prop-types';
import './ResultList.css';

const postFormat = ({
  UserID,
  DateCreated,
  Content,
  Tags
}) => (
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

const userFormat = ({
  UserID,
  LastName,
  FirstName,
  EmailAddress
}) => (
  <div className="container-result-row">
    <div className="container-result-row-contents container-result-row-user-date">
      <div>{UserID}</div>
    </div>
    <hr />
    <div className="container-result-row-contents container-result-row-content">
      {FirstName}
      {LastName}
    </div>
    <div className="container-result-row-contents container-result-row-tags">
      {EmailAddress}
    </div>
  </div>
);

const showResults = (result) => {
  switch (result.Type) {
    case 'posts':
      return postFormat(result);
    case 'users':
      return userFormat(result);
    default:
      return null;
  }
};

const ResultList = ({ data }) => (
  <ul className="result-list">
    {data.map(value => (
      <li key={value.uuid}>{showResults(value)}</li>
    ))}
  </ul>
);

ResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

userFormat.propTypes = {
  UserID: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired,
  FirstName: PropTypes.string.isRequired,
  EmailAddress: PropTypes.string.isRequired
};

postFormat.propTypes = {
  UserID: PropTypes.string.isRequired,
  DateCreated: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
  Tags: PropTypes.array.isRequired
};

export default ResultList;
