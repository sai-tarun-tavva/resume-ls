import { Link, useLocation } from "react-router-dom";
import { CONTENT, ROUTES } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * PageNotFound Component
 *
 * Displays a 404 error message
 * when a requested page is not found.
 *
 * @returns {JSX.Element} The rendered PageNotFound component.
 */
const PageNotFound = () => {
  const { title, message, suggestionStart, suggestedPageName, suggestionEnd } =
    CONTENT.COMMON.pageNotFound;
  const location = useLocation();
  const previousRoute = location.state?.from || "";

  let redirectUrl = `/${ROUTES.INSIGHT.HOME}`;

  if (previousRoute.includes(ROUTES.ONBOARD.HOME.split("/")[0])) {
    redirectUrl = `/${ROUTES.ONBOARD.HOME}`;
  } else if (previousRoute.includes(ROUTES.FORGE.SALES.VIEW)) {
    redirectUrl = `/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.SALES.VIEW}`;
  } else if (previousRoute.includes(ROUTES.FORGE.RECRUIT.VIEW)) {
    redirectUrl = `/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.RECRUIT.VIEW}`;
  }

  return (
    <div className={classes.notFoundContainer}>
      <h1 className={classes.notFoundTitle}>{title}</h1>
      <p className={classes.notFoundMessage}>{message}</p>
      <p className={classes.notFoundSuggestion}>
        {suggestionStart}
        <Link to={redirectUrl} replace>
          {suggestedPageName}
        </Link>
        {suggestionEnd}
      </p>
    </div>
  );
};

PageNotFound.displayName = "PageNotFound";
export default PageNotFound;
