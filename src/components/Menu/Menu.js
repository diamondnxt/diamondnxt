import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const menuItems = [
    { name: 'Explorer', path: '/explorer' },
    { name: 'Profile', path: '/profile' },
    { name: 'Mint', path: '/dapp' },
    { name: 'Redeem', path: '/redeem' },
    { name: 'Staking', path: '/staking' },
    { name: 'Docs', path: 'https://github.com/diamondnxt', isExternal: true },
  ];

  return (
    <>
      {menuItems.map(item => 
        item.isExternal ? (
          <a key={item.name} className="menuItem" href={item.path} target="_blank" rel="noopener noreferrer">
            {item.name}
          </a>
        ) : (
          <Link key={item.name} className="menuItem" to={item.path}>
            {item.name}
          </Link>
        )
      )}
    </>
  );
};

export default Menu;
