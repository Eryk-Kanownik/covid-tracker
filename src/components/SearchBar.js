import React from 'react'

const SearchBar = ({search,sort}) => {
    
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search for countries" onChange={(e) => search(e.target.value)}/>
            <select id="sel" onChange={(e) => sort(e.target.value)}>
                <option value="NAME">By name</option>
                <option value="CONFIRMED">By confirmed</option>
                <option value="DEATHS">By deaths</option>
                <option value="RECOVERED">By recovered</option>
            </select>
        </div>
    )
}

export default SearchBar
