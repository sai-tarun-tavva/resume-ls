import { createContext, useCallback, useContext, useReducer } from "react";
import { INSIGHT, UI_ACTION_TYPES } from "../constants";

const {
  UPDATE_SEARCH_TERM,
  UPDATE_PAGINATION,
  UPDATE_REFETCH_URL,
  ENABLE_REFETCH,
  DISABLE_REFETCH,
  UPDATE_CANDIDATES_PER_PAGE,
  UPDATE_SELECTED_STATUSES,
  SHOW_SIDE_BAR,
  HIDE_SIDE_BAR,
  UPDATE_SIDE_BAR_RECORD_ID,
  UPDATE_USERNAMES,
  RESET_ALL,
} = UI_ACTION_TYPES;

// Initial state for the UI context
/**
 * @type {Object}
 * @property {Object} pagination - Stores pagination details like previous, next page and total count.
 * @property {number} candidatesPerPage - Number of candidates displayed per page.
 * @property {string} searchTerm - Search term for filtering candidates.
 * @property {Object} selectedStatuses - Selected statuses for filtering candidates for Onboard and Forge.
 * @property {boolean} refetch - Flag to determine whether to re-fetch the candidates.
 * @property {string} refetchURL - URL to refetch the candidates data.
 * @property {boolean} isSideBarVisible - Flag to control sidebar visibility.
 * @property {string} sideBarRecordId - Record ID for displaying sidebar status history.
 * @property {string} usernames - Usernames for displaying in dropdown of Forge form.
 */
const initialState = {
  pagination: {
    previousPage: "",
    nextPage: "",
    totalCount: 0,
  },
  candidatesPerPage: INSIGHT.CANDIDATES_PER_PAGE,
  searchTerm: "",
  selectedStatuses: {
    onboard: {
      inProgress: true,
      yetToReview: true,
      underReview: true,
      onboarded: true,
      marketing: true,
      placed: true,
    },
    forge: {
      submitted: true,
      interviewed: true,
      noResponse: true,
      hold: true,
      selected: true,
      rejected: true,
    },
  },
  refetch: false,
  refetchURL: "",
  isSideBarVisible: false,
  sideBarRecordId: "",
  usernames: [],
};

// Creating the UI context
/**
 * UIContext - Context for managing UI state.
 */
const UIContext = createContext(initialState);

/**
 * Reducer function to handle UI state actions
 *
 * @param {Object} state - The current state of the UI.
 * @param {Object} action - The dispatched action with type and optional payload.
 * @param {string} action.type - The type of action (e.g., UPDATE_SEARCH_TERM).
 * @param {Object} [action.payload] - The new values for the specified action.
 * @returns {Object} - The updated state based on the action type.
 */
const uiReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SEARCH_TERM:
      return { ...state, searchTerm: payload };
    case UPDATE_PAGINATION:
      return { ...state, pagination: payload };
    case UPDATE_REFETCH_URL:
      return { ...state, refetchURL: payload };
    case ENABLE_REFETCH:
      return { ...state, refetch: true };
    case DISABLE_REFETCH:
      return { ...state, refetch: false };
    case UPDATE_CANDIDATES_PER_PAGE:
      return { ...state, candidatesPerPage: payload };
    case UPDATE_SELECTED_STATUSES:
      const { tool, status } = payload;
      return {
        ...state,
        selectedStatuses: {
          ...state.selectedStatuses,
          [tool]: {
            ...state.selectedStatuses[tool],
            [status]: !state.selectedStatuses[tool][status],
          },
        },
      };
    case SHOW_SIDE_BAR:
      return { ...state, isSideBarVisible: true };
    case HIDE_SIDE_BAR:
      return { ...state, isSideBarVisible: false };
    case UPDATE_SIDE_BAR_RECORD_ID:
      return { ...state, sideBarRecordId: payload };
    case UPDATE_USERNAMES:
      return { ...state, usernames: payload };
    case RESET_ALL:
      return { ...initialState, usernames: state.usernames, refetch: true };
    default:
      return state;
  }
};

