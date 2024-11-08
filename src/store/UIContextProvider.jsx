import { createContext, useCallback, useContext, useReducer } from "react";
import { UI_ACTION_TYPES } from "../constants";

const {
  UPDATE_SEARCH_TERM,
  UPDATE_PAGINATION,
  UPDATE_REFETCH_URL,
  ENABLE_REFETCH,
  DISABLE_REFETCH,
  RESET_ALL,
} = UI_ACTION_TYPES;

// Initial state for the UI context
const initialState = {
  pagination: {
    previousPage: "",
    nextPage: "",
    totalCount: 0,
  },
  searchTerm: "",
  refetch: false,
  refetchURL: "",
};

const UIContext = createContext(initialState);

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
    case RESET_ALL:
      return { ...initialState, refetch: true };
    default:
      return state;
  }
};

const UIContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  // Actions to update the state
  const updateSearchTerm = useCallback((searchTerm) => {
    dispatch({ type: UPDATE_SEARCH_TERM, payload: searchTerm });
  }, []);

  const updatePagination = useCallback((pagination) => {
    dispatch({ type: UPDATE_PAGINATION, payload: pagination });
  }, []);

  const updateRefetchURL = useCallback((refetchURL) => {
    dispatch({ type: UPDATE_REFETCH_URL, payload: refetchURL });
  }, []);

  const enableRefetch = useCallback(() => {
    dispatch({ type: ENABLE_REFETCH });
  }, []);

  const disableRefetch = useCallback(() => {
    dispatch({ type: DISABLE_REFETCH });
  }, []);

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
  };

  return <UIContext.Provider value={uiCtx}>{children}</UIContext.Provider>;
};

export default UIContextProvider;

export const useUI = () => useContext(UIContext);
