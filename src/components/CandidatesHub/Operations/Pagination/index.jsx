import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "../../../Atoms/Button";
import { uiActions } from "../../../../store";
import "bootstrap-icons/font/bootstrap-icons.css";
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
  const { previousURL, nextURL } = useSelector((state) => state.ui);
  const { isAppLoading: isLoading } = useSelector((state) => state.loading);

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
