import React, { useEffect, useState } from "react";
import { SwitchToPolygon } from "../Network/SwitchNetwork.js";
import "./Profile.css";
import * as ABIS from "../../constants/ABIS";
import * as addresses from "../../constants/addresses";

const Profile = ({
  web3,
  connected,
  connectWallet,
  selectedAddress,
  etherBalance,
  tokens,
}) => {
  const [nftBalances, setNftBalances] = useState([]);

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
                  {tokens > 0 ? parseFloat(tokens).toFixed(3) : 0}{" "}
                  <span>DNXT</span>
                </b>
              </div>
            </div>
          </div>

          {/* Staking Section */}
          <div className="profile-box">
            <h2 className="section-title">Staking</h2>
            <div className="section-content">
              {/* Example staking content */}
              <p>You currently have 0 DNXT staked.</p>
              <button className="menuItem" onClick={() => connectWallet()}>Stake</button>
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
                <button className="menuItem" onClick={() => connectWallet()}>Buy diamonds</button>
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
            ) : (<><br></br><br></br><br></br><br></br><br></br><br></br><button className="menuItem" onClick={() => connectWallet()}>Connect</button></>)
          );
        };


export default Profile;
