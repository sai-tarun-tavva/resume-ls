import { HelmetProvider } from "react-helmet-async";
import MainNavigation from "../../micro-frontends/Atoms/components/MainNavigation";

const GlobalWrapper = ({ children }) => {
  return (
    <HelmetProvider>
      <MainNavigation />
      {children}
    </HelmetProvider>
  );
};

GlobalWrapper.displayName = "GlobalWrapper";
export default GlobalWrapper;
