import React from "react";
import { useParams, Link } from 'react-router-dom';
import Attributes from "./Attributes";

const FullCard = ({ web3, connected, connectWallet, selectedAddress }) => {
    let { id } = useParams();
    const buyLink = `https://vitale.dnxt.app/token/POLYGON:0x97b984b5751009def5f50fdc51477e3821b53050:${id}`;


    const attributesbox = () => {
        let nftdata = require("../json/" + id + ".json");

        return (
            <div>
                <h3>Attributes</h3>
                {nftdata.attributes.map((value, index) => {
                    return <Attributes data={value} key={index}></Attributes>;
                })}
            </div>
        );
    }

    return (
        <>
            <div className="card-big">
                <div>
                    <img className="card-big--image" src={"/images/" + id + ".jpg"} alt="Diamond" />
                    <div>
                        <Link className="attribute" to={"/explorer/" + (id - 1)}>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                                <path fill="#ffffff" d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm3 5.753l-6.44 5.247 6.44 5.263-.678.737-7.322-6 7.335-6 .665.753z" />
                            </svg>
                        </Link>

                        <Link className="attribute" to={"/explorer/" + (parseInt(id) + 1)}>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                                <path fill="#ffffff" d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z" />
                            </svg>
                        </Link>

                    </div>
                    <h1 className="title"><span>Diamond #{id}</span></h1>
                    {attributesbox()}
                </div>
                <br />
                <a
                    href={buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                >
                    BUY
                </a>
                <br />
                <Link className="button" to="/explorer">EXPLORE</Link>
            </div>
        </>
    );
}

export default FullCard;
