import { Provider } from "react-redux";
import Header from "../../../Atoms/components/Operations";
import Operations from "../Operations";
import Results from "../Results";
import store from "../../store/store";
import classes from "./index.module.scss";
import { PAGES } from "../../../../constants";

/**
 * SparkHub Component
 *
 * Main hub for displaying operations, results, or overlay messages.
 *
 * @returns {JSX.Element} The SparkHub component.
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
