import { Link, useLocation } from "react-router-dom";
import { CONTENT, PAGES, ROUTES } from "../../../../constants";
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

  return (
    <div className={classes.notFoundContainer}>
      <h1 className={classes.notFoundTitle}>{title}</h1>
      <p className={classes.notFoundMessage}>{message}</p>
      <p className={classes.notFoundSuggestion}>
        {suggestionStart}
        <Link
          to={
            previousRoute.includes(PAGES.ONBOARD)
              ? `/${ROUTES.ONBOARD.HOME}`
              : `/${ROUTES.INSIGHT.HOME}`
          }
          replace
        >
          {suggestedPageName}
        </Link>
        {suggestionEnd}
      </p>
    </div>
  );
};

PageNotFound.displayName = "PageNotFound";
export default PageNotFound;
