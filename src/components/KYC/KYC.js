import React, { useState } from "react";

const KYC = ({
  web3,
  connected,
  connectWallet,
  selectedAddress,
  startKYC,
  closeKYCModal,
}) => {
  const [isKycConfirmed, setIsKycConfirmed] = useState(false);

  const StartingKYC = () => {
    return (
      <div>
        Starting KYC
      </div>
    );
  };

  const handleConfirmClick = () => {
    setIsKycConfirmed(true); // Update the state when the "Confirm" button is clicked
  };

  return (
    <div className="modal">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <h2>You are about to start the KYC process</h2>
        {/* Additional information can be displayed here */}
        {isKycConfirmed ? <StartingKYC /> : null}
        <button className="menuItem" onClick={handleConfirmClick}>
          Confirm
        </button>
        <button className="menuItem" onClick={closeKYCModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default KYC;
