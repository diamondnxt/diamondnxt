import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import * as ABIS from "./../../constants/ABIS"
import * as addresses from "./../../constants/addresses"
import { networks } from "./../Network/Networks.js";
import { SwitchNetwork } from "../Network/SwitchNetwork.js";
import collection from "../json/_metadata.json"
import Attributes from "./Attributes";



const FullCard = ({ web3, connected, connectWallet, selectedAddress }) => {    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    let { forSale } = true;


    const attributesbox = () => {
        let nftdata = require("../json/"+id+".json")

        
        return (
        <div>
            <h3 className="title">Attributes
            </h3>
            {nftdata.attributes.map((value, index) => {
                return <Attributes data={value} key={index}></Attributes>;
            })}
        </div>)
    }



    const switchToCustomNet = () => {
        SwitchNetwork({
            connected: connected,
            params: networks[0].params,
            connectWallet: connectWallet,
        });
    }

    return (
        <>
            <div class="card-big">
          <div>
            <img class="card-big--image" src={"/images/" + id + ".png"} alt="Diamond" />
            <div>
            <Link className="attribute" to={"/explorer/"+(id-1)}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path fill="#ffffff" d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm3 5.753l-6.44 5.247 6.44 5.263-.678.737-7.322-6 7.335-6 .665.753z"/></svg></Link>

<Link className="attribute" to={"/explorer/"+(id-0+1)}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path fill="#ffffff" d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z"/></svg></Link>
            </div>
            <h1 class="title"><a href="#">Diamond #{id}</a></h1>
            {}
            {attributesbox()}
          </div>
          <br></br>      
          <br></br>

          <br></br>      
          <br></br>      
          <br></br>      
          <br></br>
          <Link className="menuItem" to="/explorer">EXPLORE</Link>


        </div>
        </>
    );
}
export default FullCard;