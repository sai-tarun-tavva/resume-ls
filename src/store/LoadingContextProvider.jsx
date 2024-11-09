import { createContext, useCallback, useContext, useReducer } from "react";
import { LOADING_ACTION_TYPES } from "../constants";

const { APP, BUTTON, FETCH } = LOADING_ACTION_TYPES;

// Initial state of the loading slice
const initialState = {
  [APP]: false, // Flag indicating whether the entire application is currently loading
  [BUTTON]: false, // Flag indicating whether a specific button is currently in a loading state (e.g., for submitting data)
  [FETCH]: false, // Flag indicating whether something is being fetched.
};

const LoadingContext = createContext(initialState);

/**
 * Reducer function for managing loading states in the application.
 *
 * @param {Object} state - The current state of loading flags.
 * @param {Object} action - The dispatched action containing a type and payload.
 * @param {string} action.type - The type of loading state to update (APP, BUTTON, FETCH).
 * @param {boolean} action.payload - The new loading state (true for loading, false for not loading).
 * @returns {Object} - The updated state with the specified loading flag set.
 */
const loadingReducer = (state, action) => {
  const { type, payload } = action;
  if (type) {
    const updatedState = { ...state };
    updatedState[type] = payload;
    return updatedState;
  }
  return { ...state };
};

/**
 * LoadingContextProvider Component
 *
 * Provides a context and utilities for managing loading states in the application,
 * including states for application-wide loading, button-specific loading, and fetch actions.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to loading state.
 * @returns {JSX.Element} The provider component with loading state and actions.
 */
const LoadingContextProvider = ({ children }) => {
  const [isLoading, dispatch] = useReducer(loadingReducer, initialState);

  /**
   * Activates the application loading state, indicating that the app is currently processing a task.
   */
  const enableAppLoading = useCallback(() => {
    dispatch({ type: APP, payload: true });
  }, []);

  /**
   * Deactivates the application loading state, indicating that the app has finished processing.
   */
  const disableAppLoading = useCallback(() => {
    dispatch({ type: APP, payload: false });
  }, []);

  /**
   * Activates the button loading state, indicating that the button is in a loading state (e.g., waiting for an API response).
   */
  const enableButtonLoading = useCallback(() => {
    dispatch({ type: BUTTON, payload: true });
  }, []);

  /**
   * Deactivates the button loading state, indicating that the button is no longer in a loading state and can be interacted with.
   */
  const disableButtonLoading = useCallback(() => {
    dispatch({ type: BUTTON, payload: false });
  }, []);

  /**
   * Activates the fetch loading state, indicating that a fetch operation is in progress.
   */
  const enableFetchLoading = useCallback(() => {
    dispatch({ type: FETCH, payload: true });
  }, []);

  /**
   * Deactivates the fetch loading state, indicating that the fetch operation has completed.
   */
  const disableFetchLoading = useCallback(() => {
    dispatch({ type: FETCH, payload: false });
  }, []);

  const loadingCtx = {
    isLoading,
    enableAppLoading,
    enableButtonLoading,
    enableFetchLoading,
    disableAppLoading,
    disableButtonLoading,
    disableFetchLoading,
  };

  return (
    <LoadingContext.Provider value={loadingCtx}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingContextProvider.displayName = "LoadingContextProvider";
export default LoadingContextProvider;

/**
 * useLoading Hook
 *
 * Custom hook to access loading context values, including loading states and functions
 * to enable or disable specific loading states (app-wide, button-specific, and fetch).
 *
 * @returns {Object} - The loading context containing loading states and actions.
 */
export const useLoading = () => useContext(LoadingContext);
