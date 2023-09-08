import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="Menu">
      <div className="hamburger" onClick={toggleMenu} />
      {showDropdown && (
        <div className="dropdown-content">
          <Link className="menuItem" to="/explorer">Explorer</Link>
          <Link className="menuItem" to="/profile">Profile</Link>
          <Link className="menuItem" to="/dapp">Dapp</Link>
          <Link className="menuItem" to="/redeem">Redeem</Link>
          <Link className="menuItem" to="/staking">Staking</Link>
          <a className="menuItem" href="https://diamondnxt.com/" target="_blank" rel="noopener noreferrer">Docs</a>
        </div>
      )}
    </div>
  );
};
