import { Provider } from "react-redux";
import Header from "../../../Atoms/components/Operations";
import URLInput from "../URLInput";
import OverviewDisplay from "../OverviewDisplay";
import store from "../../store/store";
import { PAGES } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * NexusHub Component
 *
 * The central hub of the RNexus application, responsible for rendering the URL input
 * and website overview display functionalities. It includes a common header for navigation
 * and user interaction.
 *
 * @component
 * @returns {JSX.Element} The NexusHub component, including the Header, UrlInput, and OverviewDisplay components.
 */
const NexusHub = () => {
  return (
    <Provider store={store}>
      {/* Header section */}
      <Header
        currentPage={PAGES.NEXUS}
        includeSearch={false}
        includePagination={false}
      />

      {/* Main content section */}
      <section className={classes.nexusHub}>
        <URLInput />
        <OverviewDisplay />
      </section>
    </Provider>
  );
};

NexusHub.displayName = "NexusHub";
export default NexusHub;
