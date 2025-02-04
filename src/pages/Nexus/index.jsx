import { Helmet } from "react-helmet-async";
import NexusHub from "../../micro-frontends/Nexus/components/NexusHub";
import { CONTENT } from "../../constants";

/**
 * Nexus Component
 *
 * This component serves as the main entry point for the RNexus application.
 * It includes a `Helmet` element for dynamic document head management, setting the page
 * The `NexusHub` component is rendered here to display the main functionality,
 * which allows users to input a URL, perform web scraping on the backend,
 * and display an overview of the website content.
 *
 * @component
 * @returns {JSX.Element} A component that renders the NexusHub with a custom page title.
 */
const Nexus = () => {
  return (
    <>
      <Helmet>
        <title>{CONTENT.COMMON.pageTitles.nexus}</title>
      </Helmet>
      <NexusHub />
    </>
  );
};

Nexus.displayName = "Nexus";
export default Nexus;
