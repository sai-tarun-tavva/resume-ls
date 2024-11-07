import { useDispatch, useSelector } from "react-redux";
import Textarea from "../../../Atoms/components/Inputs/Textarea";
import Select from "../../../Atoms/components/Inputs/Select";
import Upload from "../../../Atoms/components/Inputs/Upload";
import Button from "../../../Atoms/components/Button";
import Actions from "./Actions";
import { useInput } from "../../../Atoms/hooks";
import { useLoading, useStatus } from "../../../../store";
import { resultActions } from "../../store";
import {
  determineSectionValidity,
  makeSuggestions,
  dispatchAsync,
  sparkValidations,
} from "../../../../utilities";
import {
  CONTENT,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
} from "../../../../constants";
import { OPERATION_API_UI_KEYS } from "../../constants";
import classes from "./index.module.scss";
import { OPTIONS } from "../../../Onboard/constants";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * Operations Component
 *
 * Handles user input for various operations, including text input, file upload, and action selection.
 *
 * @returns {JSX.Element} The operations component.
 */
const Operations = () => {
  const dispatch = useDispatch();
  const { selectedActions } = useSelector((state) => state.data);

  const { isLoading, enableFetchLoading, disableFetchLoading } = useLoading();
  const { updateStatus, resetStatus } = useStatus();

  const {
    value: jobDescriptionValue,
    handleInputChange: jobDescriptionChange,
    handleInputBlur: jobDescriptionBlur,
    handleInputFocus: jobDescriptionFocus,
    error: jobDescriptionError,
    isFocused: isJobDescriptionFocused,
    forceValidations: forceJobDescriptionValidations,
  } = useInput("", sparkValidations.jobDescription, undefined, true);

  const {
    value: chooseResumeValue,
    handleInputChange: chooseResumeChange,
    handleInputBlur: chooseResumeBlur,
    handleInputFocus: chooseResumeFocus,
    error: chooseResumeError,
    isFocused: isChooseResumeFocused,
    forceValidations: forceChooseResumeValidations,
    clearValue: chooseClearFile,
  } = useInput(null, sparkValidations.uploadResume, undefined, true);

  const {
    value: serviceTypeValue,
    handleInputChange: serviceTypeChange,
    handleInputBlur: serviceTypeBlur,
    handleInputFocus: serviceTypeFocus,
    error: serviceTypeError,
    isFocused: isServiceTypeFocused,
    forceValidations: forceServiceTypeValidations,
  } = useInput("", sparkValidations.chooseService, undefined, true);

  const allErrors = [jobDescriptionError, chooseResumeError, serviceTypeError];
  const allValues = [jobDescriptionValue, chooseResumeValue, serviceTypeValue];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceJobDescriptionValidations();
    forceServiceTypeValidations();
    forceChooseResumeValidations();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await dispatchAsync(resetStatus);

    if (!isSectionValid) {
      forceValidations();
    } else {
      const formData = new FormData();
      formData.append("description", jobDescriptionValue);
      formData.append("file", chooseResumeValue);

      selectedActions.forEach((action) => {
        formData.append("selectedActions[]", action);
      });

      formData.append("serviceType", serviceTypeValue);

      enableFetchLoading();

      const { status, data } = await makeSuggestions();

      disableFetchLoading();

      if (status === STATUS_CODES.SUCCESS) {
        const { analysisResults } = data;
        dispatch(resultActions.updateState(analysisResults));
        dispatch(
          resultActions.updateSelectedKey(
            OPERATION_API_UI_KEYS[Object.keys(analysisResults)[0]]
          )
        );
      } else {
        dispatch(
          updateStatus({
            message: CONTENT.COMMON.serverError,
            type: "failure",
            darkMode: true,
          })
        );
        dispatch(resultActions.resetState());
      }
    }
  };

  return (
    <section className={classes.operations}>
      <form onSubmit={handleFormSubmit}>
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
        <Upload
          id="chooseResume"
          label="Choose a resume"
          value={chooseResumeValue}
          changeHandler={chooseResumeChange}
          blurHandler={chooseResumeBlur}
          focusHandler={chooseResumeFocus}
          error={chooseResumeError}
          clearFile={chooseClearFile}
          isFocused={isChooseResumeFocused}
          isRequired
        />
        <Select
          id="serviceType"
          label="Choose a service"
          options={OPTIONS.SERVICE_TYPE}
          value={serviceTypeValue}
          changeHandler={serviceTypeChange}
          blurHandler={serviceTypeBlur}
          focusHandler={serviceTypeFocus}
          error={serviceTypeError}
          isFocused={isServiceTypeFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
        <Actions />
        <Button className={isLoading[FETCH] ? "loading" : ""}>
          {isLoading[FETCH]
            ? CONTENT.SPARK.operations.button.loading
            : CONTENT.SPARK.operations.button.default}
          <i className="bi bi-rocket-takeoff"></i>
        </Button>
      </form>
    </section>
  );
};

export default Operations;
