import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "../../../Atoms/Button";
import { uiActions } from "../../../../store";
import { CANDIDATES_PER_PAGE } from "../../../../constants";
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
  const { previousURL, nextURL, totalCount } = useSelector((state) => state.ui);
  const { isAppLoading: isLoading } = useSelector((state) => state.loading);

  const totalPages = Math.ceil(totalCount / CANDIDATES_PER_PAGE);

  let currentPage = totalPages;

  if (nextURL) {
    const url = new URL(nextURL);
    const page = new URLSearchParams(url.search).get("page");
    currentPage = +page - 1;
  }

  const progressPercentage = totalPages ? (currentPage / totalPages) * 100 : 0;

  /**
   * Handles the page click event for pagination by enabling refetch and updating the refetch URL.
   *
   * @param {string} url - The URL to be used for refetching data.
   */
  const handlePageClick = async (url) => {
    dispatch(uiActions.enableRefetch());
    dispatch(uiActions.updateRefetchURL(url));
  };

  return (
    <nav className={classes.pagination}>
      <Button
        onClick={() => handlePageClick(previousURL)}
        disabled={!previousURL || isLoading}
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
        onClick={() => handlePageClick(nextURL)}
        disabled={!nextURL || isLoading}
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
