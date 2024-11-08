import { useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

const getTooltipContent = (searchFields) => (
  <div className={classes.tooltip}>
    <div className={classes.tooltipArrow}></div>
    <div className={classes.tooltipContent}>
      <p>Searches by:</p>
      <ul>
        {searchFields.map((field, index) => (
          <li key={index}>
            <span className={classes.bulletPoint}></span>
            {field}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/**
 * Search Component
 *
 * Filters data based on search text with tooltip showing search fields.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.enableSearch - Determines if the search input is enabled.
 * @param {string[]} props.searchFields - Array of searchable fields to display in tooltip
 * @returns {JSX.Element} The rendered search component.
 */
const Search = ({
  enableSearch = true,
  placeholder,
  onSubmit,
  searchFields,
}) => {
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
      <div className={classes.tooltipWrapper}>
        <span className={classes.leftIcon}>
          <i className="bi bi-info-circle-fill" />
        </span>
        {getTooltipContent(searchFields)}
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          ref={searchTextRef}
          disabled={!enableSearch}
        />
        <span className={classes.rightIcon}>
          <i className="bi bi-search" />
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
  searchFields: PropTypes.arrayOf(PropTypes.string),
};

export default Search;
