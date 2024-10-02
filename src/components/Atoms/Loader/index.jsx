import classes from "./index.module.scss";

/**
 * Loader Component
 *
 * Displays a loading indicator.
 *
 * @returns {JSX.Element} The rendered Loader component.
 */
const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader} />
    </div>
  );
};

Loader.displayName = "Loader";
export default Loader;
