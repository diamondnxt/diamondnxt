import { useState } from 'react';
import './Search.css';
import ReactSlider from 'react-slider';

const FilterOptions = ({ data, onFilter, onFilterPrice }) => {
    const [openPrimary, setOpenPrimary] = useState(null); // Track the primary option selected
    const [openTrait, setOpenTrait] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);  // Adjust this default value

    // You would replace this with real data or a function to get the highest price
    const highestPrice = 1000000;


    // Categorize attributes
    const attributeCounts = data.reduce((acc, item) => {
        item.attributes.forEach(attr => {
            if (!acc[attr.trait_type]) {
                acc[attr.trait_type] = {};
            }
            if (!acc[attr.trait_type][attr.value]) {
                acc[attr.trait_type][attr.value] = 0;
            }
            acc[attr.trait_type][attr.value]++;
        });
        return acc;
    }, {});

    const handleCheckboxChange = (traitType, value) => {
        // Invoke the parent's filter function here...
        onFilter(traitType, value);
    }

    const handleApplyPriceFilter = () => {
        // This function would handle the price filtering logic based on minPrice and maxPrice
        onFilterPrice({ min: minPrice, max: maxPrice }); // <-- Use the dedicated price filter handler
    };

    const handleSliderChange = ([min, max]) => {
        setMinPrice(min);
        setMaxPrice(max);
    }

    return (
        <div className="sidebar">
            {/* Primary options */}
            {['Status', 'Price', 'Traits'].map(option => (
                <h3 key={option} onClick={() => setOpenPrimary(option === openPrimary ? null : option)}>
                    {option}
                </h3>
            ))}

{openPrimary === 'Status' && (
                <div>
                    <input type="radio" id="all" name="status" value="all" defaultChecked />
                    <label htmlFor="all">All</label><br/>
                    <input type="radio" id="forSale" name="status" value="forSale" />
                    <label htmlFor="forSale">For Sale</label>
                </div>
            )}

            {openPrimary === 'Price' && (
                <div>
                    <ReactSlider 
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={0}
                        max={highestPrice}
                        value={[minPrice, maxPrice]}
                        onChange={handleSliderChange}
                    />
                    <input className="input" type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    <input className="input" type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    <button className='button' onClick={handleApplyPriceFilter}>Apply</button>
                </div>
            )}

            {/* If properties are selected, then display the attributes */}
            {openPrimary === 'Traits' && Object.keys(attributeCounts).map(traitType => (
                <div key={traitType}>
                    <h4 
                        className="trait-toggle" 
                        onClick={() => setOpenTrait(openTrait === traitType ? null : traitType)}>
                        {traitType}
                    </h4>
                    {openTrait === traitType && (
                        Object.keys(attributeCounts[traitType]).map(value => (
                            <div key={value} className="trait-detail">
                                <input 
                                    className='input'
                                    type="checkbox" 
                                    onChange={() => handleCheckboxChange(traitType, value)} 
                                />
                                {value} ({attributeCounts[traitType][value]})
                            </div>
                        ))
                    )}
                </div>
            ))}
        </div>
    );
}

export default FilterOptions;
