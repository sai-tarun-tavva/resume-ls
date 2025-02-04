import Tooltip from "../Tooltip";
import classes from "./index.module.scss";

/**
 * Profile Component
 *
 * Renders a user profile icon with a tooltip displaying the username.
 *
 * @returns {JSX.Element} The Profile component.
 */
const Profile = () => {
  const username = sessionStorage.getItem("username");

  return (
    <div className={classes.profile}>
      <Tooltip
        baseContentToHover={<i className="bi bi-person-circle" />}
        extraClass={classes.extraTooltipClass}
      >
        {username}
      </Tooltip>
    </div>
  );
};

Profile.displayName = "Profile";
export default Profile;
