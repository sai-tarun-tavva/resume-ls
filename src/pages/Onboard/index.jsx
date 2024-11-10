import { Helmet } from "react-helmet-async";
import OnboardHub from "../../micro-frontends/Onboard/components/OnboardHub";

/**
 * Onboard Component
 *
 * This component serves as the main entry point for the Resume Onboard application.
 * It incorporates the `Helmet` component to dynamically set the page title to "Resume Onboard",
 * enhancing SEO and user experience.
 *
 * The `OnboardHub` component within displays a comprehensive list of onboarding candidates
 * and relevant information, providing a central view for candidate management.
 *
 * @component
 * @returns {JSX.Element} The rendered Onboard component.
 */
const Onboard = () => {
  return (
    <>
      <Helmet>
        <title>Resume Onboard</title>
      </Helmet>
      <OnboardHub />
    </>
  );
};

Onboard.displayName = "Onboard";
export default Onboard;
