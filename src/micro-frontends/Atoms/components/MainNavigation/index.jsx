import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../../constants";
import { useUI } from "../../../../store";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

const { insight, onboard, spark, quest } = CONTENT.COMMON.mainNavigation;

/**
 * MainNavigation Component
 *
 * Renders the main navigation links for the application with active state handling.
 *
 * @returns {JSX.Element} The MainNavigation component.
 */
const MainNavigation = () => {
  const { resetUI } = useUI();

  /**
   * Handles click events for navigation links.
   * Resets the UI state when a navigation link is clicked.
   */
  const navClickHandler = () => {
    resetUI();
  };

  return (
    <nav className={classes.mainNavigation}>
      <ul>
        <li>
          <NavLink
            to={`/${ROUTES.QUEST.HOME}`}
            onClick={navClickHandler}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            {quest}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${ROUTES.ONBOARD.HOME}`}
            onClick={navClickHandler}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            {onboard}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${ROUTES.INSIGHT.HOME}`}
            onClick={navClickHandler}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            {insight}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${ROUTES.SPARK.HOME}`}
            onClick={navClickHandler}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            {spark}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

MainNavigation.displayName = "MainNavigation";
export default MainNavigation;
