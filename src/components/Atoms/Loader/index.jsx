import { LOADER_TYPES } from "../../../constants";
import classes from "./index.module.scss";

/**
 * Loader Component
 *
 * Displays a loading indicator.
 *
 * @returns {JSX.Element} The rendered Loader component.
 */
const Loader = ({ type = LOADER_TYPES.SPIN }) => {
  return (
    <div
      className={`${classes.loaderContainer} ${
        type === LOADER_TYPES.BAR && classes.barContainer
      }`}
    >
      <div
        className={
          type === LOADER_TYPES.SPIN ? classes.spinLoader : classes.barLoader
        }
      />
    </div>
  );
};

Loader.displayName = "Loader";
export default Loader;
