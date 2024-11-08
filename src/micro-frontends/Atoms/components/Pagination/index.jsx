import PropTypes from "prop-types";
import Button from "../Button";
import { useLoading, useUI } from "../../../../store";
import { buildFetchCandidatesUrl } from "../../../../utilities";
import { LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Pagination Component
 *
 * For navigating through paginated data.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = ({
  previousPage,
  nextPage,
  totalCount,
  searchTerm,
  countPerPage,
  apiEndpoint,
}) => {
  const { isLoading } = useLoading();
  const { enableRefetch, updateRefetchURL } = useUI();

  const totalPages = Math.ceil(totalCount / countPerPage);

  let currentPage = totalPages;
  const { APP } = LOADING_ACTION_TYPES;

  if (nextPage) {
    currentPage = +nextPage - 1;
  }

  const progressPercentage = totalPages ? (currentPage / totalPages) * 100 : 0;

  /**
   * Handles the page click event for pagination by enabling refetch and updating the refetch URL.
   *
   * @param {string} page - The page number to be used for refetching data.
   */
  const handlePageClick = async (page) => {
    const url = buildFetchCandidatesUrl(
      apiEndpoint,
      countPerPage,
      page,
      searchTerm
    );
    enableRefetch();
    updateRefetchURL(url);
  };

  return (
    <nav className={classes.pagination}>
      <Button
        onClick={() => handlePageClick(previousPage)}
        disabled={!previousPage || isLoading[APP]}
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
        onClick={() => handlePageClick(nextPage)}
        disabled={!nextPage || isLoading[APP]}
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
