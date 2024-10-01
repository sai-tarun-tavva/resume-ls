import { createContext, useCallback, useMemo, useState } from "react";

// Initial status object
const initialStatus = {
  message: "",
  type: "",
  darkMode: false,
};

// Create a context with an initial status
export const StatusMsgContext = createContext(initialStatus);

export const StatusMsgContextProvider = ({ children }) => {
  const [status, setStatus] = useState(initialStatus);

  // Function to update the status message
  const handleViewStatus = useCallback(
    (message = "", type = "", darkMode = false) => {
      setStatus({ message, type, darkMode });
    },
    []
  );

  // Memoize the context value to prevent unnecessary re-renders
  const statusMsgCtx = useMemo(
    () => ({
      ...status,
      handleViewStatus,
    }),
    [status, handleViewStatus]
  );

  return (
    <StatusMsgContext.Provider value={statusMsgCtx}>
      {children}
    </StatusMsgContext.Provider>
  );
};
