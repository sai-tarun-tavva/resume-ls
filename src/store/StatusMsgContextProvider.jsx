import React, { createContext, useCallback, useState } from "react";

const initialStatus = {
  message: "",
  type: "",
  darkMode: false,
};

export const StatusMsgContext = createContext(initialStatus);

const StatusMsgContextProvider = ({ children }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleViewStatus = useCallback(
    (message = "", type = "", darkMode = false) => {
      setStatus({ message, type, darkMode });
    },
    [setStatus]
  );

  const statusMsgCtx = {
    ...status,
    handleViewStatus,
  };
  return (
    <StatusMsgContext.Provider value={statusMsgCtx}>
      {children}
    </StatusMsgContext.Provider>
  );
};

export default StatusMsgContextProvider;
