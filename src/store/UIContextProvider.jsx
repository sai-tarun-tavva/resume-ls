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
  RESET_ALL,
} = UI_ACTION_TYPES;

// Initial state for the UI context
const initialState = {
  pagination: {
    previousPage: "", // Page number to fetch previous set of candidates
    nextPage: "", // Page number to fetch next set of candidates
    totalCount: 0, // Total number of candidates available
  },
  candidatesPerPage: INSIGHT.CANDIDATES_PER_PAGE, // Number of candidates per page
  searchTerm: "", // Term to search/filter the candidates
  selectedStatuses: {
    // To search/filter the candidates with selected statuses
    inProgress: true,
    yetToReview: true,
    underReview: true,
    completed: false,
  },
  refetch: false, // Flag to determine whether to re-fetch the candidates
  refetchURL: "", // URL to refetch corresponding set of candidates
};

// Creating the UI context
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
      return {
        ...state,
        selectedStatuses: {
          ...state.selectedStatuses,
          [payload]: !state.selectedStatuses[payload],
        },
      };
    case RESET_ALL:
      return { ...initialState, refetch: true };
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
   * @param {string} status - The status to be updated.
   */
  const updateSelectedStatuses = useCallback((status) => {
    dispatch({ type: UPDATE_SELECTED_STATUSES, payload: status });
  }, []);

  /**
   * Resets the UI state to initial values, triggering a refetch.
   */
  const resetUI = useCallback(() => {
    dispatch({ type: RESET_ALL });
  }, []);

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
