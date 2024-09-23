import React, { useContext, useEffect, useState } from "react";
import Button from "../../Atoms/Button";
import { DataContext } from "../../../store/DataContextProvider";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ITEMS_PER_PAGE } from "../../../utilities/constants";
import styles from "./index.module.css";

/**
 * Pagination component for navigating through paginated data.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { onStartIndexChange, candidateData } = useContext(DataContext);

  const totalItems = candidateData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    // re-initiate current page to 1 whenever user clicks on search and filtered data updates
    setCurrentPage(1);
  }, [candidateData]);

  const handlePageClick = (page) => {
    // Ensure page number is within valid range
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    onStartIndexChange(startIndex);
  };

  return (
    <nav className={styles.pagination}>
      <Button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        title="Previous"
        className={styles.prevButton}
      >
        <i className="bi bi-arrow-left-short"></i>
      </Button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        title="Next"
        className={styles.nextButton}
      >
        <i className="bi bi-arrow-right-short"></i>
      </Button>
    </nav>
  );
};

Pagination.displayName = "Pagination";
export default Pagination;
