import LoadingContextProvider from "./LoadingContextProvider";
import StatusContextProvider from "./StatusContextProvider";

const ContextProvider = ({ children }) => {
  return (
    <StatusContextProvider>
      <LoadingContextProvider>{children}</LoadingContextProvider>
    </StatusContextProvider>
  );
};

export default ContextProvider;
