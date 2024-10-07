import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { dataActions, uiActions } from "../../../../store";
import { handleSearchClick } from "../../../../utilities";
import { CONTENT } from "../../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.scss";

/**
 * Search Component
 *
 * Filters data based on search text with debouncing to optimize performance.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.enableSearch - Determines if the search input is enabled.
 * @returns {JSX.Element} The rendered search component.
 */
const Search = ({ enableSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // using useState instead of useRef
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.data);

  // Debounce search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filteredResults = handleSearchClick(searchTerm, candidates);
      dispatch(dataActions.replaceFilteredCandidates(filteredResults));
      dispatch(uiActions.updateSearchTerm(searchTerm));
      dispatch(uiActions.updateStartIndex(0)); // Reset startIndex to 0 after filter
    }, 300); // Adjust debounce delay as needed

    return () => clearTimeout(delayDebounceFn); // Clear the timeout if searchTerm changes before delay ends
  }, [searchTerm, candidates, dispatch]);

  /**
   * Handles the search input change event.
   * Updates the search term state.
   *
   * @param {Object} event - The event object.
   */
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <aside className={classes.search}>
      <input
        type="text"
        placeholder={CONTENT.candidateHub.operations.search.placeholder}
        value={searchTerm}
        disabled={!enableSearch}
        onChange={handleInputChange}
      />
      <span className={classes.rightIcon}>
        <i className="bi bi-search"></i>
      </span>
    </aside>
  );
};

Search.displayName = "Search";

Search.propTypes = {
  enableSearch: PropTypes.bool.isRequired,
};

export default Search;
