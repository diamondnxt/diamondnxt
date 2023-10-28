// ExplorerDisplay.js
import React from 'react';
import Card from "./views/Card";
import ListItem from "./views/ListItem";

const ExplorerDisplay = ({ isLoading, connected, filteredData, displayMode, connectWallet }) => {
    return (
        <div className="explorer-container">
            {
                connected ? (
                    !isLoading ? (
                        filteredData.map((nft, index) => {
                            switch (displayMode) {
                                case 'list':
                                    return <ListItem data={nft} key={index} />;
                                case 'card':
                                    return <Card data={nft} key={index} />;
                                default:
                                    return null;
                            }
                        })
                    ) : (
                        <p className='title'>Loading...</p>
                    )
                ) : (
                    <button className='button' onClick={connectWallet}>Connect</button>
                )
            }
        </div>
    );
}

export default ExplorerDisplay;
