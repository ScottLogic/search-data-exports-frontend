import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Header.css';

const Header = () => {
  const signOut = () => Auth.signOut();

  const [userEmail, setEmail] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    async function getUserDetails() {
      const userInfo = await Auth.currentUserInfo();
      setEmail(userInfo.attributes.email);
    }
    getUserDetails();
  }, []);

  function handleMenuOpen(event) {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <header className="container-header">
      <ul className="header-list" role="navigation">
        <li className="title-header">Helixer Search</li>
        <li className="email-header">
          {userEmail}
          <Button fontSize="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuOpen}>
            <MoreVertIcon fontSize="inherit" />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => console.log('Clicked 1')}>Profile</MenuItem>
            <MenuItem onClick={() => console.log('Clicked 2')}>Digests</MenuItem>
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </Menu>
        </li>
      </ul>
    </header>
  );
};

export default Header;
