import { Helmet } from "react-helmet-async";
import ForgeHub from "../../micro-frontends/Forge/components/ForgeHub";
import { CONTENT } from "../../constants";

/**
 * Forge Component
 *
 * This component serves as the main entry point for the Resume Forge application.
 * It incorporates the `Helmet` component to dynamically set the page title to "Resume Forge",
 * enhancing SEO and user experience.
 *
 * The `ForgeHub` component within displays a comprehensive list of sales or/and recruit recordsd
 * and relevant information, providing a central view for candidate-client management.
 *
 * @component
 * @returns {JSX.Element} The rendered Forge component.
 */
const Forge = () => {
  return (
    <>
      <Helmet>
        <title>{CONTENT.COMMON.pageTitles.forge}</title>
      </Helmet>
      <ForgeHub />
    </>
  );
};

Forge.displayName = "Forge";
export default Forge;
