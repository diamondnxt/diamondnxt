import React, { useState } from 'react';
import SumsubWebSdk from "@sumsub/websdk-react";
import axios from 'axios';

const SUMSUB_BASE_URL = 'https://api.sumsub.com';
const EXPRESS_SERVER_URL = 'http://localhost:5000'; // Update with your server's URL

const KYC = ({
  startKYC,
  closeKYCModal,
  selectedAddress
}) => {
  const [isKycConfirmed, setIsKycConfirmed] = useState(false);
  const [accessToken, setAccessToken] = useState(null); // Store the access token here
  const [applicantId, setApplicantId] = useState(null); // Store the applicant ID here

  const config = {
    lang: 'en', // Set the language
    // Other Sumsub configuration options here
  };

  const options = {
    // Sumsub options here
  };


  const accessTokenExpirationHandler = async () => {
console.log("Expiration!")
  };




  const messageHandler = (type, payload) => {
    // Handle Sumsub SDK messages
    console.log('Sumsub SDK Message:', type, payload);
  };

  const errorHandler = (error) => {
    // Handle Sumsub SDK errors
    console.error('Sumsub SDK Error:', error);
  };
  

  const handleConfirmClick = async () => {
    startKYC();
    setIsKycConfirmed(true);
    setApplicantId(selectedAddress);
    try {
      // Make a POST request to your server to create the applicant
      const applicantResponse = await axios.post(EXPRESS_SERVER_URL + '/create-applicant', {
        externalUserId: selectedAddress, // Pass the Ethereum address as externalUserId
        levelName: 'dnxt', // Adjust the levelName as needed
      });
    
      console.log('Applicant created:', applicantResponse.data);
    
      // Now that the applicant is created successfully, create the access token
      try {
        const accessTokenResponse = await axios.post(EXPRESS_SERVER_URL + '/create-access-token', {
          selectedAddress, // Pass the Ethereum address to the server
          levelName: 'dnxt', // Adjust the levelName as needed
        });
      
        // Extract the access token from the response data
        const accessToken = accessTokenResponse.data.token;
      
        // Log the access token
        console.log('Access Token:', accessToken);
      
        // Call the setAccessToken function to set it in your application
        setAccessToken(accessToken);
      
        // Handle the response or update your component's state as needed
      } catch (accessTokenError) {
        console.error('Error creating access token:', accessTokenError);
        // Handle errors if needed
      }
    } catch (applicantError) {
      console.error('Error creating applicant:', applicantError);
      // Handle errors if needed
    }
    
    
    
    
    // Create an applicant when the user confirms
  /*  try {
      const newApplicantId = await createApplicant();
      setApplicantId(newApplicantId);
      console.log("New applicant ID: " + newApplicantId);
    } catch (error) {
      console.error('Error creating applicant:', error);
    } */
  };



  return (
    <div className="modal">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <h2>You are about to start the KYC process</h2>
        {/* Additional information can be displayed here */}
        {isKycConfirmed && accessToken ? (
          <SumsubWebSdk
            accessToken={accessToken}
            expirationHandler={accessTokenExpirationHandler}
            config={config}
            options={options}
            onMessage={messageHandler}
            onError={errorHandler}
            baseUrl={SUMSUB_BASE_URL}
          />
        ) : null}
        <button className="menuItem" onClick={handleConfirmClick}>
          Confirm
        </button>
        <div>{applicantId}</div>
        <button className="menuItem" onClick={closeKYCModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default KYC;
