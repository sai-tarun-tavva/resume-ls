import Textarea from "../../../Atoms/components/Inputs/Textarea";
import Button from "../../../Atoms/components/Button";
import { useInput } from "../../../Atoms/hooks";
import { useLoading } from "../../../../store";
import { questValidations } from "../../../../utilities";
import { LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

const QuestionsGenerator = () => {
  const { isLoading } = useLoading();

  const {
    value: jobDescriptionValue,
    handleInputChange: jobDescriptionChange,
    handleInputBlur: jobDescriptionBlur,
    handleInputFocus: jobDescriptionFocus,
    error: jobDescriptionError,
    isFocused: isJobDescriptionFocused,
    forceValidations: forceJobDescriptionValidations,
  } = useInput("", questValidations.jobDescription, undefined, true);

  const generateHandler = (event) => {
    event.preventDefault();
    if (isLoading[FETCH]) return;

    if (!jobDescriptionValue) forceJobDescriptionValidations();
  };

  return (
    <section className={classes.generatorContainer}>
      <form>
        <Textarea
          id="description"
          label="Job Description"
          value={jobDescriptionValue}
          changeHandler={jobDescriptionChange}
          blurHandler={jobDescriptionBlur}
          focusHandler={jobDescriptionFocus}
          error={jobDescriptionError}
          isFocused={isJobDescriptionFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
        <Button
          className={`${classes.button} ${isLoading[FETCH] ? "loading" : ""}`}
          onClick={generateHandler}
        >
          {isLoading[FETCH] ? "Generating..." : "Generate Questions"}
          <i className="bi bi-question-circle" />
        </Button>
      </form>
    </section>
  );
};

QuestionsGenerator.displayName = "QuestionsGenerator";
export default QuestionsGenerator;
