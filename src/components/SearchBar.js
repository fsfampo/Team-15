import React, { useState } from 'react';
import "./searchbar.css";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button style={{ 
          backgroundColor: '#808080', 
          color: 'white', 
          padding: '4px',
          margin: '10px',
          textAlign: 'center', 
          fontSize: '12px', 
          borderRadius: '5px',
          cursor: 'pointer',
        }}>Go</button>
    </div>
  );
}

export default SearchBar;