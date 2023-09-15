import React, { useEffect, useState } from "react";
import { SwitchToPolygon } from "../Network/SwitchNetwork.js";
import "./../../style/Redeem.css";
import * as ABIS from "./../../constants/ABIS";
import * as addresses from "./../../constants/addresses";

const Redeem = ({
  web3,
  connected,
  connectWallet,
  selectedAddress,
}) => {
  const [nftBalances, setNftBalances] = useState([]);
  const [selectedDiamonds, setSelectedDiamonds] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for displaying the modal
  const [isLoading, setIsLoading] = useState(true);



  const closeModal = () => {
    setShowModal(false);
  };

  const renderDiamondsToRedeem = () => {
    // Render the list of diamonds to be redeemed within the modal
    return (
      <div>
        {/* Iterate over selectedDiamonds and display information */}
        {selectedDiamonds.map((diamond) => (
          <div key={diamond}>
            <p>Diamond ID: {diamond} Details:</p>
            {/* Display diamond details here */}
          </div>
        ))}
      </div>
    );
  };
  

  const handleCheckboxChange = (tokenId) => {
    if (selectedDiamonds.includes(tokenId)) {
      // If the diamond is already selected, remove it from the list
      setSelectedDiamonds(selectedDiamonds.filter((id) => id !== tokenId));
    } else {
      // If the diamond is not selected, add it to the list
      setSelectedDiamonds([...selectedDiamonds, tokenId]);
    }
  };


  // Fetch NFT balances
  useEffect(() => {
    if (connected) {
    
      const getNftBalances = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
      };

      getNftBalances();
    }
  }, [connected, selectedAddress, web3]);

  const redeemSelectedDiamonds = async () => {
    console.log("Redeeming diamonds: "+selectedDiamonds)
  };
  

  return (
    connected ? (
      window.ethereum.chainId === "0x89" ? (
        <div className="redeem-container">
          <h2 className="section-title">Redeem Your NFTs</h2>
          {isLoading ? (
          <p>Loading...</p>
        ) : (
          nftBalances.length > 0 ? (
            <div className="nft-list">
              {nftBalances.map((nft, index) => (
                <div key={index} className="nft-item">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(nft.tokenId)}
                    checked={selectedDiamonds.includes(nft.tokenId)}
                  />
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
            <p>No NFTs to redeem.</p>
          )
        )}


<button
  className="button"
  onClick={() => setShowModal(true)}
>
  Redeem Selected
</button>
{showModal && (
            <div className="modal">
              <div className="modal-overlay" onClick={closeModal}></div>
              <div className="modal-content">
                <h2>Confirm Redeem</h2>
                {renderDiamondsToRedeem()}
                {/* Additional information can be displayed here */}
                <button className="button" onClick={redeemSelectedDiamonds}>
                  Confirm
                </button>
                <button className="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        <><br></br><br></br><br></br><br></br><br></br><SwitchToPolygon connectWallet={connectWallet} connected={connected} /></>
      )
    ) : (
      <><br></br><br></br><br></br><br></br><br></br><br></br><button className="button" onClick={() => connectWallet()}>Connect</button></>
    )
  );
};

export default Redeem;
