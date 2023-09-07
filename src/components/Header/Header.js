import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import "./../../style/header.css";
import UserInfo from '../UserInfo/UserInfo';

const Header = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowDropdown(!showDropdown);
  }

  const Menu = ({ toggleMenu }) => {
    return (
      <div className="Menu">
        {windowWidth <= 768 ? (
          <>
            <FaBars className="hamburger" onClick={toggleMenu} />
            {showDropdown && (
              <>
                <Link className="menuItem" to="/explorer">Explorer</Link>
                <Link className="menuItem" to="/profile">Profile</Link>
                <Link className="menuItem" to="/dapp">Dapp</Link>
                <Link className="menuItem" to="/redeem">Redeem</Link>
                <a className="menuItem" href="https://github.com/diamondnxt" target="_blank" rel="noopener noreferrer">Docs</a>
              </>
            )}
          </>
        ) : (
          <>
            <Link className="menuItem" to="/explorer">Explorer</Link>
            <Link className="menuItem" to="/profile">Profile</Link>
            <Link className="menuItem" to="/dapp">Dapp</Link>
            <Link className="menuItem" to="/redeem">Redeem</Link>
            <a className="menuItem" href="https://github.com/diamondnxt" target="_blank" rel="noopener noreferrer">Docs</a>
          </>
        )}
      </div>
    );
  };

  return (
    <header>
      <Menu toggleMenu={toggleMenu} />
      <UserInfo {...props} />
    </header>
  );
}

export default Header;
