import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { dataActions, uiActions } from "../../../../store";
import { handleSearchClick } from "../../../../utilities";
import { content } from "../../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.scss";

/**
 * Search Component
 *
 * Filters data based on search text.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.enableSearch - Determines if the search input is enabled.
 * @returns {JSX.Element} The rendered search component.
 */
const Search = ({ enableSearch }) => {
  const searchTextRef = useRef("");
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.data);

  /**
   * Handles the form submission event.
   * Prevents default behavior and calls the search handler with input value.
   *
   * @param {Object} e - The event object.
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const filteredResults = handleSearchClick(
      searchTextRef.current.value,
      candidates
    );

    dispatch(dataActions.replaceFilteredCandidates(filteredResults));
    dispatch(uiActions.updateStartIndex(0)); // Reset startIndex to 0 after filter
  };

  return (
    <aside className={classes.search}>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder={content.candidateHub.operations.search.placeholder}
          ref={searchTextRef}
          disabled={!enableSearch}
        />
        <span className={classes.rightIcon}>
          <i className="bi bi-search"></i>
        </span>
      </form>
    </aside>
  );
};

Search.displayName = "Search";

Search.propTypes = {
  enableSearch: PropTypes.bool.isRequired,
};

export default Search;
