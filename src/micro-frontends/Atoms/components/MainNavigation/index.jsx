import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../../constants";
import { useUI } from "../../../../store";
import classes from "./index.module.scss";

const MainNavigation = () => {
  const { resetUI } = useUI();

  const navClickHandler = () => {
    resetUI();
  };

  return (
    <nav className={classes.mainNavigation}>
      <ul>
        <li>
          <NavLink
            to={`/${ROUTES.ONBOARD.HOME}`}
            onClick={navClickHandler}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Onboard
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
            Insight
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
            Spark
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

MainNavigation.displayName = "MainNavigation";
export default MainNavigation;
