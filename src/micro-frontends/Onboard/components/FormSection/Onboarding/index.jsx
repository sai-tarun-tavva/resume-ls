import { useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  onboardingValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const Onboarding = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    data: {
      onboarding: { date, status },
    },
  } = useSelector((state) => state.input);
  const { onboarding: validations } = onboardingValidations;
  const sectionRef = useSectionInputsFocus(currentSectionIndex);

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
  const submit = () => {
    if (!isSectionValid) {
      forceValidations();
      return false; // return false to indicate the submission was invalid
    }

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
    return true; // return true to indicate successful submission
  };

  // Expose submit method to parent via ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div ref={sectionRef} className={sectionClasses.onboardFormSection}>
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
    </div>
  );
});

Onboarding.displayName = "FormOnboarding";
export default Onboarding;
