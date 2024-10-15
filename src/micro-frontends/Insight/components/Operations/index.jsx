import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Search from "./Search";
import Pagination from "./Pagination";
import Logout from "./LogOut";
import { handleLogout as logout } from "../../../../utilities";
import { ROUTES } from "../../../../constants";
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
  const navigate = useNavigate();
  const enableOperations = location.pathname === `/${ROUTES.HOME}`;

  const handleLogout = () => {
    logout();
    navigate(`/${ROUTES.AUTH}`);
  };

  return (
    <header className={classes.operations}>
      <Logo />
      <Search enableSearch={enableOperations} />
      <Pagination enablePagination={enableOperations} />
      <Logout onLogout={handleLogout} />
    </header>
  );
};

Operations.displayName = "Operations";
export default Operations;
