import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://gojim-backend.eastasia.cloudapp.azure.com/content', {
        params: { search_term: searchQuery },
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const workouts = response.data.result;
      navigate("/search", { state: { workouts, searchQuery }});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ display: 'inline-block', marginRight: '10px', borderRadius: '12px', height: '20px'}} 
      />
      <button 
        onClick={handleSearch}
        style={{ 
          backgroundColor: '#808080', 
          color: 'white', 
          padding: '5px',
          margin: '1px',
          textAlign: 'center', 
          fontSize: '12px', 
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'inline-block',
        }}
      >
        Go
      </button>
    </div>
  );
}

export default SearchBar;
