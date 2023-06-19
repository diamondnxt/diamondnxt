import React from "react";
import Footer from "../Footer/Footer";
import Mint from "../Mint/Mint";
//
const Dapp = (props) => {
  return (
    <>
      <Mint {...props} />
      <Footer />
    </>
  );
};
//
export default Dapp;
