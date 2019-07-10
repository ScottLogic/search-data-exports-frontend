import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ email }) => (
  <header className="container-header">
    <ul className="header-list" role="navigation">
      <li className="title-header">Helixer Search</li>
      <li className="email-header">{email}</li>
    </ul>
  </header>
);

Header.propTypes = {
  email: PropTypes.string.isRequired
};

export default Header;
