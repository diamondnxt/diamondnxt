import React, { useState } from "react";
import * as ABIS from "./../../constants/ABIS";
import * as addresses from "./../../constants/addresses";
import { networks } from "./../Network/Networks.js";
import { SwitchNetwork } from "../Network/SwitchNetwork.js";
import { Listbox, Transition } from '@headlessui/react';
import ImageUploader from "../ImageUploader/ImageUploader";
import "./mint.css"
import Logo from "./../../images/logo.svg";


const Mint = ({ web3, connected, connectWallet, selectedAddress }) => {
  const [supply, setSupply] = useState();
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [selectedCut, setSelectedCut] = useState(null);
  const [selectedClarity, setSelectedClarity] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedSymmetry, setSelectedSymmetry] = useState(null);
  const [selectedFluorescence, setSelectedFluorescence] = useState(null);
  const [selectedPolish, setSelectedPolish] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);
  const [certificateNumber, setCertificateNumber] = useState();

  const cuts = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const clarities = ['Flawless', 'Internally Flawless', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
  const colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const shapes = ['Round', 'Princess', 'Emerald', 'Asscher', 'Marquise', 'Oval', 'Radiant', 'Pear', 'Heart', 'Cushion'];
  const symmetries = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const fluorescences = ['None', 'Faint', 'Medium', 'Strong', 'Very Strong'];
  const polishes = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  const labs = ['GIA', 'AGS', 'HRD', 'IGI', 'EGL', 'Other'];

  const prices = async () => {
    setPrice(amount * 2);
  };

  const handleCertificateChange = (event) => {
    setCertificateNumber(event.target.value);
  };

  const contribute = async () => {
    if (!connected) {
      console.log("return");
      return;
    }
    web3.eth.getBalance(selectedAddress).then((value) => {
      console.log("balance: " + value);
    });
    web3.eth.sendTransaction({
      from: selectedAddress,
      to: addresses.dev,
      value: '1000000000000000000',
    }).on('transactionHash', function (hash) {

    });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setAmount(event.target.value);
  };



  const switchToCustomNet = () => {
    SwitchNetwork({
      connected: connected,
      params: networks[2].params,
      connectWallet: connectWallet,
    });
  };

  return (
    connected ? (
      window.ethereum.chainId === "0x89" ? (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <h1 className="listbox-label">
          <img src={Logo} width="64px"  />
            Diamond NXT Mint Dashboard
          </h1>
          <br></br>
          <br></br>
          <br></br>
          <div className="listbox-container">
            <label className="listbox-label">Cut:</label>
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
            <label className="listbox-label">Clarity:</label>
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
            <label className="listbox-label">Color:</label>
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

          <div className="listbox-container">
            <label className="listbox-label">Shape:</label>
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
            <label className="listbox-label">Symmetry:</label>
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
            <label className="listbox-label">Fluorescence:</label>
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
            <label className="listbox-label">Polish:</label>
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
            <label className="listbox-label">Lab:</label>
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
            <label className="certificate-label">Certificate Number:</label>
            <input name="certificateNumber" onChange={handleCertificateChange} />
          </div>
          <br></br>
          
          <ImageUploader />
          <br></br>
          <button className="deposit" onClick={() => contribute()}>Mint</button>
          <br></br>

        </div>
      ) : (<><br></br><br></br><br></br><br></br><br></br><br></br><button className="menuItem" onClick={() => switchToCustomNet()}>Switch to Polygon</button></>)
    ) : (<><br></br><br></br><br></br><br></br><br></br><br></br><button className="menuItem" onClick={() => connectWallet()}>Connect</button></>)
  );
};

export default Mint;
