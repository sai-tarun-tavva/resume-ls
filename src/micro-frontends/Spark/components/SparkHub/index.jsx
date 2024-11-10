import { Provider } from "react-redux";
import Header from "../../../Atoms/components/Operations";
import Operations from "../Operations";
import Results from "../Results";
import store from "../../store/store";
import { PAGES } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * SparkHub Component
 *
 * Main hub for displaying operations and results within the application.
 * Wraps the `Operations` and `Results` components with the Redux provider for state management.
 *
 * @component
 * @returns {JSX.Element} The SparkHub component containing a header, operations, and results sections.
 */
const SparkHub = () => {
  return (
    <Provider store={store}>
      <Header
        currentPage={PAGES.SPARK}
        includeSearch={false}
        includePagination={false}
      />
      <section className={classes.sparkHub}>
        <Operations />
        <Results />
      </section>
    </Provider>
  );
};

export default SparkHub;
SparkHub.displayName = "SparkHub";
