import classes from "./index.module.scss";

const IconToggler = ({
  toggleMode,
  clickHandler,
  primaryIcon,
  secondaryIcon,
}) => {
  return (
    <div className={classes.toggleContainer}>
      <button
        className={`${classes.toggleButton} ${
          toggleMode ? classes.secondMode : undefined
        }`}
        onClick={clickHandler}
      >
        <div className={classes.backgroundIcons}>
          {primaryIcon}
          {secondaryIcon}
        </div>
        <div className={classes.slidingOverlay}>
          {toggleMode ? secondaryIcon : primaryIcon}
        </div>
      </button>
    </div>
  );
};

IconToggler.displayName = "IconToggler";
export default IconToggler;
