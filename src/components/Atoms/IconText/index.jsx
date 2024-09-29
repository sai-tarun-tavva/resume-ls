import classes from "./index.module.css";

const IconText = ({ children, iconName }) => {
  return (
    <div className={classes["icon-text"]}>
      <span>
        <i className={`bi bi-${iconName}-fill`}></i>
      </span>
      {children}
    </div>
  );
};

IconText.displayName = "IconText";
export default IconText;
