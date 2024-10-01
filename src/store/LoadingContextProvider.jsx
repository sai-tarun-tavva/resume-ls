import { createContext, useCallback, useMemo, useState } from "react";

export const LoadingContext = createContext({});

export const LoadingContextProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isSendingPostPatchRequest, setIsSendingPostPatchRequest] =
    useState(false);

  // Update fetching state
  const handleFetching = useCallback((value) => {
    setIsFetching(value);
  }, []);

  // Toggle sending post/patch request state
  const handleToggleSendingPostPatchRequest = useCallback(() => {
    setIsSendingPostPatchRequest((prevValue) => !prevValue);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const loadingCtx = useMemo(
    () => ({
      isFetching,
      isSendingPostPatchRequest,
      handleFetching,
      handleToggleSendingPostPatchRequest,
    }),
    [
      isFetching,
      isSendingPostPatchRequest,
      handleFetching,
      handleToggleSendingPostPatchRequest,
    ]
  );

  return (
    <LoadingContext.Provider value={loadingCtx}>
      {children}
    </LoadingContext.Provider>
  );
};
