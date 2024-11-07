import { useSelector } from "react-redux";
import { formatContent } from "../../../../../utilities";
import classes from "./index.module.scss";

/**
 * Response Component
 *
 * Displays formatted content based on the selected key.
 *
 * @returns {JSX.Element} The response component.
 */
const Response = () => {
  const { selectedKey, ...result } = useSelector((state) => state.result);

  return (
    <section className={classes.responseContainer}>
      {formatContent(result[selectedKey], classes)}
    </section>
  );
};

export default Response;
