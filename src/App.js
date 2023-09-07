import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header.js";
import Wallet from "./components/Wallet/Wallet";
import Dapp from "./components/Dapp/Dapp.js";
import Explorer from "./components/Collection/Explorer.js";
import "./style/app.css";
import Home from "./components/Home/Home.js";
import Profile from "./components/Profile/Profile.js";
import Redeem from "./components/Redeem/Redeem.js";
import FullCard from "./components/Collection/FullCard.js";

const App = () => {
    const walletProps = Wallet();
    return (
        <Router>
            <Header {...walletProps} />
            <Routes>
                <Route path="/explorer/:id" element={<FullCard {...walletProps} />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/dapp" element={<Dapp {...walletProps} />} />
                <Route path="/profile" element={<Profile {...walletProps} />} />
                <Route path="/redeem" element={<Redeem {...walletProps} />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App;
