import React, { useState, useEffect } from "react";
import bnb from './../../images/bnb.png';
import matic from './../../images/matic.png';
import eth from './../../images/eth.png';
import pls from './../../images/pls.png'; // Import the image for PulseChain
import NetworkSelect from "../Network/NetworkSelect";
import "./../../style/header.css";


const UserInfo = (props) => {
    const [ethLogo, setLogo] = useState(eth);

    const logoeth = () => {
        switch (window.ethereum.chainId) {
            case "0x1": // ETH
                return (<img src={eth} alt="ETH logo" />);
            case "0x38": // BNB
                return (<img src={bnb} alt="BNB logo" />);
            case "0x89": // MATIC
                return (<img src={matic} alt="MATIC logo" />);
            case "0x171": // PLS
                return (<img src={pls} alt="PLS logo" />);
            default:
                return null; // Add a default case
        }
    }

    const symbol = () => {
        switch (window.ethereum.chainId) {
            case "0x1": // ETH
                return ('ETH');
            case "0x38": // BNB
                return ('BNB');
            case "0x89": // MATIC
                return ('MATIC');
            case "0x171": // PLS
                return ('PLS');
            default:
                return null; // Add a default case
        }
    }

    const explorer = () => {
        switch (window.ethereum.chainId) {
            case "0x1": // ETH
                return ("https://etherscan.io/address/");
            case "0x38": // BNB
                return ("https://bscscan.com/address/");
            case "0x89": // MATIC
                return ("https://polygonscan.com/address/");
            case "0x171": // PLS
                return ("https://scan.pulsechain.com/address/");
            default:
                return null; // Add a default case
        }
    }

    const selectedNetwork = () => {
        switch (window.ethereum.chainId) {
            case "0x1": // ETH
                return ("Ethereum");
            case "0x38": // BNB
                return ("Binance");
            case "0x89": // MATIC
                return ("Polygon");
            case "0x171": // PLS
                return ("PulseChain");
            default:
                return null; // Add a default case
        }
    }

    return (
        <div id="userInfo">
            {!props.connected ? (
              <ul className="balance-wr">
                <NetworkSelect {...props} selectedNetwork={selectedNetwork} />
              </ul>
            ) : (
              <div className="network">
                <div className="balance-wr">
                  <div className="user-address-label">Address:</div>
                  <div className="user-address-value">
                    <b>
                      <a target="_blank" rel="noopener noreferrer" id="toExplorer" href={explorer() + props.selectedAddress}>
                        {props.address !== 0 ? props.selectedAddress : ''}
                      </a>
                    </b>
                  </div>
                  <div className="balances-label">Balances:</div>
                  <div className="balances-value">
                    <b>
                      {props.etherBalance > 0 ? parseFloat(props.etherBalance).toFixed(3) : 0} <span>{symbol()}</span>
                    </b>
                  </div>
                  <div className="logoeth">{logoeth()}</div>
                </div>
                <NetworkSelect {...props} selectedNetwork={selectedNetwork} />

              </div>
            )}
        </div>
      )
      
}

export default UserInfo;
