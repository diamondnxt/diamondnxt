// Header.js
import React from 'react';
import './../../style/header.css';
import UserInfo from '../UserInfo/UserInfo';
import Menu from '../Menu/Menu'; // Import the Menu component

const Header = (props) => {
  return (
    <header>
      <Menu /> {/* Use the Menu component here */}
      <UserInfo {...props} />
    </header>
  );
};

export default Header;
