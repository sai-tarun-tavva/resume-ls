import classes from "./index.module.scss";

const Header = ({ children }) => {
  return <header className={classes.operations}>{children}</header>;
};

Header.displayName = "Header";
export default Header;
