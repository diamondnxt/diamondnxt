import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as ABIS from "./../../constants/ABIS";
import * as addresses from "./../../constants/addresses";
import { SwitchToPolygon } from "../Network/SwitchNetwork.js";
import { Listbox, Transition } from '@headlessui/react';
import ImageUploader from "../ImageUploader/ImageUploader";
import "./../../style/admin.css"


const Mint = ({ web3, connected, connectWallet, selectedAddress }) => {

  const [selectedCut, setSelectedCut] = useState(null);
  const [selectedClarity, setSelectedClarity] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedSymmetry, setSelectedSymmetry] = useState(null);
  const [selectedFluorescence, setSelectedFluorescence] = useState(null);
  const [selectedPolish, setSelectedPolish] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);
  const [certificateNumber, setCertificateNumber] = useState();
  const [caratWeight, setCaratWeight] = useState(null);
  const [next, setNext] = useState(null);

  const [images, setImages] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const cuts = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const clarities = ['Flawless', 'Internally Flawless', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
  const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const shapes = ['Round', 'Princess', 'Emerald', 'Asscher', 'Marquise', 'Oval', 'Radiant', 'Pear', 'Heart', 'Cushion'];
  const symmetries = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const fluorescences = ['None', 'Faint', 'Medium', 'Strong', 'Very Strong'];
  const polishes = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const labs = ['GIA', 'AGS', 'HRD', 'IGI', 'EGL', 'Other'];

  const [jsonModalVisible, setJsonModalVisible] = useState(false);
  const [generatedJson, setGeneratedJson] = useState(null);

  const [tokenId, setTokenId] = useState(39); // Example token ID
  


  const generateJSON = () => {
    const jsonString = JSON.stringify(
      {
        name: `Vitale #${tokenId}`,
        description: "Heritage Collection: Combining tradition with technology",
        image: `https://dnxt.app/images/${tokenId}.jpg`,
        animation_url: `https://dnxt.app/videos/${tokenId}.mp4`,
        edition: tokenId,
        attributes: [
          { trait_type: "Cut", value: selectedCut },
          { trait_type: "Clarity", value: selectedClarity },
          { trait_type: "Color", value: selectedColor },
          { trait_type: "Shape", value: selectedShape },
          { trait_type: "Symmetry", value: selectedSymmetry },
          { trait_type: "Fluorescence", value: selectedFluorescence },
          { trait_type: "Polish", value: selectedPolish },
          { trait_type: "Lab", value: selectedLab },
          { trait_type: "Certificate Number", value: certificateNumber },
          { trait_type: "Carat Weight", value: Number(caratWeight) },
        ],
      },
      null,
      2
    );

    setGeneratedJson(jsonString);
    setJsonModalVisible(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(function () {
      console.log('Copied to clipboard successfully!');
    }, function (err) {
      console.error('Unable to copy', err);
    });
  }

  const handleCertificateChange = (event) => {
    setCertificateNumber(event.target.value);
  };

  const confirmMint = () => {
    fetchJson()
    console.log("images.length: " + images.length)
    if (images.length > 0) {
      uploadToServer(images[0]["data_url"]);
    }
    const parameters = [
      selectedLab,
      certificateNumber,
      selectedShape,
      caratWeight,
      selectedColor,
      selectedClarity,
      selectedCut,
      selectedPolish,
      selectedSymmetry,
      selectedFluorescence
    ];

    const allParametersSet = parameters.every(param => param !== null && param !== undefined);

    if (!allParametersSet) {
      setErrorMessage("Missing parameters");
      return;
    }

    // Proceed with minting
    mintWithInfo();  // Uncommented line

    setErrorMessage(null); // clear any previous error message
  };


  const mintWithInfo = () => {
    if (!connected) {
      console.log("Not connected");
      return;
    }

    mintToken();

    async function mintToken() {
      let dnft = new web3.eth.Contract(ABIS.ABIDNFT, addresses.dnft);
      try {
        await dnft.methods.safeMintWithDiamondInfo(
          selectedAddress,
          selectedLab,
          certificateNumber,
          selectedShape,
          1,
          selectedColor,
          selectedClarity,
          selectedCut,
          selectedPolish,
          selectedSymmetry,
          selectedFluorescence
        ).send({
          from: selectedAddress,
        }).on('receipt', function (receipt) {
          console.log(receipt);
        });

        // Close the modal after minting
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (connected) { 
      const getNextTokenIdFromContract = async () => {
        const tokenContract = new web3.eth.Contract(ABIS.ABIDNFT, addresses.dnft);
        const current = await tokenContract.methods.totalSupply().call();
        const next = Number(current) + 1;
        console.log(next+'next')
        setNext(next);
        setTokenId(next)
      };
      getNextTokenIdFromContract();
    }
  }, [connected, web3, ]);


  

  const handleCaratWeightChange = (e) => {
    let input = e.target.value;

    // Use regular expression to match the desired format
    if (/^\d*(\.\d{0,2})?$/.test(input)) {
      // If in desired format, we update the state
      setCaratWeight(input);
    }
  }


  const uploadToServer = async (dataURL) => {
    try {
      const response = await axios.post('https://dnxt.app/mint', {
        image: dataURL
      });
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };




  function fetchJson() {
    fetch('https://raw.githubusercontent.com/diamondnxt/diamondnxt/gh-pages/json/3.json')
      .then(response => response.json())
      .then(data => {
        console.log(data.attributes);
        // Do something with your data
      })
      .catch(error => console.error('Error fetching the file:', error));
  }



  return (
    connected ? (
      window.ethereum.chainId === "0x89" ? (
        <div className="mint-container">
          <h1 className="label">
            NFT Dashboard
          </h1>
        
          <div className="listbox-container">
            <label className="label">Next Token ID: {next}</label>
          </div>

          <div className="listbox-container">
            <label className="label">Cut:</label>
            <Listbox value={selectedCut} onChange={setSelectedCut}>
              <Listbox.Button className={selectedCut ? 'custom-active' : 'custom-inactive'}>
                {selectedCut || "Select a Cut"}
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {cuts.map((cut, cutIdx) => (
                    <Listbox.Option
                      key={cutIdx}
                      className={({ active }) =>
                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                      }
                      value={cut}
                    >
                      {cut}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          <div className="listbox-container">
            <label className="label">Clarity:</label>
            <Listbox value={selectedClarity} onChange={setSelectedClarity}>
              <Listbox.Button className={selectedClarity ? 'custom-active' : 'custom-inactive'}>
                {selectedClarity || "Select a Clarity"}
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {clarities.map((clarity, clarityIdx) => (
                    <Listbox.Option
                      key={clarityIdx}
                      className={({ active }) =>
                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                      }
                      value={clarity}
                    >
                      {clarity}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          <div className="listbox-container">
            <label className="label">Color:</label>
            <Listbox value={selectedColor} onChange={setSelectedColor}>
              <Listbox.Button className={selectedColor ? 'custom-active' : 'custom-inactive'}>
                {selectedColor || "Select a Color"}
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {colors.map((color, colorIdx) => (
                    <Listbox.Option
                      key={colorIdx}
                      className={({ active }) =>
                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                      }
                      value={color}
                    >
                      {color}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
          <div className="certificate-container">
            <label className="label">Carat Weight:</label>
            <input name="caratWeight" onChange={handleCaratWeightChange} />
          </div>

          <div className="listbox-container">
            <label className="label">Shape:</label>
            <Listbox value={selectedShape} onChange={setSelectedShape}>
              <Listbox.Button className={selectedShape ? 'custom-active' : 'custom-inactive'}>
                {selectedShape || "Select a Shape"}
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {shapes.map((shape, shapeIdx) => (
                    <Listbox.Option
                      key={shapeIdx}
                      className={({ active }) =>
                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                      }
                      value={shape}
                    >
                      {shape}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
          <div className="listbox-container">
            <label className="label">Polish:</label>
            <Listbox value={selectedPolish} onChange={setSelectedPolish}>
              <Listbox.Button className={selectedPolish ? 'custom-active' : 'custom-inactive'}>
                {selectedPolish || "Select a Polish"}
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {polishes.map((polish, polishIdx) => (
                    <Listbox.Option
                      key={polishIdx}
                      className={({ active }) =>
                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                      }
                      value={polish}
                    >
                      {polish}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          <div className="listbox-container">
            <label className="label">Symmetry:</label>
            <Listbox value={selectedSymmetry} onChange={setSelectedSymmetry}>
              <Listbox.Button className={selectedSymmetry ? 'custom-active' : 'custom-inactive'}>
                {selectedSymmetry || "Select a Symmetry"}
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {symmetries.map((symmetry, symmetryIdx) => (
                    <Listbox.Option
                      key={symmetryIdx}
                      className={({ active }) =>
                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                      }
                      value={symmetry}
                    >
                      {symmetry}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          <div className="listbox-container">
            <label className="label">Fluorescence:</label>
            <Listbox value={selectedFluorescence} onChange={setSelectedFluorescence}>
              <Listbox.Button className={selectedFluorescence ? 'custom-active' : 'custom-inactive'}>
                {selectedFluorescence || "Select a Fluorescence"}
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {fluorescences.map((fluorescence, fluorescenceIdx) => (
                    <Listbox.Option
                      key={fluorescenceIdx}
                      className={({ active }) =>
                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                      }
                      value={fluorescence}
                    >
                      {fluorescence}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          <div className="listbox-container">
            <label className="label">Lab:</label>
            <Listbox value={selectedLab} onChange={setSelectedLab}>
              <Listbox.Button className={selectedLab ? 'custom-active' : 'custom-inactive'}>
                {selectedLab || "Select a Lab"}
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="listbox-options">
                  {labs.map((lab, labIdx) => (
                    <Listbox.Option
                      key={labIdx}
                      className={({ active }) =>
                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                      }
                      value={lab}
                    >
                      {lab}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>

            </Listbox>

          </div>
          <div className="certificate-container">
            <label className="label">Certificate Number:</label>
            <input name="certificateNumber" onChange={handleCertificateChange} />
          </div>
          <br></br>
          <ImageUploader images={images} setImages={setImages} />
          <br></br>

          <button className="button" onClick={() => setShowModal(true)}>Mint</button>

          <br></br>
          {showModal && (
            <div className="modal">
              <div className="modal-overlay"></div>
              <div className="modal-content">
                <h2>Actions</h2>
                <p>ID: <span className="value">{tokenId}</span></p>
                <p>Cut: <span className="value">{selectedCut}</span></p>
                <p>Clarity: <span className="value">{selectedClarity}</span></p>
                <p>Color: <span className="value">{selectedColor}</span></p>
                <p>Shape: <span className="value">{selectedShape}</span></p>
                <p>Symmetry: <span className="value">{selectedSymmetry}</span></p>
                <p>Fluorescence: <span className="value">{selectedFluorescence}</span></p>
                <p>Polish: <span className="value">{selectedPolish}</span></p>
                <p>Lab: <span className="value">{selectedLab}</span></p>
                <p>Certificate Number: <span className="value">{certificateNumber}</span></p>
                <p>Carat Weight: <span className="value">{caratWeight}</span></p>
                {errorMessage && <label className="missingParameters">{errorMessage}</label>}
                <button className="button" onClick={() => confirmMint()}>Mint</button>
                <button className="button" onClick={() => generateJSON()}>Generate JSON</button>
                {jsonModalVisible && (
                  <div className="modal">
                    <div className="modal-overlay" onClick={() => setJsonModalVisible(false)}></div>
                    <div className="modal-content">
                      <h2>Generated JSON</h2>
                      <textarea value={generatedJson} readOnly rows={10} cols={60} />
                      <button
                        className="button"
                        onClick={() => {
                          copyToClipboard(generatedJson);
                        }}
                      >
                        Copy JSON
                      </button>
                    </div>
                  </div>
                )}
                <button className="button" onClick={() => confirmMint()}>Estimate Price</button>
                <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          )}

        </div>
      ) : (<><br></br><br></br><br></br><br></br><br></br><SwitchToPolygon connectWallet={connectWallet} connected={connected} /></>)
    ) : (<><br></br><br></br><br></br><br></br><br></br><br></br><button className="button" onClick={() => connectWallet()}>Connect</button></>)
  );
};

export default Mint;
