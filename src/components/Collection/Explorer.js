import Card from "./Card";
import ListItem from "./ListItem";
import json from "../json/_metadata.json";
import { useState } from "react";
import SearchOptions from './SearchOptions';
import FilterOptions from './FilterOptions';


const Explorer = () => {
    const data = json;
    const [filteredData, setFilteredData] = useState(data);
    const [displayMode, setDisplayMode] = useState('list'); 

    const handleDisplayModeChange = (mode) => {
        setDisplayMode(mode);
    }

    const handleFilter = (traitType, value) => {
        const results = data.filter(item => 
            item.attributes.some(attr => attr.trait_type === traitType && attr.value === value)
        );
        setFilteredData(results);
    };

    const handleSearch = (searchTerm) => {
        const results = data.filter(item => 
            item.name.includes(searchTerm) // Assumes that you are searching by name, adjust accordingly
        );
        setFilteredData(results);
    };
    

    return (
        <div className="container">
            <FilterOptions data={data} onFilter={handleFilter} className="filter-container" />
            <div className="explorer-container">
            <SearchOptions onChangeDisplayMode={handleDisplayModeChange} onSearch={handleSearch} />
                {filteredData.map((value, index) => {
                    switch (displayMode) {
                        case 'list':
                            return <ListItem data={value} key={index} />;
                        case 'card':
                            return <Card data={value} key={index} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
}

export default Explorer;
