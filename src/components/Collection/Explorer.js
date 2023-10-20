import React, { useState, useEffect } from 'react';
import Card from "./Card";
import ListItem from "./ListItem";
import SearchOptions from './SearchOptions';
import FilterOptions from './FilterOptions';
import * as ABIS from "./../../constants/ABIS";
import * as addresses from "./../../constants/addresses";

const Explorer = ({ connected, web3, connectWallet }) => {
    const [nftBalances, setNftBalances] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayMode, setDisplayMode] = useState('list');

    const handleDisplayModeChange = (mode) => {
        setDisplayMode(mode);
    }

    const handleFilter = (traitType, value) => {
        const results = nftBalances.filter(item =>
            item.attributes.some(attr => attr.trait_type === traitType && attr.value === value)
        );
        setFilteredData(results);
    };

    const handleSearch = (searchTerm) => {
        const results = nftBalances.filter(item =>
            item.name.includes(searchTerm)
        );
        setFilteredData(results);
    };

    useEffect(() => {
        if (connected) {
            const fetchAllNFTs = async () => {
                setIsLoading(true);
                const dnftContract = new web3.eth.Contract(ABIS.ABIDNFT, addresses.dnft);

                const totalSupply = await dnftContract.methods.totalSupply().call();
                const tempNftBalances = [];

                for (let i = 0; i < totalSupply; i++) {
                    const tokenId = await dnftContract.methods.tokenByIndex(i).call();
                    const tokenUri = await dnftContract.methods.tokenURI(tokenId).call();

                    try {
                        const response = await fetch(tokenUri);
                        const nftData = await response.json();

                        // For demonstration, just logging the attributes of fetched data
                        console.log(nftData.attributes);

                        // Combine the token data with the fetched data
                        const combinedData = {
                            id: tokenId,
                            ...nftData
                        };
                        tempNftBalances.push(combinedData);
                    } catch (error) {
                        console.error(`Failed to fetch data for token ${tokenId}:`, error);
                    }
                }

                setNftBalances(tempNftBalances);
                setFilteredData(tempNftBalances);
                setIsLoading(false);
            };

            fetchAllNFTs();
        }
    }, [connected, web3]);

    return (
        <div className="container">
            <FilterOptions data={filteredData} onFilter={handleFilter} className="filter-container" />
            <div className="explorer-container">
                <SearchOptions onChangeDisplayMode={handleDisplayModeChange} onSearch={handleSearch} />
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
        </div>
    );
}

export default Explorer;
