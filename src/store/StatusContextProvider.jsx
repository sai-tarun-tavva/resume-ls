import { createContext, useCallback, useContext, useReducer } from "react";
import { STATUS_ACTION_TYPES } from "../constants";

const { UPDATE, RESET } = STATUS_ACTION_TYPES;

// Initial state for the status slice
const initialState = {
  message: "", // Message to be displayed
  type: "", // Type of the message (e.g., success, error)
  darkMode: false, // Indicates if dark mode is enabled
};

const StatusContext = createContext(initialState);

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

const StatusContextProvider = ({ children }) => {
  const [status, dispatch] = useReducer(statusReducer, initialState);

  // Updates the status with new values from the payload
  const updateStatus = useCallback((newState) => {
    dispatch({ type: UPDATE, payload: newState });
  }, []);

  // Resets the status state to its initial values
  const resetStatus = useCallback(() => {
    // Resetting to initial state values
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

export default StatusContextProvider;

export const useStatus = () => useContext(StatusContext);
