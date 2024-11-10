import { createContext, useCallback, useContext, useReducer } from "react";
import { STATUS_ACTION_TYPES } from "../constants";

const { UPDATE, RESET } = STATUS_ACTION_TYPES;

// Initial state for the status slice
const initialState = {
  message: "", // Message to be displayed
  type: "", // Type of the message (e.g., success, error)
  darkMode: false, // Indicates if dark mode is enabled
};

// Creating the Status context
const StatusContext = createContext(initialState);

/**
 * Reducer function for managing status states in the application.
 *
 * @param {Object} state - The current state of status.
 * @param {Object} action - The dispatched action containing a type and optional payload.
 * @param {string} action.type - The type of action (UPDATE or RESET).
 * @param {Object} [action.payload] - The new status values to be updated.
 * @returns {Object} - The updated state based on the action type.
 */
const statusReducer = (state, action) => {
  switch (action.type) {
    case UPDATE:
      return action.payload;
    case RESET:
      return initialState;
    default:
      return { ...state };
  }
};

/**
 * StatusContextProvider Component
 *
 * Provides a context for managing application-wide status messages,
 * including functions for updating and resetting status.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to status context.
 * @returns {JSX.Element} The provider component with status state and actions.
 */
const StatusContextProvider = ({ children }) => {
  const [status, dispatch] = useReducer(statusReducer, initialState);

  /**
   * Updates the status state with a new message, type, and dark mode preference.
   *
   * @param {Object} newState - The new status state to be set.
   * @param {string} newState.message - The message to display.
   * @param {string} newState.type - The type of message (e.g., success, error).
   * @param {boolean} [newState.darkMode] - Flag indicating if dark mode is enabled for the status.
   */
  const updateStatus = useCallback((newState) => {
    dispatch({ type: UPDATE, payload: newState });
  }, []);

  /**
   * Resets the status state to its initial values.
   */
  const resetStatus = useCallback(() => {
    dispatch({ type: RESET });
  }, []);

  const statusCtx = {
    status,
    updateStatus,
    resetStatus,
  };

  return (
    <StatusContext.Provider value={statusCtx}>
      {children}
    </StatusContext.Provider>
  );
};

StatusContextProvider.displayName = "StatusContextProvider";
export default StatusContextProvider;

/**
 * useStatus Hook
 *
 * Custom hook to access the status context values, including the current status state,
 * and functions for updating and resetting the status.
 *
 * @returns {Object} - The status context containing the current status and actions.
 */
export const useStatus = () => useContext(StatusContext);
