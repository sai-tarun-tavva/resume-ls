import React from "react";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import Search from "./Search";
import styles from "./index.module.css";
import Logout from "./LogOut";

/**
 * Operations component provides search and pagination functionalities.
 * @returns {JSX.Element} The rendered operations component.
 */
const Operations = () => {
  const location = useLocation();
  const enableOperations = location.pathname === "/candidates";

  return (
    <section className={styles.operations}>
      <Search enableSearch={enableOperations} />
      <Pagination enablePagination={enableOperations} />
      <Logout />
    </section>
  );
};

Operations.displayName = "Operations";
export default Operations;
