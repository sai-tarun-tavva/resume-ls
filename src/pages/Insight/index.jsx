import { Helmet } from "react-helmet-async";
import InsightHub from "../../micro-frontends/Insight/components/InsightHub";

/**
 * Insight Component
 *
 * The primary entry point for the Resume Insight application, providing
 * tools for viewing and managing candidate data. This component utilizes
 * `Helmet` to set the page title dynamically to "Resume Insight," which
 * enhances SEO and user navigation context.
 *
 * The `InsightHub` component within displays detailed candidate information,
 * serving as the main interface for the Insight application.
 *
 * @component
 * @returns {JSX.Element} The rendered Insight component.
 */
const Insight = () => {
  return (
    <>
      <Helmet>
        <title>Resume Insight</title>
      </Helmet>
      <InsightHub />
    </>
  );
};

Insight.displayName = "Insight";
export default Insight;
