import React from "react";
import Mint from "../Mint/Mint";
import Burn from "../Burn/Burn";
import Whitelist from "../Whitelist/Whitelist";
import AdminRedeem from "../Redeem/AdminRedeem";
import { SwitchToPolygon } from "../Network/SwitchNetwork.js";
import "./../../style/app.css";

const Dapp = (props) => {
  const { connected, connectWallet } = props;

  return (
    <div className="dapp-container">
      {connected ? (
        window.ethereum.chainId === "0x89" ? (
          <div>
          <div className="top-components">
            <Burn {...props} />
            <Whitelist {...props} />
            <AdminRedeem {...props} />
            </div>
            <Mint {...props} />
            </div>
        ) : (
            <SwitchToPolygon connectWallet={connectWallet} connected={connected} />
        )
      ) : (
        <button className="button" onClick={() => connectWallet()}>
          Connect
        </button>
      )}
    </div>
  );
};

export default Dapp;
