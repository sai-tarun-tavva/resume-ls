import { useImperativeHandle, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useSectionInputsFocus, useUpdateCandidate } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  onboardingValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const Onboarding = forwardRef((isInNewRoute, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    data: {
      onboarding: { date, status },
    },
  } = useSelector((state) => state.input);
  const { onboarding: validations } = onboardingValidations;
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { updateCandidate } = useUpdateCandidate();

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

  const hasFormChanged = () => dateValue !== date || statusValue !== status;

  const submit = async () => {
    let moveForward = false;

    if (!isSectionValid) {
      forceValidations();
      focusErrorsIfAny(sectionRef);
    } else if (hasFormChanged()) {
      const isAPICallSuccessful = await updateCandidate();
      if (isAPICallSuccessful) {
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
        moveForward = true;
      }
    } else {
      moveForward = true;
    }

    if (moveForward && isInNewRoute) {
      dispatch(inputActions.incrementCurrentSectionIndex());
    }
  };

  // Expose submit method to parent via ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset ref={sectionRef} className={sectionClasses.onboardFormSection}>
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
