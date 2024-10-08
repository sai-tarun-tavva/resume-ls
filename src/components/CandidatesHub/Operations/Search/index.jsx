import { useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { uiActions } from "../../../../store";
import { buildFetchCandidatesUrl } from "../../../../utilities";
import { CANDIDATES_PER_PAGE, CONTENT } from "../../../../constants";
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

  /**
   * Handles the form submission event.
   * Prevents default behavior and update refetch and search term redux state.
   *
   * @param {Object} e - The event object.
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const searchText = searchTextRef.current.value;
    dispatch(uiActions.enableRefetch());
    dispatch(
      uiActions.updateRefetchURL(
        buildFetchCandidatesUrl(searchText, CANDIDATES_PER_PAGE)
      )
    );
    dispatch(uiActions.updateSearchTerm(searchText));
  };

  return (
    <aside className={classes.search}>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder={CONTENT.candidateHub.operations.search.placeholder}
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
