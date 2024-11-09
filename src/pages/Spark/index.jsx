import { Helmet } from "react-helmet-async";
import SparkHub from "../../micro-frontends/Spark/components/SparkHub";

/**
 * Spark Component
 *
 * This component serves as the main entry point for the Resume Spark application.
 * It includes a `Helmet` element for dynamic document head management, setting the page
 * title to "Resume Spark" for a clear and focused user experience.
 *
 * The `SparkHub` component is rendered here to display the main functionality,
 * which provides AI-powered resume suggestions and enhancements to the user.
 *
 * @component
 * @returns {JSX.Element} A component that renders the SparkHub with a custom page title.
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

Spark.displayName = "Spark";
export default Spark;
