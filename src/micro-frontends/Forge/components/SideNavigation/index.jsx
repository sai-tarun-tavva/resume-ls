import { NavLink } from "react-router-dom";
import { CONTENT, ROUTES } from "../../../../constants";
import { useUI } from "../../../../store";
import classes from "./index.module.scss";

/**
 * SideNavigation Component
 *
 * Provides sidebar navigation for navigating between sales and recruitment sections
 * within the FORGE module. Resets UI state upon navigation.
 *
 * @returns {JSX.Element} The SideNavigation component.
 */
const Navigation = () => {
  const { resetUI } = useUI();

  /**
   * Handles click events for navigation links.
   * Resets the UI state when a navigation link is clicked.
   */
  const navClickHandler = () => {
    resetUI();
  };

  return (
    <nav className={classes.navigation}>
      <div className={classes.navigation__container}>
        <NavLink
          to={`/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.SALES.VIEW}`}
          onClick={navClickHandler}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          {CONTENT.FORGE.sideNavigation.sales}
        </NavLink>
        <NavLink
          to={`/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.RECRUIT.VIEW}`}
          onClick={navClickHandler}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          {CONTENT.FORGE.sideNavigation.recruit}
        </NavLink>
      </div>
    </nav>
  );
};

Navigation.displayName = "Navigation";
export default Navigation;
