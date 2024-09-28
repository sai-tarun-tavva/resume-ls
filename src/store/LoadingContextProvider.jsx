import React, { createContext, useCallback, useState } from "react";

export const LoadingContext = createContext({});

const LoadingContextProvider = ({ children }) => {
  const [isFetchingCandidates, setIsFetchingCandidates] = useState(false);
  const [isSendingPostPatchRequest, setIsSendingPostPatchRequest] =
    useState(false);

  const handleFetchingCandidates = useCallback(
    (value) => {
      setIsFetchingCandidates(value);
    },
    [setIsFetchingCandidates]
  );

  const handleSendingPostPatchRequest = useCallback(() => {
    setIsSendingPostPatchRequest((prevValue) => !prevValue);
  }, [setIsSendingPostPatchRequest]);

  const loadingCtx = {
    isFetchingCandidates,
    isSendingPostPatchRequest,
    handleFetchingCandidates,
    handleSendingPostPatchRequest,
  };

  return (
    <LoadingContext.Provider value={loadingCtx}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
