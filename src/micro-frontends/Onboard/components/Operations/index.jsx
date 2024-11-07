import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../../Atoms/components/Header";
import Logo from "../../../Atoms/components/Logo";
import Search from "../../../Atoms/components/Search";
import Logout from "../../../Atoms/components/LogOut";
import { uiActions } from "../../store";
import { buildFetchCandidatesUrl } from "../../../../utilities";
import { ONBOARD, CONTENT, END_POINTS, ROUTES } from "../../../../constants";

/**
 * Operations Component
 *
 * Provides search functionality on the onboarding candidates page.
 *
 * @returns {JSX.Element} The rendered Operations component.
 */
const Operations = () => {
  const location = useLocation();
  const dispatch = useDispatch();
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
    dispatch(uiActions.enableRefetch());
    dispatch(
      uiActions.updateRefetchURL(
        buildFetchCandidatesUrl(
          END_POINTS.ONBOARD.FETCH_CANDIDATES,
          ONBOARD.CANDIDATES_PER_PAGE,
          "",
          searchText
        )
      )
    );
    dispatch(uiActions.updateSearchTerm(searchText));
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
