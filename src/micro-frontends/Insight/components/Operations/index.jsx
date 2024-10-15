import { useLocation } from "react-router-dom";
import Header from "../../../Atoms/components/Header";
import Logo from "../../../Atoms/components/Logo";
import Logout from "../../../Atoms/components/LogOut";
import Search from "./Search";
import Pagination from "./Pagination";
import { CONTENT, ROUTES } from "../../../../constants";

/**
 * Operations Component
 *
 * Provides search and pagination functionalities on the operations page.
 *
 * @returns {JSX.Element} The rendered Operations component.
 */
const Operations = () => {
  const location = useLocation();
  const enableOperations = location.pathname === `/${ROUTES.INSIGHT.HOME}`;
  const { logoSuffix, logo } = CONTENT.INSIGHT.operations;

  return (
    <Header>
      <Logo
        logoIcon={"bi bi-zoom-in"}
        logoSuffix={logoSuffix}
        logoText={logo}
      />
      <Search enableSearch={enableOperations} />
      <Pagination enablePagination={enableOperations} />
      <Logout />
    </Header>
  );
};

Operations.displayName = "Operations";
export default Operations;
