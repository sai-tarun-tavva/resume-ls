import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../../constants";
import classes from "./index.module.scss";

const MainNavigation = () => {
  return (
    <nav className={classes.mainNavigation}>
      <ul>
        <li>
          <NavLink
            to={`/${ROUTES.INSIGHT.HOME}`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Insight
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${ROUTES.ONBOARD.HOME}`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Onboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${ROUTES.SPARK.HOME}`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Spark
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

MainNavigation.displayName = "MainNavigation";
export default MainNavigation;
