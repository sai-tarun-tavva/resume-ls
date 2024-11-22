import { useSelector } from "react-redux";
import Loader from "../../../Atoms/components/Loader";
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
    // Display the list of questions if available
    <div className={classes.questions}>
      {questions.map((question, index) => (
        <div key={index} className={classes.question}>
          {question}
        </div>
      ))}
    </div>
  ) : (
    // Display placeholder message if no questions are available
    <div className={classes.noQuestions}>
      <p>
        {CONTENT.QUEST.input.textarea.default.split("{{buttonName}}")[0]}
        <strong>{CONTENT.QUEST.input.button.default}</strong>
        {CONTENT.QUEST.input.textarea.default.split("{{buttonName}}")[1]}
      </p>
    </div>
  );
};

QuestionsDisplay.displayName = "QuestionsDisplay";
export default QuestionsDisplay;
