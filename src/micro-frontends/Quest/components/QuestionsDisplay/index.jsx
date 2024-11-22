import { useSelector } from "react-redux";
import Loader from "../../../Atoms/components/Loader";
import { useLoading } from "../../../../store";
import { LOADER_TYPES, LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

const QuestionsDisplay = () => {
  const { questions } = useSelector((state) => state.result);
  const { isLoading } = useLoading();

  return isLoading[FETCH] ? (
    <Loader type={LOADER_TYPES.BAR} extraClass={classes.loaderExtraClass} />
  ) : questions.length > 0 ? (
    <div className={classes.questions}>
      {questions.map((question, index) => (
        <div key={index} className={classes.question}>
          {question}
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.noQuestions}>
      <p>
        Click <strong>Generate Questions</strong> to get started
      </p>
    </div>
  );
};

QuestionsDisplay.displayName = "QuestionsDisplay";
export default QuestionsDisplay;
