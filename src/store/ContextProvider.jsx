import LoadingContextProvider from "./LoadingContextProvider";
import StatusContextProvider from "./StatusContextProvider";
import UIContextProvider from "./UIContextProvider";

const ContextProvider = ({ children }) => {
  return (
    <UIContextProvider>
      <StatusContextProvider>
        <LoadingContextProvider>{children}</LoadingContextProvider>
      </StatusContextProvider>
    </UIContextProvider>
  );
};

export default ContextProvider;
