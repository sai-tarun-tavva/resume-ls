import { Link } from "react-router-dom";
import { CONTENT, ROUTES } from "../../constants";
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
  return (
    <div className={classes.notFoundContainer}>
      <h1 className={classes.notFoundTitle}>{CONTENT.pageNotFound.title}</h1>
      <p className={classes.notFoundMessage}>{CONTENT.pageNotFound.message}</p>
      <p className={classes.notFoundSuggestion}>
        {CONTENT.pageNotFound.suggestionStart}
        <Link to={ROUTES.HOME} replace>
          {CONTENT.pageNotFound.suggestedPageName}
        </Link>
        {CONTENT.pageNotFound.suggestionEnd}
      </p>
    </div>
  );
};

PageNotFound.displayName = "PageNotFound";
export default PageNotFound;
