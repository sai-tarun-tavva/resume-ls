import classes from "./index.module.css";

const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader} />
    </div>
  );
};

Loader.displayName = "Loader";
export default Loader;
