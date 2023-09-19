import { useState } from 'react';
import './Search.css';

const FilterOptions = ({ data, onFilter }) => {
    const [openTrait, setOpenTrait] = useState(null);

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

    return (
        <div className="filter-container">
            {Object.keys(attributeCounts).map(traitType => (
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
