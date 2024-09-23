import React, { useState } from "react";
import PropTypes from "prop-types";
import { data } from "../../../sample";
import { handleSearchClick } from "../../../utilities";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

/**
 * Search component for filtering data based on search text.
 * @param {Object} props - Component properties.
 * @param {Function} props.onFilteredDataChange - Callback to update the filtered data based on search results.
 * @returns {JSX.Element} The rendered search component.
 */
const Search = ({ onFilteredDataChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick(searchText, data, onFilteredDataChange);
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={() =>
          handleSearchClick(searchText, data, onFilteredDataChange)
        }
        title="Search"
      >
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};

// Define prop types for the component
Search.propTypes = {
  onFilteredDataChange: PropTypes.func.isRequired,
};

Search.displayName = "Search";
export default Search;
