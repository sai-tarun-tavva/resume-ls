import { useContext, useEffect, useState } from "react";
import Button from "../../../Atoms/Button";
import { DataContext } from "../../../../store";
import { ITEMS_PER_PAGE } from "../../../../utilities";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.css";

/**
 * Pagination component for navigating through paginated data.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = ({ enablePagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { onStartIndexChange, filteredCandidateData } = useContext(DataContext);

  const totalItems = filteredCandidateData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    // re-initiate current page to 1 whenever user clicks on search and filtered data updates
    setCurrentPage(1);
  }, [filteredCandidateData]);

  const handlePageClick = (page) => {
    // Ensure page number is within valid range
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
export default Pagination;
