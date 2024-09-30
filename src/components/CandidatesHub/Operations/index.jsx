import { useLocation } from "react-router-dom";
import Search from "./Search";
import Pagination from "./Pagination";
import Logout from "./LogOut";
import Logo from "../../../assets/logo.png";
import { content, ROUTES } from "../../../constants";
import classes from "./index.module.css";

/**
 * Operations component provides search and pagination functionalities.
 * @returns {JSX.Element} The rendered operations component.
 */
const Operations = () => {
  const location = useLocation();
  const enableOperations = location.pathname === `/${ROUTES.HOME}`;

  return (
    <header className={classes.operations}>
      <div className={classes.logo}>
        <img src={Logo} alt={"Logisoft logo"} />
        <p>{content.candidateHub.operations.headerParagraph}</p>
      </div>

      <Search enableSearch={enableOperations} />
      <Pagination enablePagination={enableOperations} />
      <Logout />
    </header>
  );
};

Operations.displayName = "Operations";
export default Operations;
