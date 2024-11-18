import PropTypes from "prop-types";
import Button from "../Button";
import { useLoading, useUI } from "../../../../store";
import {
  buildFetchCandidatesUrl,
  getStatusesAsJoinedString,
} from "../../../../utilities";
import { LOADING_ACTION_TYPES, PAGES } from "../../../../constants";
import { OPTIONS } from "../../../Onboard/constants";
import classes from "./index.module.scss";

/**
 * Pagination Component
 *
 * Renders controls for navigating through paginated data.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.enablePagination - Flag to enable or disable pagination controls.
 * @param {number} props.previousPage - The previous page number.
 * @param {number} props.nextPage - The next page number.
 * @param {number} props.totalCount - The total number of items available.
 * @param {string} props.searchTerm - The current search term used for filtering.
 * @param {string} props.apiEndpoint - The API endpoint used for fetching data.
 * @param {number} props.countPerPage - Number of items per page.
 * @param {string} props.currentRoute - The current route to determine additional filtering logic.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = ({
  enablePagination,
  previousPage,
  nextPage,
  totalCount,
  searchTerm,
  apiEndpoint,
  countPerPage,
  currentRoute,
}) => {
  const { isLoading } = useLoading();
  const {
    state: { selectedStatuses },
    enableRefetch,
    updateRefetchURL,
  } = useUI();

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
      searchTerm,
      currentRoute === PAGES.INSIGHT
        ? ""
        : getStatusesAsJoinedString(OPTIONS.ONBOARDING_STATUS, selectedStatuses)
    );
    enableRefetch();
    updateRefetchURL(url);
  };

  return (
    <nav className={classes.pagination}>
      <Button
        onClick={() => handlePageClick(previousPage)}
        disabled={!previousPage || isLoading[APP] || !enablePagination}
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
        disabled={!nextPage || isLoading[APP] || !enablePagination}
        title="Next"
        className={classes.nextButton}
      >
        <i className="bi bi-arrow-right-short"></i>
      </Button>
    </nav>
  );
};

Pagination.propTypes = {
  enablePagination: PropTypes.bool.isRequired,
  previousPage: PropTypes.number,
  nextPage: PropTypes.number,
  totalCount: PropTypes.number.isRequired,
  searchTerm: PropTypes.string,
  apiEndpoint: PropTypes.object.isRequired,
  countPerPage: PropTypes.number.isRequired,
  currentRoute: PropTypes.string.isRequired,
};

Pagination.displayName = "Pagination";
export default Pagination;
