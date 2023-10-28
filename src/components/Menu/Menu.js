import React from 'react';
import { Link } from 'react-router-dom';
import { ImHome } from "@react-icons/all-files/im/ImHome";
import { SiProducthunt } from "@react-icons/all-files/si/SiProducthunt";
import { AiFillPieChart } from "@react-icons/all-files/ai/AiFillPieChart";
import { DiGoogleAnalytics } from "@react-icons/all-files/di/DiGoogleAnalytics";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";

const Menu = () => {

    const menuItems = [
        { name: 'Explorer', path: '/explorer', icon: <ImHome /> },
        { name: 'Profile', path: '/profile', icon: <FaUserFriends /> },
        { name: 'Dapp', path: '/dapp', icon: <SiProducthunt /> },
        { name: 'Redeem', path: '/redeem', icon: <AiFillPieChart /> },
        { name: 'Staking', path: '/staking', icon: <DiGoogleAnalytics /> },
        { name: 'Docs', path: 'https://github.com/diamondnxt', isExternal: true, icon: <AiOutlineMail /> },
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
            {/*item.icon*/}
            {item.name}
          </Link>
        )
      )}
    </>
  );
};

export default Menu;
