import React from "react";
import PropTypes from "prop-types";
import "../styles/FilterBar.css";

function FilterBar({ filters, activeFilter, onFilterClick, title }) {
  
    return (
      <div className="filterBar expanded">
        <div className="filterOptions expanded">
          {filters.map((filter) => (
            <div
              key={filter}
              className={`filterOption ${
                activeFilter === filter ? "active" : ""
              } expanded`}
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
