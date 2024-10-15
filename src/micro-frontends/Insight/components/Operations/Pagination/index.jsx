import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "../../../../Atoms/components/Button";
import { uiActions } from "../../../../../store";
import { buildFetchCandidatesUrl } from "../../../../../utilities";
import { INSIGHT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Pagination Component
 *
 * For navigating through paginated data.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = () => {
  const dispatch = useDispatch();
  const { previousPage, nextPage, totalCount, searchTerm } = useSelector(
    (state) => state.ui
  );
  const { isAppLoading: isLoading } = useSelector((state) => state.loading);
  const { CANDIDATES_PER_PAGE } = INSIGHT;

  const totalPages = Math.ceil(totalCount / CANDIDATES_PER_PAGE);

  let currentPage = totalPages;

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
    const url = buildFetchCandidatesUrl(CANDIDATES_PER_PAGE, page, searchTerm);

    dispatch(uiActions.enableRefetch());
    dispatch(uiActions.updateRefetchURL(url));
  };

  return (
    <nav className={classes.pagination}>
      <Button
        onClick={() => handlePageClick(previousPage)}
        disabled={!previousPage || isLoading}
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
        disabled={!nextPage || isLoading}
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
