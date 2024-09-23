import React, { useRef } from "react";
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
  const searchTextRef = useRef("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchClick(searchTextRef.current.value, data, onFilteredDataChange);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Search..." ref={searchTextRef} />
        <button type="submit" title="Search">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};

// Define prop types for the component
Search.propTypes = {
  onFilteredDataChange: PropTypes.func.isRequired,
};

Search.displayName = "Search";
export default Search;
