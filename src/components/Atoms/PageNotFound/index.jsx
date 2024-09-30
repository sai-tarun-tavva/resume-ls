import { Link } from "react-router-dom";
import { content, ROUTES } from "../../../constants";
import classes from "./index.module.css";

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
