import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../../Atoms/Button";
import { DataContext } from "../../../../store";
import { ITEMS_PER_PAGE } from "../../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.scss";

/**
 * Pagination Component
 *
 * For navigating through paginated data.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.enablePagination - Determines if pagination is enabled.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = ({ enablePagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { onStartIndexChange, filteredCandidateData } = useContext(DataContext);
  const totalItems = filteredCandidateData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    // Re-initiate current page to 1 whenever filtered data updates
    setCurrentPage(1);
  }, [filteredCandidateData]);

  /**
   * Handles page click event to change the current page.
   * Ensures the page number is within a valid range and updates the start index.
   *
   * @param {number} page - The page number to navigate to.
   */
  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    onStartIndexChange(startIndex);
  };

  const progressPercentage = totalPages ? (currentPage / totalPages) * 100 : 0;

  return (
    <nav className={classes.pagination}>
      <Button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1 || !enablePagination}
        title="Previous"
        className={classes.prevButton}
      >
        <i className="bi bi-arrow-left-short"></i>
      </Button>
      <span>
        {currentPage} of {totalPages}
        <div className={classes.progressContainer}>
          <div
            className={classes.progressBar}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </span>
      <Button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages || !enablePagination}
        title="Next"
        className={classes.nextButton}
      >
        <i className="bi bi-arrow-right-short"></i>
      </Button>
    </nav>
  );
};

Pagination.displayName = "Pagination";

Pagination.propTypes = {
  enablePagination: PropTypes.bool.isRequired,
};

export default Pagination;
