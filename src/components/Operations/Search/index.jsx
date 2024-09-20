import React, { useState } from "react";
import PropTypes from "prop-types";
import { data } from "../../../sample";

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

  const handleSearchClick = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filteredResults = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerCaseSearchText) ||
        item.phone_numbers.includes(lowerCaseSearchText) ||
        item.email.toLowerCase().includes(lowerCaseSearchText) ||
        item.location.toLowerCase().includes(lowerCaseSearchText) ||
        item.region.toLowerCase().includes(lowerCaseSearchText) ||
        item.linkedin.toLowerCase().includes(lowerCaseSearchText) ||
        item.skills.toLowerCase().includes(lowerCaseSearchText) ||
        item.total_experience.toString().includes(lowerCaseSearchText)
      );
    });
    onFilteredDataChange(filteredResults);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

// Define prop types for the component
Search.propTypes = {
  onFilteredDataChange: PropTypes.func.isRequired,
};

Search.displayName = "Search";
export default Search;