/**
 * UIContextProvider Component
 *
 * Provides a context for managing UI state, including functions to update search term,
 * pagination, refetch URL, and to enable/disable refetch.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will access the UI context.
 * @returns {JSX.Element} The provider component with UI state and actions.
 */
const UIContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  /**
   * Updates the search term used for filtering data.
   * @param {string} searchTerm - The new search term.
   */
  const updateSearchTerm = useCallback((searchTerm) => {
    dispatch({ type: UPDATE_SEARCH_TERM, payload: searchTerm });
  }, []);

  /**
   * Updates pagination details such as previous and next pages.
   * @param {Object} pagination - The pagination object with previousPage, nextPage, and totalCount.
   */
  const updatePagination = useCallback((pagination) => {
    dispatch({ type: UPDATE_PAGINATION, payload: pagination });
  }, []);

  /**
   * Updates the URL used for refetching data.
   * @param {string} refetchURL - The new refetch URL.
   */
  const updateRefetchURL = useCallback((refetchURL) => {
    dispatch({ type: UPDATE_REFETCH_URL, payload: refetchURL });
  }, []);

  /**
   * Enables the refetch flag to trigger data refetching.
   */
  const enableRefetch = useCallback(() => {
    dispatch({ type: ENABLE_REFETCH });
  }, []);

  /**
   * Disables the refetch flag to prevent unnecessary data refetching.
   */
  const disableRefetch = useCallback(() => {
    dispatch({ type: DISABLE_REFETCH });
  }, []);

  /**
   * Updates the number of candidates displayed per page.
   * @param {number} candidatesPerPage - The new number of candidates per page.
   */
  const updateCandidatesPerPage = useCallback((candidatesPerPage) => {
    dispatch({ type: UPDATE_CANDIDATES_PER_PAGE, payload: candidatesPerPage });
  }, []);

  /**
   * Updates the selected statuses used for filtering data.
   * @param {string} payload - The payload that has tool and status to be updated.
   */
  const updateSelectedStatuses = useCallback((payload) => {
    dispatch({ type: UPDATE_SELECTED_STATUSES, payload });
  }, []);

  /**
   * Displays the side bar.
   */
  const showSideBar = useCallback(() => {
    dispatch({ type: SHOW_SIDE_BAR });
  }, []);

  /**
   * Hides the side bar.
   */
  const hideSideBar = useCallback(() => {
    dispatch({ type: HIDE_SIDE_BAR });
  }, []);

  /**
   * Updates the record id used for displaying status in side bar.
   * @param {string} payload - The payload that has record id to be updated.
   */
  const updateSideBarRecordId = useCallback((payload) => {
    dispatch({ type: UPDATE_SIDE_BAR_RECORD_ID, payload });
  }, []);

  /**
   * Updates the usernames for displaying in Forge form.
   * @param {string} payload - The payload that has all available usernames to be updated.
   */
  const updateUsernames = useCallback((payload) => {
    dispatch({ type: UPDATE_USERNAMES, payload });
  }, []);

  /**
   * Resets the UI state to initial values, triggering a refetch.
   */
  const resetUI = useCallback(() => {
    dispatch({ type: RESET_ALL });
  }, []);

  /**
   * Context object containing state and actions for managing UI state.
   */
  const uiCtx = {
    state,
    updateSearchTerm,
    updatePagination,
    updateRefetchURL,
    enableRefetch,
    disableRefetch,
    resetUI,
    updateCandidatesPerPage,
    updateSelectedStatuses,
    showSideBar,
    hideSideBar,
    updateSideBarRecordId,
    updateUsernames,
  };

  return <UIContext.Provider value={uiCtx}>{children}</UIContext.Provider>;
};

UIContextProvider.displayName = "UIContextProvider";
export default UIContextProvider;

/**
 * useUI Hook
 *
 * Custom hook to access the UI context values, including current UI state
 * and actions for updating search term, pagination, refetch URL, and more.
 *
 * @returns {Object} - The UI context containing state and actions.
 */
export const useUI = () => useContext(UIContext);
