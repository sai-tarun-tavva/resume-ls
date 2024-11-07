import { useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const Onboarding = forwardRef((_, ref) => {
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
    value: statusValue,
    handleInputChange: statusChange,
    handleInputBlur: statusBlur,
    handleInputFocus: statusFocus,
    error: statusError,
    isFocused: isStatusFocused,
    forceValidations: forceStatusValidations,
  } = useInput(status, validations.status, undefined, true);

  const allErrors = [dateError, statusError];
  const allValues = [dateValue, statusValue];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceDateValidations();
    forceStatusValidations();
  };

  const submit = async () => {
    if (!isSectionValid) {
      forceValidations();
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading.button) {
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
          value: statusValue,
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
        label="Onboarding Date"
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
        label="Onboarding Status"
        options={OPTIONS.ONBOARDING_STATUS}
        value={statusValue}
        changeHandler={statusChange}
        blurHandler={statusBlur}
        focusHandler={statusFocus}
        error={statusError}
        isFocused={isStatusFocused}
        isRequired
      />
    </fieldset>
  );
});

Onboarding.displayName = "FormOnboarding";
export default Onboarding;
