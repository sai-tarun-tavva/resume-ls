import { HelmetProvider } from "react-helmet-async";
import StatusMessage from "../../micro-frontends/Atoms/components/StatusMessage";
import ContextProvider from "../../store/ContextProvider";

const GlobalWrapper = ({ children }) => {
  return (
    <HelmetProvider>
      <ContextProvider>
        <StatusMessage />
        {children}
      </ContextProvider>
    </HelmetProvider>
  );
};

GlobalWrapper.displayName = "GlobalWrapper";
export default GlobalWrapper;
