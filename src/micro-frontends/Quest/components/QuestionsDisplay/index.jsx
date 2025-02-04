import { useSelector } from "react-redux";
import Loader from "../../../Atoms/components/Loader";
import MarkdownDisplay from "../../../Atoms/components/MarkdownDisplay";
import { useLoading } from "../../../../store";
import {
  CONTENT,
  LOADER_TYPES,
  LOADING_ACTION_TYPES,
} from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * QuestionsDisplay Component
 *
 * Displays the generated questions or a loading spinner when data is being fetched.
 * If no questions are available, shows a placeholder message.
 *
 * @component
 * @returns {JSX.Element} The QuestionsDisplay component.
 */
const QuestionsDisplay = () => {
  const { questions } = useSelector((state) => state.result); // Fetch questions from the Redux store
  const { isLoading } = useLoading(); // Fetch loading state

  return isLoading[FETCH] ? (
    // Display loader when data is being fetched
    <Loader type={LOADER_TYPES.BAR} extraClass={classes.loaderExtraClass} />
  ) : questions.length > 0 ? (
    <div className={classes.questionsContainer}>
      <div className={classes.header}>
        <h2>{CONTENT.QUEST.input.questions.list.heading}</h2>
        <p>{CONTENT.QUEST.input.questions.list.paragraph}</p>
      </div>
      <ul className={classes.questionsList}>
        {questions.map((question, index) => (
          <li key={index} className={classes.questionItem}>
            <div className={classes.questionContent}>
              <MarkdownDisplay analysisResult={[question]} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    // Display placeholder message if no questions are available
    <div className={classes.defaultMessageContainer}>
      <h2>{CONTENT.QUEST.input.questions.none.heading}</h2>
      <p>{CONTENT.QUEST.input.questions.none.paragraph}</p>
      <div className={classes.iconContainer}>
        <i className="bi bi-lightbulb"></i>
      </div>
    </div>
  );
};

QuestionsDisplay.displayName = "QuestionsDisplay";
export default QuestionsDisplay;
