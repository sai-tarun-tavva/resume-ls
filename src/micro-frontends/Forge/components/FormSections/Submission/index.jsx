import { useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading, useUI } from "../../../../../store";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  forgeValidations,
} from "../../../../../utilities";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../../constants";
import { SECTIONS, FIELDS, SUBMISSION_STATUS_LABELS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.FORGE.candidateForm;

/**
 * Submission Component
 *
 * Handles the submission section of the application, including fields for the submission date.
 * It validates the inputs and submits the data to the Redux store if the section is valid.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {boolean} props.isInNewRoute - Indicates if the component is in a new route.
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Submission component.
 */
const Submission = forwardRef(({ isInNewRoute }, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const formType = location.pathname.split("/")[3];

  const {
    currentSectionIndex,
    isEditMode,
    data: {
      [formType]: {
        submission: { date, by: submitBy },
      },
    },
  } = useSelector((state) => state.input);

  const { submission: validations } = forgeValidations;
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();
  const {
    state: { usernames },
  } = useUI();

  /**
   * Date Input Handling
   */
  const {
    value: dateValue,
    handleInputChange: dateChange,
    handleInputBlur: dateBlur,
    handleInputFocus: dateFocus,
    error: dateError,
    isFocused: isDateFocused,
    forceValidations: forceDateValidations,
  } = useInput(date, validations.date, undefined, true);

  const {
    value: submitByValue,
    handleInputChange: submitByChange,
    handleInputBlur: submitByBlur,
    handleInputFocus: submitByFocus,
    error: submitByError,
    isFocused: isSubmitByFocused,
    forceValidations: forceSubmitByValidations,
  } = useInput(submitBy, validations.submitBy, undefined, true);

  const allErrors = [submitByError, dateError];
  const allValues = [submitByValue, dateValue];

  /**
   * Determines if the section is valid based on the errors and values
   */
  const isSectionValid = determineSectionValidity(allErrors, allValues);

  /**
   * Forces validation for all inputs
   */
  const forceValidations = () => {
    forceDateValidations();
    forceSubmitByValidations();
  };

  /**
   * Handles form submission.
   * Validates the section and submits data to the Redux store.
   * Focuses on errors if any validation fails.
   */
  const submit = async () => {
    if (!isSectionValid) {
      forceValidations();
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading[BUTTON]) {
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].SUBMISSION,
          field: FIELDS[formType.toUpperCase()].SUBMISSION.DATE,
          value: dateValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].SUBMISSION,
          field: FIELDS[formType.toUpperCase()].SUBMISSION.BY,
          value: submitByValue,
        })
      );
      if (isInNewRoute)
        dispatch(
          inputActions.updateField({
            formType,
            section: SECTIONS[formType.toUpperCase()].SUBMISSION,
            field: FIELDS[formType.toUpperCase()].SUBMISSION.STATUS,
            value: SUBMISSION_STATUS_LABELS.SUBMITTED,
          })
        );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].SUBMISSION,
          field: FIELDS[formType.toUpperCase()].COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  // Expose submit method to parent via ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.forgeFormSection}
    >
      <InputV2
        id="submissionDate"
        type="date"
        label={sections.submission.date}
        value={dateValue}
        changeHandler={dateChange}
        blurHandler={dateBlur}
        focusHandler={dateFocus}
        error={dateError}
        isFocused={isDateFocused}
        isRequired
      />

      {usernames.length > 0 ? (
        <Select
          id="submissionBy"
          label={sections.submission.by[formType]}
          options={[
            { value: "", label: "" },
            ...usernames.map((username) => ({
              value: username,
              label: username,
            })),
          ]}
          value={submitByValue}
          changeHandler={submitByChange}
          blurHandler={submitByBlur}
          focusHandler={submitByFocus}
          error={submitByError}
          isFocused={isSubmitByFocused}
          isRequired
        />
      ) : (
        <InputV2
          id="submissionBy"
          label={sections.submission.by[formType]}
          value={submitByValue}
          changeHandler={submitByChange}
          blurHandler={submitByBlur}
          focusHandler={submitByFocus}
          error={submitByError}
          isFocused={isSubmitByFocused}
          isRequired
        />
      )}
    </fieldset>
  );
});

Submission.propTypes = {
  isInNewRoute: PropTypes.bool.isRequired,
};

Submission.displayName = "FormSubmission";
export default Submission;
