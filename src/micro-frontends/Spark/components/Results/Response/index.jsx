import { useSelector } from "react-redux";
import MarkdownDisplay from "../../../../Atoms/components/MarkdownDisplay";
import classes from "./index.module.scss";

/**
 * Response Component
 *
 * Retrieves and displays the content associated with the currently selected key
 * in the `result` state, formatted using the `MarkdownDisplay` component.
 *
 * @component
 * @returns {JSX.Element} The rendered response component, showing analysis results based on the selected key.
 */
const Response = () => {
  const {
    selectedKey,
    headerTabs: { ...result },
  } = useSelector((state) => state.result);

  return (
    <section className={classes.responseContainer}>
      <MarkdownDisplay analysisResult={result[selectedKey]} />
    </section>
  );
};

export default Response;
Response.displayName = "Response";
