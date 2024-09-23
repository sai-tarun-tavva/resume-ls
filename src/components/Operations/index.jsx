import React from "react";
import Pagination from "./Pagination";
import Upload from "./Upload";
import Search from "./Search";
import styles from "./index.module.css";
import Logout from "./LogOut";

/**
 * Operations component provides search and pagination functionalities.
 * @returns {JSX.Element} The rendered operations component.
 */
const Operations = () => {
  return (
    <div className={styles.operations}>
      <Search />
      <Upload />
      <Pagination />
      <Logout />
    </div>
  );
};

Operations.displayName = "Operations";
export default Operations;
