import React from "react";
import matic from './../../images/matic.png';
import eth from './../../images/eth.png';
import NetworkSelect from "../Network/NetworkSelect";
import "./../../style/header.css";


const UserInfo = (props) => {

  const logoeth = () => {
    switch (window.ethereum.chainId) {
      case "0x1": // ETH
        return (<img src={eth} alt="ETH logo" />);
      case "0x89": // MATIC
        return (<img src={matic} alt="MATIC logo" />);
      default:
        return null; // Add a default case
    }
  }

  const symbol = () => {
    switch (window.ethereum.chainId) {
      case "0x1": // ETH
        return ('ETH');
      case "0x89": // MATIC
        return ('MATIC');
      default:
        return null; // Add a default case
    }
  }

  const explorer = () => {
    switch (window.ethereum.chainId) {
      case "0x1": // ETH
        return ("https://etherscan.io/address/");
      case "0x89": // MATIC
        return ("https://polygonscan.com/address/");
      default:
        return "#"; // Return a default value so it won't break the link
    }
  }


  const selectedNetwork = () => {
    switch (window.ethereum.chainId) {
      case "0x1": // ETH
        return ("Ethereum");
      case "0x89": // MATIC
        return ("Polygon");
      default:
        return null; // Add a default case
    }
  }

  // Captures 0x followed by 4 characters, then any number of characters, and ends with the last 4 characters.
  const truncateRegex = /^(0x[a-zA-Z0-9]{4}).*(.{4})$/;

  const truncateEthAddress = (address) => {
    if (typeof address !== 'string' || !address.match(truncateRegex)) {
      return address; // Return the original address if it's not a valid string or doesn't match the regex.
    }

    const match = address.match(truncateRegex);
    return `${match[1]}…${match[2]}`;
  };
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
                  {truncateEthAddress(props.selectedAddress)}
                </a>
              </b>
            </div>
            <div className="balances-label">Balances:</div>
            <div className="balances-value">
              <div>
                <b>
                  {props.etherBalance > 0 ? parseFloat(props.etherBalance).toFixed(3) : 0} <span>{symbol()}</span>
                </b>
              </div>
              <div>
                <b>
                  {props.dnxtBalance > 0 ? parseFloat(props.dnxtBalance).toFixed(3) : 0} <span>DNXT</span>
                </b>
              </div>
            </div>
          </div>
          <NetworkSelect {...props} selectedNetwork={selectedNetwork} />
          <div className="logoeth">{logoeth()}</div>

        </div>
      )}
    </div>
  )

}

export default UserInfo;
