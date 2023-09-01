import React from "react";
import Logo from "./../../images/logo.svg";
import { Link } from 'react-router-dom';

//
const Home = () => {
  return (
    <>
    <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <img src={Logo} width="256px" alt="" />
      <br></br>      <br></br>      <br></br>
      <Link className="menuItem" to="/dapp">Launch       <br></br>App</Link>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <a className="menuItem" href="https://diamondnxt.com/" target="_blank" rel="noopener noreferrer">
      LinkTree
      </a>
    </>
  );
};

//
export default Home;
