import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "../../../Atoms/Button";
import classes from "./index.module.css";

const Logout = () => {
  return (
    <Button className={classes.logout} title="Log Out">
      <i className="bi bi-box-arrow-left"></i>
    </Button>
  );
};

Logout.displayName = "LogOut";
export default Logout;
