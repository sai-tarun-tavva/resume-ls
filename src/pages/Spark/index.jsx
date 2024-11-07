import { Helmet } from "react-helmet-async";
import SparkHub from "../../micro-frontends/Spark/components/SparkHub";

/**
 * Spark Component
 *
 * Serves as the main entry point for the application.
 * It renders the SparkHub component to display the resume suggestions.
 *
 * @returns {JSX.Element} The rendered Spark component.
 */
const Spark = () => {
  return (
    <>
      <Helmet>
        <title>Resume Spark</title>
      </Helmet>
      <SparkHub />
    </>
  );
};

export default Spark;
