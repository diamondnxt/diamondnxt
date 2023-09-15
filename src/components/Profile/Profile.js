import React, { useEffect, useState } from "react";
import { SwitchToPolygon } from "../Network/SwitchNetwork.js";
import KYC from "../KYC/KYC.js"
import Logo from "./../../images/logo.svg";
import "./Profile.css";
import * as ABIS from "../../constants/ABIS";
import * as addresses from "../../constants/addresses";

const Profile = ({
  web3,
  connected,
  connectWallet,
  selectedAddress,
  etherBalance,
  dnxtBalance,
}) => {
  const [nftBalances, setNftBalances] = useState([]);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [isKycStarted, setIsKycStarted] = useState(false); // Track if KYC process has started

  const closeKYCModal = () => {
    setIsKycStarted(false);
  };

  const startKYC = async () => {
    console.log("Starting KYC: ")
  };

  useEffect(() => {
    if (connected) {
      const checkWhitelistedStatus = async () => {
        const whitelistContract = new web3.eth.Contract(ABIS.ABIWHITELIST, addresses.whitelist);
        const isWhitelisted = await whitelistContract.methods.whitelisted(selectedAddress).call();
        setIsWhitelisted(isWhitelisted);
      };
  
      const checkBlacklistedStatus = async () => {
        const whitelistContract = new web3.eth.Contract(ABIS.ABIWHITELIST, addresses.whitelist);
        const isBlacklisted = await whitelistContract.methods.blacklisted(selectedAddress).call();
        setIsBlacklisted(isBlacklisted);
      };
  
      // Call the functions to check whitelist and blacklist status
      checkWhitelistedStatus();
      checkBlacklistedStatus();
    }
  }, [connected, selectedAddress, web3]);
  

  // Fetch NFT balances
  useEffect(() => {
    if (connected) {
      const getNftBalances = async () => {
        const dnftContract = new web3.eth.Contract(ABIS.ABIDNFT, addresses.dnft);
        const totalNftBalance = await dnftContract.methods.balanceOf(selectedAddress).call();
        const nftBalances = [];

        for (let i = 0; i < totalNftBalance; i++) {
          const tokenId = await dnftContract.methods.tokenOfOwnerByIndex(selectedAddress, i).call();
    // Generate the image URL based on the tokenId
    const imageUrl = `https://dnxt.app/images/${tokenId}.jpg`;
    // Add this information to nftDetails object.
    const nftDetails = {
      tokenId,
      imageUrl,
    };
    nftBalances.push(nftDetails);
        }

        setNftBalances(nftBalances);
      };
      getNftBalances();
    }
  }, [connected, selectedAddress, web3]);
  

  return (
    connected ? (
      window.ethereum.chainId === "0x89" ? (
      <div>
        <div className="profile-container">
        <div className="profile-box">
      <h2 className="section-title">Your Profile</h2>
      <p className="subtitle">Address: {selectedAddress}</p>

      {/* Whitelist and Blacklist Status */}
      {isWhitelisted ? (
        <p>Status: Whitelisted</p>
      ) : isBlacklisted ? (
        <p>Status: Blacklisted</p>
      ) : (
        <button className="button" onClick={() => setIsKycStarted(true)}>Start KYC Process</button>
      )}

{isKycStarted ? (
  // Render KYC form or other KYC-related content here
  // Example: <KYCForm />
  <KYC isKycStarted={isKycStarted} startKYC={startKYC} closeKYCModal={closeKYCModal} selectedAddress={selectedAddress} />
) : null}

    </div>
          {/* Balances Section */}
          <div className="profile-box">
            <h2 className="section-title">Balances</h2>
            <div className="section-content">
              <div className="title">MATIC Balance:</div>
              <div className="subtitle">
                <b>
                  {etherBalance > 0
                    ? parseFloat(etherBalance).toFixed(3)
                    : 0}{" "}
                  <span>MATIC</span>
                </b>
              </div>
              <div className="title">DNXT Balance:</div>
              <div className="subtitle">
                <b>
                  {dnxtBalance > 0 ? parseFloat(dnxtBalance).toFixed(3) : 0}{" "}
                  <span><img src={Logo} height="18px" alt="" /> DNXT</span>
                </b>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="profile-box">
            <h2 className="section-title">Activity</h2>
            <div className="section-content">
              {/* Example activity content */}
              <ul>
                <li>You have not performed any transactions yet</li>
                <br></br>
                <button className="button" onClick={() => connectWallet()}>Buy diamonds</button>
              </ul>
            </div>
          </div>

{/* My NFTs Section */}
<div className="profile-box">
  <h2 className="section-title">My NFTs</h2>
  <div className="section-content">
    {nftBalances.length > 0 ? (
      <div className="nft-list">
        {nftBalances.map((nft, index) => (
          <div key={index} className="nft-item">
            <a
              href={`https://dnxt.app/#/explorer/${nft.tokenId}`} // Replace with the actual explorer URL
              target="_blank" // Open the link in a new tab/window
              rel="noopener noreferrer" // Recommended for security reasons
            >
              <label className="subtitle">Diamond ID: {nft.tokenId}</label>
              <img src={nft.imageUrl} alt={`Diamond #${nft.tokenId}`} />
            </a>
            {/* Add more NFT details */}
          </div>
        ))}
      </div>
    ) : (
      <p>You currently have no diamonds.</p>
    )}
  </div>
</div>

        </div>
      </div>
            ) : (<><br></br><br></br><br></br><br></br><br></br><SwitchToPolygon connectWallet={connectWallet} connected={connected} /></>)
            ) : (<><br></br><br></br><br></br><br></br><br></br><br></br><button className="button" onClick={() => connectWallet()}>Connect</button></>)
          );
        };


export default Profile;
