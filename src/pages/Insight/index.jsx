import InsightHub from "../../micro-frontends/Insight/components/InsightHub";

/**
 * Insight Component
 *
 * Serves as the main entry point for the Insight application.
 * It renders the CandidatesHub component to display the candidates' information.
 *
 * @returns {JSX.Element} The rendered Insight component.
 */
const Insight = () => {
  return <InsightHub />;
};

Insight.displayName = "Insight";

export default Insight;
