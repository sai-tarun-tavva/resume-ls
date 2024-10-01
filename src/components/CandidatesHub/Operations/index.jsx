import { useLocation } from "react-router-dom";
import Search from "./Search";
import Pagination from "./Pagination";
import Logout from "./LogOut";
import Logo from "../../../assets/logo.png";
import { content, ROUTES } from "../../../constants";
import classes from "./index.module.scss";

/**
 * Operations Component
 *
 * Provides search and pagination functionalities on the operations page.
 *
 * @returns {JSX.Element} The rendered Operations component.
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
