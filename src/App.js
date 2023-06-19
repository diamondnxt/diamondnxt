import React, { useEffect, useState } from "react"
import Header from "./components/Header/Header.js"
import Wallet from "./components/Wallet/Wallet"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dapp from "./components/Dapp/Dapp.js"
import Explorer from "./components/Collection/Explorer.js"
import "./style/app.css"
import Home from "./components/Home/Home.js"
import Profile from "./components/Profile/Profile.js"
import FullCard from "./components/Collection/FullCard.js"
//
const App = () => {
  const walletProps = Wallet();
  return (

    <Router>
      <Header {...walletProps} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/explorer/:id" element={
          <FullCard
            {...walletProps}
          />}
        />
        <Route exact path="/explorer" element={

          <Explorer />
        }
        />
        <Route exact path="/dapp" element={

          <Dapp
            {...walletProps}
          />
        } />
        <Route exact path="/profile" element={

          <Profile
            {...walletProps}
          />
        } />
      </Routes>
    </Router>
  )
}

export default App