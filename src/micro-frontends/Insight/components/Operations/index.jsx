import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../../Atoms/components/Header";
import Logo from "../../../Atoms/components/Logo";
import Logout from "../../../Atoms/components/LogOut";
import Search from "../../../Atoms/components/Search";
import Pagination from "./Pagination";
import { uiActions } from "../../store";
import { buildFetchCandidatesUrl } from "../../../../utilities";
import { CONTENT, END_POINTS, INSIGHT, ROUTES } from "../../../../constants";

/**
 * Operations Component
 *
 * Provides search and pagination functionalities on the operations page.
 *
 * @returns {JSX.Element} The rendered Operations component.
 */
const Operations = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const enableOperations = location.pathname === `/${ROUTES.INSIGHT.HOME}`;
  const {
    logoSuffix,
    logo,
    search: { placeholder },
  } = CONTENT.INSIGHT.operations;

  const { CANDIDATES_PER_PAGE } = INSIGHT;

  /**
   * Handles the search on submit event.
   * Update refetch and search term redux state.
   */
  const handleSearch = (searchText) => {
    dispatch(uiActions.enableRefetch());
    dispatch(
      uiActions.updateRefetchURL(
        buildFetchCandidatesUrl(
          END_POINTS.INSIGHT.FETCH_CANDIDATES,
          CANDIDATES_PER_PAGE,
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
        logoIcon={"bi bi-zoom-in"}
        logoSuffix={logoSuffix}
        logoText={logo}
      />
      <Search
        enableSearch={enableOperations}
        placeholder={placeholder}
        onSubmit={handleSearch}
      />
      <Pagination enablePagination={enableOperations} />
      <Logout />
    </Header>
  );
};

Operations.displayName = "Operations";
export default Operations;
