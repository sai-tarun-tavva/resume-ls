import Button from "../Button";
import classes from "./index.module.scss";

const FloatingButton = ({ title, clickHandler, icon }) => {
  return (
    <Button
      className={`${classes.floatingButton} floating-button-global`}
      title={title}
      onClick={clickHandler}
    >
      {icon}
    </Button>
  );
};

FloatingButton.displayName = "FloatingButton";
export default FloatingButton;
