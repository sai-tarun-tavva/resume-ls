import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import Select from "../../../../Atoms/components/Inputs/Select";
import Address from "../Address";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import { onboardingValidations } from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import classes from "./index.module.scss";

const Relocation = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    data: {
      relocation: { interested, preference },
    },
  } = useSelector((state) => state.input);
  const addressRef = useRef(); // Create a ref to call Address validation

  const { relocation: validations } = onboardingValidations;

  // Relocation validation and input handling
  const {
    value: interestedValue,
    handleInputChange: interestedChange,
    handleInputBlur: interestedBlur,
  } = useInput(
    interested === FIELDS.RELOCATION.INTERESTED.OPTIONS.YES ? true : false
  );

  const {
    value: preferenceValue,
    handleInputChange: preferenceChange,
    handleInputBlur: preferenceBlur,
    handleInputFocus: preferenceFocus,
    error: preferenceError,
    isFocused: isPreferenceFocused,
    forceValidations: forcePreferenceValidations,
    resetValue: resetPreference,
  } = useInput(preference, validations.stayPreference, undefined, true);

  useEffect(() => {
    resetPreference();
  }, [interestedValue, resetPreference]);

  useEffect(() => {
    addressRef.current?.resetValues?.();
  }, [preferenceValue]);

  // Group all errors and values for relocation
  const relocationErrors = [interestedValue ? preferenceError : false];
  const relocationValues = [interestedValue ? preferenceValue : true];

  const noRelocationErrors = relocationErrors.every((error) => !error);
  const allRelocationValuesPresent = relocationValues.every((value) => value);

  const isRelocationValid = noRelocationErrors && allRelocationValuesPresent;

  // Force Relocation validations
  const forceRelocationValidations = () => {
    if (interestedValue) forcePreferenceValidations();
  };

  const submit = () => {
    const isAddressValid = addressRef.current?.submit?.(); // Check if Address is valid

    if (!isRelocationValid || isAddressValid === false) {
      // isAddressValid is undefined when unmounted or not rendered
      forceRelocationValidations();
      addressRef.current?.forceValidations(); // Force Address validation
      return false;
    }

    // Dispatch actions for Relocation data
    dispatch(
      inputActions.updateField({
        section: SECTIONS.RELOCATION,
        field: FIELDS.RELOCATION.INTERESTED.VALUE,
        value: interestedValue
          ? FIELDS.RELOCATION.INTERESTED.OPTIONS.YES
          : FIELDS.RELOCATION.INTERESTED.OPTIONS.NO,
      })
    );
    if (interestedValue) {
      dispatch(
        inputActions.updateField({
          section: SECTIONS.RELOCATION,
          field: FIELDS.RELOCATION.PREFERENCE,
          value: preferenceValue,
        })
      );
    }
    return true;
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <>
      <Checkbox
        id="relocationInterested"
        label="Interested in Relocation?"
        value={interestedValue}
        changeHandler={interestedChange}
        blurHandler={interestedBlur}
        helperText="(Considered yes by default)"
        extraClass={classes.fullInputWidth}
        isRequired
      />
      {interestedValue && (
        <Select
          id="relocationPreference"
          label="Preference of stay"
          options={OPTIONS.STAY_PREFERENCE}
          value={preferenceValue}
          changeHandler={preferenceChange}
          blurHandler={preferenceBlur}
          focusHandler={preferenceFocus}
          error={preferenceError}
          isFocused={isPreferenceFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
      )}
      {preferenceValue === "other" && (
        <Address
          heading="Which address are you willing to relocate to?"
          ref={addressRef}
        />
      )}
    </>
  );
});

Relocation.displayName = "FormRelocation";
export default Relocation;
