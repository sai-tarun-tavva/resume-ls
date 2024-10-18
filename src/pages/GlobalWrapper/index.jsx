import MainNavigation from "../../micro-frontends/Atoms/components/MainNavigation";
import StatusMessage from "../../micro-frontends/Atoms/components/StatusMessage";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <StatusMessage />
      {children}
    </>
  );
};

GlobalWrapper.displayName = "GlobalWrapper";
export default GlobalWrapper;
