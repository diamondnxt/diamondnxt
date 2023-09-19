import React, { useState } from "react";
import * as ABIS from "./../../constants/ABIS";
import * as addresses from "./../../constants/addresses";
import { SwitchToPolygon } from "../Network/SwitchNetwork.js";
import "./../../style/admin.css"

const Burn = ({ web3, connected, connectWallet, selectedAddress }) => {
  const [tokenId, setTokenId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const confirmBurn = () => {
    if (!tokenId) {
      setErrorMessage("Token ID missing");
      return;
    }

    burn();  
    setErrorMessage(null); // clear any previous error message
  };

  const burn = () => {
    if (!connected) {
      console.log("Not connected");
      return;
    }

    burnnft();

    async function burnnft() {
      let dnft = new web3.eth.Contract(ABIS.ABIDNFT, addresses.dnft);
      try {
        await dnft.methods.burn(tokenId).send({
          from: selectedAddress,
        }).on('receipt', function (receipt) {
          console.log(receipt);
        });

        // Close the modal after burning
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    connected ? (
      window.ethereum.chainId === "0x89" ? (
        <div className="mint-container">
          <h1 className="label">
            Burn Dashboard
          </h1>

          <label className="label">Token ID to burn:</label>
          <input type="text" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />

          <button className="button" onClick={() => setShowModal(true)}>Burn</button>

          {showModal && (
            <div className="modal">
              <div className="modal-overlay"></div>
              <div className="modal-content">
                <h2>Confirm Burn</h2>
                <p>Token ID: <span className="value">{tokenId}</span></p>
                {errorMessage && <label className="missingParameters">{errorMessage}</label>}
                <button className="button" onClick={() => confirmBurn()}>Confirm</button>
                <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          )}

        </div>
      ) : (<SwitchToPolygon connectWallet={connectWallet} connected={connected} />)
    ) : (<button className="button" onClick={() => connectWallet()}>Connect</button>)
  );
};

export default Burn;
