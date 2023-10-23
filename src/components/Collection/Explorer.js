import React, { useState, useEffect } from 'react';
import Card from "./Card";
import ListItem from "./ListItem";
import SearchOptions from './SearchOptions';
import FilterOptions from './FilterOptions';
import * as ABIS from "./../../constants/ABIS";
import * as addresses from "./../../constants/addresses";
import Price from '../Price/Price.json'

const Explorer = ({ connected, web3, connectWallet }) => {
    const [nftData, setNftData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayMode, setDisplayMode] = useState('list');

    const handleDisplayModeChange = (mode) => {
        setDisplayMode(mode);
    }

    const handleFilter = (traitType, value) => {
        const results = nftData.filter(item =>
            item.attributes.some(attr => attr.trait_type === traitType && attr.value === value)
        );
        setFilteredData(results);
    };

    const handleSearch = (searchTerm) => {
        const results = nftData.filter(item =>
            item.name.includes(searchTerm)
        );
        setFilteredData(results);
    };

    
// This function is called whenever the sort option changes
const handleSortOptionChange = (option) => {
    console.log('Current sort option:', option); // Log the current selected option

    // Create a new array from the current state to avoid direct mutation
    let sortedData = [...filteredData];
    switch(option) {
        case 'Price low to high':
            sortedData.sort((a, b) => a.price - b.price);
            console.log('Sorted data (low to high):', sortedData); // Log the sorted array
            break;
        case 'Price high to low':
            sortedData.sort((a, b) => b.price - a.price);
            console.log('Sorted data (high to low):', sortedData); // Log the sorted array
            break;
        // ... handle other cases based on your sort options
        default:
            console.warn(`Unexpected sort option: '${option}', no sorting applied.`);
            break;
    }

    // Assuming you have a state setter function for your sorted data
    setFilteredData(sortedData);
    console.log('Updated state:', sortedData); // Log the state after it's been set
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
                            id: tokenId, price: Price[tokenId], 
                            ...nftData
                        };
                        tempNftBalances.push(combinedData);
                    } catch (error) {
                        console.error(`Failed to fetch data for token ${tokenId}:`, error);
                    }
                }

                setNftData(tempNftBalances);
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
            <SearchOptions 
                onChangeDisplayMode={handleDisplayModeChange} 
                onSearch={handleSearch} 
                onSortOptionChange={handleSortOptionChange} // Pass the handler to the child component
            />                {
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
