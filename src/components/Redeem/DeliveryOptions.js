import { useState } from 'react';

const DeliveryOptions = ({ nextStep }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const delivery = () => {
    setSelectedOption('delivery');
    // Add code for handling delivery option here
  };

  const pickup = () => {
    setSelectedOption('pickup');
    // Add code for handling pickup option here
  };

  const handleAccept = () => {
    // Logic to proceed to the next step and display the delivery options modal
    nextStep(); // Call the nextStep function to proceed to the next step
  };

  return (
    <div className="delivery-options-container">
      <div className="delivery-option">
        <button className="button" onClick={delivery}>Delivery</button>
      </div>
      <div className="pickup-option">
        <button className="button" onClick={pickup}>Pickup</button>
      </div>

      {selectedOption === 'delivery' ? (
        <div className="delivery-content">
          {/* Content for the delivery option */}
          <p>Delivery Content Here</p>
        </div>
      ) : selectedOption === 'pickup' ? (
        <div className="pickup-content">
          {/* Content for the pickup option */}
          <p>Pickup Content Here</p>
          <button className="button" onClick={handleAccept}>
            Accept
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DeliveryOptions;
