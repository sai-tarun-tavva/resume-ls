import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import classes from "./index.module.css";

const PageNotFound = () => {
  return (
    <div className={classes.notFoundContainer}>
      <h1 className={classes.notFoundTitle}>404</h1>
      <p className={classes.notFoundMessage}>
        It seems the resume you were looking for got lost in cyberspace! 🚀
      </p>
      <p className={classes.notFoundSuggestion}>
        Head back to the <Link to={ROUTES.HOME}>Home Page</Link> to find the
        perfect candidate!
      </p>
    </div>
  );
};

PageNotFound.displayName = "PageNotFound";
export default PageNotFound;
