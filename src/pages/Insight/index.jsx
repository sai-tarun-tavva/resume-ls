import CandidatesHub from "../../micro-frontends/Insight/components/CandidatesHub";

/**
 * Insight Component
 *
 * Serves as the main entry point for the Insight application.
 * It renders the CandidatesHub component to display the candidates' information.
 *
 * @returns {JSX.Element} The rendered Insight component.
 */
const Insight = () => {
  return <CandidatesHub />;
};

Insight.displayName = "Insight";

export default Insight;
