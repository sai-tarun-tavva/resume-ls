import React from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import Search from "./Search";

/**
 * Operations component provides search and pagination functionalities.
 * @param {Object} props - Component properties.
 * @param {Function} props.onFilteredDataChange - Callback to handle filtered data changes.
 * @param {Function} props.onStartIndexChange - Callback to handle starting index changes.
 * @param {Array} props.filteredData - The currently filtered dataset.
 * @returns {JSX.Element} The rendered operations component.
 */
const Operations = ({
  onFilteredDataChange,
  onStartIndexChange,
  filteredData,
}) => {
  return (
    <div className="operations">
      {/* Search component for filtering data */}
      <Search onFilteredDataChange={onFilteredDataChange} />
      {/* Pagination component for navigating through data */}
      <Pagination
        onStartIndexChange={onStartIndexChange}
        filteredData={filteredData}
      />
    </div>
  );
};

// Define prop types for the component
Operations.propTypes = {
  onFilteredDataChange: PropTypes.func.isRequired,
  onStartIndexChange: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
};

Operations.displayName = "Operations";
export default Operations;
