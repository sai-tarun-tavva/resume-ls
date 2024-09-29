import { useLocation } from "react-router-dom";
import Search from "./Search";
import Pagination from "./Pagination";
import Logout from "./LogOut";
import classes from "./index.module.css";

/**
 * Operations component provides search and pagination functionalities.
 * @returns {JSX.Element} The rendered operations component.
 */
const Operations = () => {
  const location = useLocation();
  const enableOperations = location.pathname === "/candidates";

  return (
    <section className={classes.operations}>
      <Search enableSearch={enableOperations} />
      <Pagination enablePagination={enableOperations} />
      <Logout />
    </section>
  );
};

Operations.displayName = "Operations";
export default Operations;
