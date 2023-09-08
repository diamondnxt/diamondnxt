import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Menu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 768) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [windowWidth]);

  return (
    <div className="Menu" ref={dropdownRef}>
      {windowWidth <= 768 ? (
        <>
          <FaBars className="hamburger" onClick={toggleMenu} />
          {showDropdown && (
            <>
              <Link className="menuItem" to="/explorer">
                Explorer
              </Link>
              <Link className="menuItem" to="/profile">
                Profile
              </Link>
              <Link className="menuItem" to="/dapp">
                Mint
              </Link>
              <Link className="menuItem" to="/redeem">
                Redeem
              </Link>
              <Link className="menuItem" to="/staking">
                Staking
              </Link>
              <a
                className="menuItem"
                href="https://github.com/diamondnxt"
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
              </a>
            </>
          )}
        </>
      ) : (
        <>
          <Link className="menuItem" to="/explorer">
            Explorer
          </Link>
          <Link className="menuItem" to="/profile">
            Profile
          </Link>
          <Link className="menuItem" to="/dapp">
            Mint
          </Link>
          <Link className="menuItem" to="/redeem">
            Redeem
          </Link>
          <Link className="menuItem" to="/staking">
            Staking
          </Link>
          <a
            className="menuItem"
            href="https://github.com/diamondnxt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </>
      )}
    </div>
  );
};

export default Menu;
