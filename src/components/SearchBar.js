import React, { useState } from 'react';
import "../styles/searchbar.css";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ display: 'inline-block', marginRight: '10px' }} 
      />
      <button style={{ 
          backgroundColor: '#808080', 
          color: 'white', 
          padding: '5px',
          margin: '1px',
          textAlign: 'center', 
          fontSize: '12px', 
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'inline-block',
        }}>Go</button>
    </div>
  );
}

export default SearchBar;