import React from "react";
import "./Staking.css"; // Import your CSS file

const Staking = () => {
  // Define your discount levels here
  const discountLevels = [
    { level: 1, amount: 100, discount: "0.3%" },
    { level: 2, amount: 1000, discount: "1%" },
    { level: 3, amount: 10000, discount: "2%" },
    { level: 4, amount: 100000, discount: "4%" },
    { level: 5, amount: 1000000, discount: "6%" },
  ];

  const userDNXTBalance = 100000; // Replace with the user's DNXT balance
  const userDNXTStaked = 10000; // Replace with the user's DNXT balance
  const userDNXTStakedAverage = 8500; // Replace with the user's DNXT balance
  const userSelectedLevel = 3; // Replace with the user's selected level

  // Calculate the total fee (fee - discount = 10% - discount)
  const calculateTotalFee = (discount) => {
    const fee = 10; // 10% fee
    return fee - parseFloat(discount);
  };

  return (
    <div className="staking-container">
      <div className="staking-levels">
        {/* Render discount levels */}
        {discountLevels.map((levelData) => (
          <div
            className={`staking-level ${
              levelData.level === userSelectedLevel ? "selected" : ""
            }`}
            key={levelData.level}
          >
            <div className="level-info">
              <div className="level-name">Level {levelData.level}</div>
              <div className="level-discount">Discount: {levelData.discount}</div>
              <div className="level-fee">
                Total Fee: {calculateTotalFee(levelData.discount)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="staking-balance">
      <p>DNXT Balance: {userDNXTBalance} DNXT</p>
      <p>DNXT Staked: {userDNXTStaked} DNXT</p>
      <p>DNXT Staked Averaged: {userDNXTStakedAverage} DNXT</p>
      <div className="staking-discount">
      <p>Your Fee: {calculateTotalFee(discountLevels[userSelectedLevel - 1].discount)}% ({`-${parseFloat(discountLevels[userSelectedLevel - 1].discount) * 10}%`})</p>
      </div>
        <button className="stake-button">Stake</button>
        <button className="stake-button">Unstake</button>
      </div>
    </div>
  );
};

export default Staking;
