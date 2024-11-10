import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * Header Component
 *
 * A container component for header content, styled with custom operations styling.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to render inside the header.
 * @returns {JSX.Element} The Header component.
 */
const Header = ({ children }) => {
  return <header className={classes.operations}>{children}</header>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

Header.displayName = "Header";
export default Header;
