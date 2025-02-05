import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Header from "../../../Atoms/components/Header";
import Logo from "../../../Atoms/components/Logo";
import Search from "../../../Atoms/components/Search";
import Pagination from "../../../Atoms/components/Pagination";
import Profile from "../Profile";
import Logout from "../../../Atoms/components/LogOut";
import { useUI } from "../../../../store";
import {
  buildFetchCandidatesUrl,
  getStatusesAsJoinedString,
} from "../../../../utilities";
import { OPTIONS as ONBOARD_OPTIONS } from "../../../Onboard/constants";
import { OPTIONS as FORGE_OPTIONS } from "../../../Forge/constants";
import {
  ONBOARD,
  FORGE,
  CONTENT,
  END_POINTS,
  ROUTES,
  PAGES,
} from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Operations Component
 *
 * Provides search and pagination functionality for candidate pages.
 *
 * @param {Object} props - The component props.
 * @param {string} props.currentPage - Indicates the current page context.
 * @param {string} props.count - Indicates the count to be displayed.
 * @param {boolean} [props.includeSearch=true] - Whether to include the search functionality.
 * @param {boolean} [props.includePagination=true] - Whether to include pagination functionality.
 * @param {JSX.Element} [props.extraOps] - Additional operations specific to the product.
 * @returns {JSX.Element} The Operations component.
 */
const Operations = ({
  currentPage,
  count,
  includeSearch = true,
  includePagination = true,
  extraOps,
}) => {
  const location = useLocation();
  const formType = location.pathname.split("/")[3];

  const {
    state: {
      pagination: { previousPage, nextPage, totalCount },
      searchTerm,
      candidatesPerPage: perPage,
      selectedStatuses,
    },
    enableRefetch,
    updateRefetchURL,
    updateSearchTerm,
  } = useUI();

  let logoIcon,
    displayContent,
    enableOpsRoute,
    apiEndpoint,
    candidatesPerPage,
    statusOptions = [];

  switch (currentPage) {
    case PAGES.INSIGHT:
      logoIcon = "bi bi-zoom-in";
      displayContent = CONTENT.INSIGHT.operations;
      enableOpsRoute = ROUTES.INSIGHT.HOME;
      apiEndpoint = END_POINTS.INSIGHT.FETCH_CANDIDATES;
      candidatesPerPage = perPage;
      break;
    case PAGES.ONBOARD:
      logoIcon = "bi bi-clipboard-check";
      displayContent = CONTENT.ONBOARD.operations;
      enableOpsRoute = ROUTES.ONBOARD.HOME;
      apiEndpoint = END_POINTS.ONBOARD.FETCH_CANDIDATES;
      candidatesPerPage = ONBOARD.CANDIDATES_PER_PAGE;
      statusOptions = ONBOARD_OPTIONS.ONBOARDING_STATUS;
      break;
    case PAGES.SPARK:
      logoIcon = "bi bi-lightning-charge";
      displayContent = CONTENT.SPARK.operations;
      break;
    case PAGES.QUEST:
      logoIcon = "bi bi-bullseye";
      displayContent = CONTENT.QUEST.operations;
      break;
    case PAGES.FORGE:
      logoIcon = "bi bi-nut";
      displayContent = CONTENT.FORGE.operations;
      enableOpsRoute = `${ROUTES.FORGE.HOME}/${formType}`;
      apiEndpoint =
        END_POINTS.FORGE[(formType || ROUTES.FORGE.SALES.VIEW).toUpperCase()]
          .FETCH_RECORDS;
      candidatesPerPage = FORGE.CANDIDATES_PER_PAGE;
      statusOptions = FORGE_OPTIONS.SUBMISSION_STATUS;
      break;
    case PAGES.NEXUS:
      logoIcon = "bi bi-link-45deg";
      displayContent = CONTENT.NEXUS.operations;
      break;
    default:
      break;
  }

  const { logoSuffix, logo } = displayContent;
  const searchPlaceholder = displayContent?.search?.placeholder;
  let searchFields = displayContent?.search?.searchFields;

  if (currentPage === PAGES.FORGE)
    searchFields = displayContent?.search?.searchFields[formType];

  const totalCountText = displayContent?.countInfo;
  const enableOperations = location.pathname === `/${enableOpsRoute}`;
  const displayCount = [PAGES.ONBOARD, PAGES.FORGE].includes(currentPage);

  /**
   * Handles the search on submit event.
   * Updates refetch and search term in state.
   */
  const handleSearch = (searchText) => {
    enableRefetch();
    updateRefetchURL(
      buildFetchCandidatesUrl(
        apiEndpoint,
        candidatesPerPage,
        "",
        searchText,
        currentPage === PAGES.INSIGHT
          ? ""
          : getStatusesAsJoinedString(
              statusOptions,
              selectedStatuses[currentPage]
            )
      )
    );
    updateSearchTerm(searchText);
  };

  return (
    <Header>
      <div className={classes.logoContainer}>
        <Logo logoIcon={logoIcon} logoSuffix={logoSuffix} logoText={logo} />
        {displayCount && (
          <div className={classes.countInfo}>
            <span className={classes.text}>{totalCountText}</span>
            <span className={classes.count}>{count}</span>
          </div>
        )}
      </div>
      {includeSearch && (
        <Search
          enableSearch={enableOperations}
          placeholder={searchPlaceholder}
          onSubmit={handleSearch}
          searchFields={searchFields}
        />
      )}
      {includePagination && (
        <Pagination
          enablePagination={enableOperations}
          previousPage={+previousPage}
          nextPage={+nextPage}
          totalCount={totalCount}
          searchTerm={searchTerm}
          countPerPage={candidatesPerPage}
          currentRoute={currentPage}
          apiEndpoint={apiEndpoint}
        />
      )}
      <div
        className={classes.extraOpsLogoutContainer}
        style={{
          marginLeft: includeSearch || includePagination ? "unset" : "auto",
        }}
      >
        {extraOps}
        <Profile />
        <Logout
          className={
            !includeSearch && !includePagination ? classes.logoutExtraClass : ""
          }
        />
      </div>
    </Header>
  );
};

Operations.propTypes = {
  currentPage: PropTypes.string.isRequired,
  count: PropTypes.number,
  includeSearch: PropTypes.bool,
  includePagination: PropTypes.bool,
  extraOps: PropTypes.node,
};

Operations.displayName = "Operations";
export default Operations;
