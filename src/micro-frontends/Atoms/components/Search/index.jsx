import { useRef } from "react";
import PropTypes from "prop-types";
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
const Search = ({ enableSearch = true, placeholder, onSubmit }) => {
  const searchTextRef = useRef("");

  /**
   * Handles the form submission event.
   * Prevents default behavior.
   *
   * @param {Object} e - The event object.
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const searchText = searchTextRef.current.value;
    onSubmit(searchText);
  };

  return (
    <aside className={classes.search}>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder={placeholder}
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
  placeholder: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
