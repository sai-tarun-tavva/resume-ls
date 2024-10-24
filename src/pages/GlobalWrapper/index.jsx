import { HelmetProvider } from "react-helmet-async";
import MainNavigation from "../../micro-frontends/Atoms/components/MainNavigation";
import StatusMessage from "../../micro-frontends/Atoms/components/StatusMessage";

const GlobalWrapper = ({ children }) => {
  return (
    <HelmetProvider>
      <MainNavigation />
      <StatusMessage />
      {children}
    </HelmetProvider>
  );
};

GlobalWrapper.displayName = "GlobalWrapper";
export default GlobalWrapper;
