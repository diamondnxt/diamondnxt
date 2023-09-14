import React, { useState } from 'react';
import SumsubWebSdk from "@sumsub/websdk-react";
import axios from 'axios';

const SUMSUB_BASE_URL = 'https://api.sumsub.com';
const EXPRESS_SERVER_URL = 'http://servernext.vercel.app'; // Update with your server's URL
const levelName = 'dnxt';

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

  const createApplicant = async () => {
    try {
      const response = await axios.post(EXPRESS_SERVER_URL +'/create-applicant', {
        externalUserId: selectedAddress,
        levelName: levelName, // Provide the appropriate level name
      });
      setApplicantId(response.data.id);
      console.log('Applicant created:', response.data);
    } catch (error) {
      console.error('Error creating applicant:', error);
    }
  };
  
  // Function to create an access token
  const createAccessToken = async () => {
    try {
      const response = await axios.post(EXPRESS_SERVER_URL +'/create-access-token', {
        externalUserId: selectedAddress,
        levelName: levelName, // Provide the appropriate level name
      });
      setAccessToken(response.data.token);
      console.log('Access Token:', accessToken);
    } catch (error) {
      console.error('Error creating access token:', error);
    }
  };
  

  const handleConfirmClick = async () => {
    startKYC();
    setIsKycConfirmed(true);
    setApplicantId(selectedAddress);
    createApplicant()
    createAccessToken()
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
