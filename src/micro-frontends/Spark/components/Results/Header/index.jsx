import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Header Component
 *
 * Displays header tabs for results selection.
 *
 * @param {Object} props - The component props.
 * @param {function} props.clickHandler - The function to call on tab click.
 * @returns {JSX.Element} The header component.
 */
const Header = ({ clickHandler }) => {
  const { selectedKey } = useSelector((state) => state.result);
  const headerTabs = Object.entries(CONTENT.SPARK.results);

  return (
    <header className={classes.headerContainer}>
      <nav className={classes.header}>
        {headerTabs.map(([key, value]) => (
          <button
            key={key}
            className={`${classes.headerTab} ${
              key === selectedKey ? classes.active : ""
            }`}
            onClick={() => clickHandler(key)}
          >
            {value}
          </button>
        ))}
      </nav>
    </header>
  );
};

Header.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default Header;
