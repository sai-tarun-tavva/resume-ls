import React, { createContext, useState } from "react";

const initialValue = false;

export const LoadingContext = createContext(initialValue);

const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(initialValue);

  const handleLoading = () => {
    setIsLoading((prevValue) => !prevValue);
  };

  const loadingCtx = {
    isLoading,
    handleLoading,
  };

  return (
    <LoadingContext.Provider value={loadingCtx}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
