import { Link } from "react-router-dom";
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
  return (
    <div className={classes.notFoundContainer}>
      <h1 className={classes.notFoundTitle}>{title}</h1>
      <p className={classes.notFoundMessage}>{message}</p>
      <p className={classes.notFoundSuggestion}>
        {suggestionStart}
        <Link to={ROUTES.INSIGHT.HOME} replace>
          {/* pending */}
          {suggestedPageName}
        </Link>
        {suggestionEnd}
      </p>
    </div>
  );
};

PageNotFound.displayName = "PageNotFound";
export default PageNotFound;
