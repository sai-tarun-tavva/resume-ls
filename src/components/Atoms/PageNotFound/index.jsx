import { Link } from "react-router-dom";
import { content, ROUTES } from "../../../constants";
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
      <h1 className={classes.notFoundTitle}>{content.pageNotFound.title}</h1>
      <p className={classes.notFoundMessage}>{content.pageNotFound.message}</p>
      <p className={classes.notFoundSuggestion}>
        {content.pageNotFound.suggestionStart}
        <Link to={ROUTES.HOME}>{content.pageNotFound.suggestedPageName}</Link>
        {content.pageNotFound.suggestionEnd}
      </p>
    </div>
  );
};

PageNotFound.displayName = "PageNotFound";
export default PageNotFound;
