import { Provider } from "react-redux";
import Header from "../../../Atoms/components/Header";
import Logo from "../../../Atoms/components/Logo";
import Logout from "../../../Atoms/components/LogOut";
import Operations from "../Operations";
import Results from "../Results";
import store from "../../store/store";
import classes from "./index.module.scss";

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
      <Header>
        <Logo
          logoIcon={"bi bi-lightning-charge-fill"}
          logoSuffix={"R"}
          logoText={"Spark"}
        />
        <Logout className={classes.logoutExtraClass} />
      </Header>
      <section className={classes.sparkHub}>
        <Operations />
        <Results />
      </section>
    </Provider>
  );
};

export default SparkHub;
