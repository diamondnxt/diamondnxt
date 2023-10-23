import React from "react";
import Logo from "./../../images/logo.svg";
import { Link } from 'react-router-dom';

// Constants for clarity and maintainability
const LOGO_WIDTH = "256px";

// Home component: the main landing page of the application
const Home = () => {
  return (
    <div style={{ paddingTop: '50px', textAlign: 'center' }}> {/* CSS for spacing instead of <br> tags */}
      <img src={Logo} width={LOGO_WIDTH} alt="Application Logo" /> {/* Descriptive alt text and constant for width */}
      <div style={{ margin: '20px 0' }}> {/* CSS for spacing */}
        <Link className="button" to="/dapp">Launch App</Link>
      </div>
      <div style={{ margin: '20px 0' }}> {/* CSS for spacing */}
        <a className="button" href="https://diamondnxt.com/" target="_blank" rel="noopener noreferrer">
          LinkTree
        </a>
      </div>
    </div>
  );
};

export default Home;
