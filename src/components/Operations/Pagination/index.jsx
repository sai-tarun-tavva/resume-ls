import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const ITEMS_PER_PAGE = 10;

/**
 * Pagination component for navigating through paginated data.
 * @param {Object} props - Component properties.
 * @param {Function} props.onStartIndexChange - Callback to update the start index of the data.
 * @param {Array} props.filteredData - The currently filtered dataset.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = ({ onStartIndexChange, filteredData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Calculate the starting index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    // Update the start index when currentPage or startIndex changes
    onStartIndexChange(startIndex);
  }, [onStartIndexChange, startIndex]);

  const handlePageClick = (page) => {
    // Ensure page number is within valid range
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        title="Previous"
      >
        <i className="bi bi-arrow-left-short"></i>
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        title="Next"
      >
        <i className="bi bi-arrow-right-short"></i>
      </button>
    </div>
  );
};

// Define prop types for the component
Pagination.propTypes = {
  onStartIndexChange: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
};

Pagination.displayName = "Pagination";
export default Pagination;
