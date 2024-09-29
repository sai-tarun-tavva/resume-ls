import { createContext, useCallback, useState } from "react";

export const LoadingContext = createContext({});

export const LoadingContextProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isSendingPostPatchRequest, setIsSendingPostPatchRequest] =
    useState(false);

  const handleFetching = useCallback(
    (value) => {
      setIsFetching(value);
    },
    [setIsFetching]
  );

  const handleSendingPostPatchRequest = useCallback(() => {
    setIsSendingPostPatchRequest((prevValue) => !prevValue);
  }, [setIsSendingPostPatchRequest]);

  const loadingCtx = {
    isFetching,
    isSendingPostPatchRequest,
    handleFetching,
    handleSendingPostPatchRequest,
  };

  return (
    <LoadingContext.Provider value={loadingCtx}>
      {children}
    </LoadingContext.Provider>
  );
};
