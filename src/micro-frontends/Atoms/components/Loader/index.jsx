import PropTypes from "prop-types";
import { LOADER_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Loader Component
 *
 * Displays a loading indicator, which can be either a spinning loader or a bar loader.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.type=LOADER_TYPES.SPIN] - The type of loader to display (spin or bar).
 * @param {string} [props.extraClass=""] - Additional CSS classes for customization.
 * @returns {JSX.Element} The Loader component.
 */
const Loader = ({ type = LOADER_TYPES.SPIN, extraClass = "" }) => {
  return (
    <div
      className={`${classes.loaderContainer} ${
        type === LOADER_TYPES.BAR && classes.barContainer
      } ${extraClass}`}
    >
      <div
        className={
          type === LOADER_TYPES.SPIN ? classes.spinLoader : classes.barLoader
        }
      />
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf([LOADER_TYPES.SPIN, LOADER_TYPES.BAR]),
  extraClass: PropTypes.string,
};

Loader.displayName = "Loader";
export default Loader;
