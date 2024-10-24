import MainNavigation from "../../micro-frontends/Atoms/components/MainNavigation";

const ProtectedWrapper = ({ children }) => {
  return (
    <>
      <MainNavigation />
      {children}
    </>
  );
};

ProtectedWrapper.displayName = "ProtectedWrapper";
export default ProtectedWrapper;
