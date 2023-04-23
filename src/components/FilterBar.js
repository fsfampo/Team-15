import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/FilterBar.css";

function FilterBar({ filters, activeFilter, onFilterClick, title }) {
    const [expanded, setExpanded] = useState(false);
  
    const handleButtonClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <div className={`filterBar ${expanded ? "expanded" : ""}`}>
        <button className="filterButton" onClick={handleButtonClick}>
          Filters
        </button>
        <div className={`filterOptions ${expanded ? "expanded" : ""}`}>
          {filters.map((filter) => (
            <div
              key={filter}
              className={`filterOption ${
                activeFilter === filter ? "active" : ""
              } ${expanded ? "expanded" : ""}`}
              onClick={() => onFilterClick(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>
    );
  }

FilterBar.propTypes = {
  filters: PropTypes.array.isRequired,
  activeFilter: PropTypes.string,
  onFilterClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default FilterBar;