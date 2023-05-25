import React from "react";
import Footer from "../Footer/Footer";
import Deposit from "./../Deposit/index"
//
const Dapp = (props) => {
  return (
    <>
      <Deposit {...props} />
      <Footer />
    </>
  );
};
//
export default Dapp;
