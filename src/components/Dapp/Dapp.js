import React from "react";
import Mint from "../Mint/Mint";
import Burn from "../Burn/Burn";
import Whitelist from "../Whitelist/Whitelist";
import AdminRedeem from "../Redeem/AdminRedeem";
import './../../style/app.css';

const Dapp = (props) => {
  return (
    <div className="dapp-container">
      <div className="top-components">
        <Burn {...props} />
        <Whitelist {...props} />
        <AdminRedeem {...props} />
      </div>
      <Mint {...props} />
    </div>
  );
};

export default Dapp;
