import { Helmet } from "react-helmet-async";
import OnboardHub from "../../micro-frontends/Onboard/components/OnboardHub";

/**
 * Onboard Component
 *
 * Serves as the main entry point for the Onboard application.
 * It renders the CandidatesHub component to display the onboarding candidates' information.
 *
 * @returns {JSX.Element} The rendered Insight component.
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
