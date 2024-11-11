import { useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  onboardingValidations,
} from "../../../../../utilities";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../../constants";
import {
  SECTIONS,
  FIELDS,
  OPTIONS,
  ONBOARDING_STATUS_VALUES,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * Onboarding Component
 *
 * Handles the onboarding section of the application, including fields for the onboarding date and status.
 * It validates the inputs and submits the data to the Redux store if the section is valid.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {boolean} props.isInNewRoute - Indicates if the component is in a new route.
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Onboarding component.
 */
const Onboarding = forwardRef(({ isInNewRoute }, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
    data: {
      onboarding: { date, status },
    },
  } = useSelector((state) => state.input);

  const { onboarding: validations } = onboardingValidations;
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();

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

  /**
   * Status Input Handling
   */
  const {
    value: statusValue,
    handleInputChange: statusChange,
    handleInputBlur: statusBlur,
    handleInputFocus: statusFocus,
    error: statusError,
    isFocused: isStatusFocused,
    forceValidations: forceStatusValidations,
  } = useInput(
    OPTIONS.ONBOARDING_STATUS.find(
      (statusOption) => statusOption.label === status
    )?.value || ONBOARDING_STATUS_VALUES.IN_PROGRESS,
    validations.status,
    undefined,
    true
  );

  const allErrors = [dateError, statusError];
  const allValues = [dateValue, statusValue];

  /**
   * Determines if the section is valid based on the errors and values
   */
  const isSectionValid = determineSectionValidity(allErrors, allValues);

  /**
   * Forces validation for all inputs
   */
  const forceValidations = () => {
    forceDateValidations();
    forceStatusValidations();
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
          section: SECTIONS.ONBOARDING,
          field: FIELDS.ONBOARDING.DATE,
          value: dateValue,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.ONBOARDING,
          field: FIELDS.ONBOARDING.STATUS,
          value: OPTIONS.ONBOARDING_STATUS.find(
            (status) => status.value === statusValue
          )?.label,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.ONBOARDING,
          field: FIELDS.COMMON.COMPLETED,
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
      className={sectionClasses.onboardFormSection}
    >
      <InputV2
        id="onboardingDate"
        type="date"
        label={sections.onboarding.date}
        value={dateValue}
        changeHandler={dateChange}
        blurHandler={dateBlur}
        focusHandler={dateFocus}
        error={dateError}
        isFocused={isDateFocused}
        isRequired
      />
      <Select
        id="onboardingStatus"
        label={sections.onboarding.status.label}
        options={OPTIONS.ONBOARDING_STATUS.filter(
          (option) => option.value !== ONBOARDING_STATUS_VALUES.COMPLETED
        )}
        value={statusValue}
        changeHandler={statusChange}
        blurHandler={statusBlur}
        focusHandler={statusFocus}
        error={statusError}
        helperText={isInNewRoute ? sections.onboarding.status.helper : ""}
        isFocused={isStatusFocused}
        isRequired
      />
    </fieldset>
  );
});

Onboarding.propTypes = {
  isInNewRoute: PropTypes.bool.isRequired,
};

Onboarding.displayName = "FormOnboarding";
export default Onboarding;
