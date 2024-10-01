import { useContext, useRef } from "react";
import { DataContext } from "../../../../store";
import { handleSearchClick } from "../../../../utilities";
import { content } from "../../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.css";

/**
 * Search component for filtering data based on search text.
 * @returns {JSX.Element} The rendered search component.
 */
const Search = ({ enableSearch }) => {
  const searchTextRef = useRef("");
  const { candidateData, onFilteredDataChange } = useContext(DataContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchClick(
      searchTextRef.current.value,
      candidateData,
      onFilteredDataChange
    );
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
export default Search;
