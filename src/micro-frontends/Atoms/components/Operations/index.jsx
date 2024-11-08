import { useLocation } from "react-router-dom";
import Header from "../../../Atoms/components/Header";
import Logo from "../../../Atoms/components/Logo";
import Search from "../../../Atoms/components/Search";
import Pagination from "../../../Atoms/components/Pagination";
import Logout from "../../../Atoms/components/LogOut";
import { useUI } from "../../../../store";
import { buildFetchCandidatesUrl } from "../../../../utilities";
import {
  ONBOARD,
  INSIGHT,
  CONTENT,
  END_POINTS,
  ROUTES,
  PAGES,
} from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Operations Component
 *
 * Provides search functionality on the onboarding candidates page.
 *
 * @returns {JSX.Element} The rendered Operations component.
 */
const Operations = ({
  currentPage,
  includeSearch = true,
  includePagination = true,
}) => {
  const location = useLocation();
  const {
    state: {
      pagination: { previousPage, nextPage, totalCount },
      searchTerm,
    },
    enableRefetch,
    updateRefetchURL,
    updateSearchTerm,
  } = useUI();

  let logoIcon, displayContent, enableOpsRoute, apiEndpoint, candidatesPerPage;

  switch (currentPage) {
    case PAGES.INSIGHT:
      logoIcon = "bi bi-zoom-in";
      displayContent = CONTENT.INSIGHT.operations;
      enableOpsRoute = ROUTES.INSIGHT.HOME;
      apiEndpoint = END_POINTS.INSIGHT.FETCH_CANDIDATES;
      candidatesPerPage = INSIGHT.CANDIDATES_PER_PAGE;
      break;
    case PAGES.ONBOARD:
      logoIcon = "bi bi-clipboard-check";
      displayContent = CONTENT.ONBOARD.operations;
      enableOpsRoute = ROUTES.ONBOARD.HOME;
      apiEndpoint = END_POINTS.ONBOARD.FETCH_CANDIDATES;
      candidatesPerPage = ONBOARD.CANDIDATES_PER_PAGE;
      break;
    case PAGES.SPARK:
      logoIcon = "bi bi-lightning-charge-fill";
      displayContent = CONTENT.SPARK.operations;
      break;
    default:
      break;
  }

  const { logoSuffix, logo } = displayContent;
  const searchPlaceholder = displayContent?.search?.placeholder;
  const enableOperations = location.pathname === `/${enableOpsRoute}`;

  /**
   * Handles the search on submit event.
   * Update refetch and search term redux state.
   */
  const handleSearch = (searchText) => {
    enableRefetch();
    updateRefetchURL(
      buildFetchCandidatesUrl(apiEndpoint, candidatesPerPage, "", searchText)
    );
    updateSearchTerm(searchText);
  };

  return (
    <Header>
      <Logo logoIcon={logoIcon} logoSuffix={logoSuffix} logoText={logo} />
      {includeSearch && (
        <Search
          enableSearch={enableOperations}
          placeholder={searchPlaceholder}
          onSubmit={handleSearch}
        />
      )}
      {includePagination && (
        <Pagination
          enablePagination={enableOperations}
          previousPage={previousPage}
          nextPage={nextPage}
          totalCount={totalCount}
          searchTerm={searchTerm}
          countPerPage={candidatesPerPage}
          apiEndpoint={apiEndpoint}
        />
      )}
      <Logout
        className={
          !includeSearch && !includePagination ? classes.logoutExtraClass : ""
        }
      />
    </Header>
  );
};

Operations.displayName = "Operations";
export default Operations;
