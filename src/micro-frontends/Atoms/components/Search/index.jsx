import { useRef } from "react";
import PropTypes from "prop-types";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

const { searchTooltipHeader } = CONTENT.COMMON;

/**
 * Renders the tooltip content listing the searchable fields.
 *
 * @param {string[]} searchFields - Array of searchable fields to display.
 * @returns {JSX.Element} The tooltip content element.
 */
const getTooltipContent = (searchFields) => (
  <div className={classes.tooltip}>
    <div className={classes.tooltipArrow}></div>
    <div className={classes.tooltipContent}>
      <p>{searchTooltipHeader}</p>
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
 * Filters data based on search text with a tooltip showing searchable fields.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.enableSearch - Determines if the search input is enabled.
 * @param {string} props.placeholder - Placeholder text for the search input.
 * @param {function} props.onSubmit - Callback function for handling form submission.
 * @param {string[]} props.searchFields - Array of searchable fields to display in the tooltip.
 * @returns {JSX.Element} The rendered Search component.
 */
const Search = ({
  enableSearch = true,
  placeholder,
  onSubmit,
  searchFields = [],
}) => {
  const searchTextRef = useRef("");

  /**
   * Handles the form submission event.
   * Prevents default behavior and triggers the onSubmit callback with search text.
   *
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleFormSubmit = (event) => {
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

Search.propTypes = {
  enableSearch: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  searchFields: PropTypes.arrayOf(PropTypes.string),
};

Search.displayName = "Search";
export default Search;
