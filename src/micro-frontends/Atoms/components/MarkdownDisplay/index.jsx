import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import classes from "./index.module.scss";

/**
 * MarkdownDisplay Component
 *
 * Renders markdown content from an array of strings, supporting GitHub-flavored markdown.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.analysisResult - Array of markdown strings to render.
 * @returns {JSX.Element} The MarkdownDisplay component.
 */
const MarkdownDisplay = ({ analysisResult }) => {
  return (
    <div className={classes.markdownContainer}>
      {analysisResult.map((line, index) => (
        <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
          {line}
        </ReactMarkdown>
      ))}
    </div>
  );
};

MarkdownDisplay.propTypes = {
  analysisResult: PropTypes.arrayOf(PropTypes.string).isRequired,
};

MarkdownDisplay.displayName = "MarkdownDisplay";
export default MarkdownDisplay;
