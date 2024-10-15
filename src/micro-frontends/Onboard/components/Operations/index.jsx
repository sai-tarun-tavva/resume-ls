import Header from "../../../Atoms/components/Header";
import Logo from "../../../Atoms/components/Logo";
import Logout from "../../../Atoms/components/LogOut";
import { CONTENT } from "../../../../constants";

/**
 * Operations Component
 *
 * Provides search functionality on the onboarding candidates page.
 *
 * @returns {JSX.Element} The rendered Operations component.
 */
const Operations = () => {
  const { logoSuffix, logo } = CONTENT.ONBOARD.operations;

  return (
    <Header>
      <Logo
        logoIcon={"bi bi-clipboard-check"}
        logoSuffix={logoSuffix}
        logoText={logo}
      />
      <Logout />
    </Header>
  );
};

Operations.displayName = "Operations";
export default Operations;
