import React, { useState } from 'react';
import SearchFilter from "./SearchFilter";
import { Listbox, Transition } from '@headlessui/react'

const SearchOptions = ({ onChangeDisplayMode, onSearch, onSortOptionChange, nftData }) => {
    const [activeTab, setActiveTab] = useState('list');    

    const sortOptions = [
        'Price low to high',
        'Price high to low',
        'Recently listed',
        'Best offer',
        'Highest last sale',
        'Recently sold',
        'Recently created',
        'Most viewed',
        'Oldest',
        'Most favorited',
        'Ending soon',
        'Recently received'
      ];

      const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

    // This function is called whenever a new sort option is selected.
    const handleSortChange = (value) => {
        // Update the state with the new sort option.
        setSelectedSort(value);

        // Call the onSortOptionChange function passed from the parent component.
        onSortOptionChange(value);
    };

    const handleTabClick = (mode) => {
        setActiveTab(mode);
        onChangeDisplayMode(mode);
    };


    return (
        <div className="tabs-container">
            <SearchFilter onSearch={onSearch} nftData={nftData}/>
            <div className="dropdown-container">                
                <Listbox value={selectedSort} onChange={handleSortChange}>
                    <Listbox.Button className={selectedSort ? 'custom-active' : 'custom-inactive'}>
                        {selectedSort || "Sort"}
                    </Listbox.Button>
                    <Transition
                        as={React.Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="listbox-options">
                            {sortOptions.map((sort, sortIdx) => (
                                <Listbox.Option
                                    key={sortIdx}
                                    className={({ active }) =>
                                        `${active ? 'listbox-option listbox-option-active' : 'listbox-option'}`
                                    }
                                    value={sort}
                                >
                                    {sort}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </Listbox>
            </div>
            <button className={`tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => handleTabClick('list')}>
                <svg className="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                </svg>
            </button>

            <button className={`tab ${activeTab === 'card' ? 'active' : ''}`} onClick={() => handleTabClick('card')}>
                <svg className="tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
                    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                </svg>
            </button>
        </div>
    );
}

export default SearchOptions;
