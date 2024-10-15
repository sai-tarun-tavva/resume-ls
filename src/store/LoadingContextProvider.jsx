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

const loadingReducer = (state, action) => {
  const { type, payload } = action;

  if (type) {
    const updatedState = { ...state };
    updatedState[type] = payload;
    return updatedState;
  }
  return { ...state };
};

const LoadingContextProvider = ({ children }) => {
  const [isLoading, dispatch] = useReducer(loadingReducer, initialState);

  // Activates the application loading state, indicating that the app is currently processing a task
  const enableAppLoading = useCallback(() => {
    dispatch({ type: APP, payload: true });
  }, []);

  // Deactivates the application loading state, indicating that the app has finished processing
  const disableAppLoading = useCallback(() => {
    dispatch({ type: APP, payload: false });
  }, []);

  // Activates the button loading state, indicating that the button is in a loading state (e.g., waiting for an API response)
  const enableButtonLoading = useCallback(() => {
    dispatch({ type: BUTTON, payload: true });
  }, []);

  // Deactivates the button loading state, indicating that the button is no longer in a loading state and can be interacted with
  const disableButtonLoading = useCallback(() => {
    dispatch({ type: BUTTON, payload: false });
  }, []);

  // Activates the fetch loading state, indicating that the file viewer is in a loading state
  const enableFetchLoading = useCallback(() => {
    dispatch({ type: FETCH, payload: true });
  }, []);

  // Deactivates the fetch loading state, indicating that the file viewer finished fetching file
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

export default LoadingContextProvider;

export const useLoading = () => useContext(LoadingContext);
