import React, { useContext, useRef } from "react";
import Button from "../../Atoms/Button";
import { DataContext } from "../../../store/DataContextProvider";
import { data } from "../../../sample";
import { handleSearchClick } from "../../../utilities";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

/**
 * Search component for filtering data based on search text.
 * @returns {JSX.Element} The rendered search component.
 */
const Search = () => {
  const searchTextRef = useRef("");
  const { onFilteredDataChange } = useContext(DataContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchClick(searchTextRef.current.value, data, onFilteredDataChange);
  };

  return (
    <aside className={styles.search}>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Search..." ref={searchTextRef} />
        <Button type="submit" title="Search" className={styles.searchButton}>
          <i className="bi bi-search"></i>
        </Button>
      </form>
    </aside>
  );
};

Search.displayName = "Search";
export default Search;
