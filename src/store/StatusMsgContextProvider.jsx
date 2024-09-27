import { createContext, useState } from "react";

const initialStatus = {
  message: "",
  type: "",
};

export const StatusMsgContext = createContext(initialStatus);

const StatusMsgContextProvider = ({ children }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleViewStatus = (message, type) => {
    setStatus({ message, type });
  };

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
