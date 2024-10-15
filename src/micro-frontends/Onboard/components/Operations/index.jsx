import { useLocation } from "react-router-dom";
import Header from "../../../Atoms/components/Header";
import Logo from "../../../Atoms/components/Logo";
import Search from "../../../Atoms/components/Search";
import Logout from "../../../Atoms/components/LogOut";
import { CONTENT, ROUTES } from "../../../../constants";

/**
 * Operations Component
 *
 * Provides search functionality on the onboarding candidates page.
 *
 * @returns {JSX.Element} The rendered Operations component.
 */
const Operations = () => {
  const location = useLocation();
  const {
    logoSuffix,
    logo,
    search: { placeholder },
  } = CONTENT.ONBOARD.operations;
  const enableOperations = location.pathname === `/${ROUTES.ONBOARD.HOME}`;

  /**
   * Handles the search on submit event.
   * Update refetch and search term redux state.
   */
  const handleSearch = (searchText) => {
    console.log(searchText);
  };

  return (
    <Header>
      <Logo
        logoIcon={"bi bi-clipboard-check"}
        logoSuffix={logoSuffix}
        logoText={logo}
      />
      <Search
        enableSearch={enableOperations}
        placeholder={placeholder}
        onSubmit={handleSearch}
      />
      <Logout />
    </Header>
  );
};

Operations.displayName = "Operations";
export default Operations;
