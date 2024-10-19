import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormActions from "../../FormActions";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import { onboardingValidations } from "../../../../../utilities";
import { SECTIONS, FIELDS } from "../../../constants";
import classes from "./index.module.scss";

const Relocation = () => {
  const dispatch = useDispatch();
  const {
    data: {
      relocation: { interested, preference },
    },
  } = useSelector((state) => state.input);

  const { relocation: validations } = onboardingValidations;

  const {
    value: interestedValue,
    handleInputChange: interestedChange,
    handleInputBlur: interestedBlur,
    handleInputFocus: interestedFocus,
    error: interestedError,
    forceValidations: forceInterestedValidations,
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

  // Check if section is valid based on errors
  const isSectionValid =
    !interestedError && (interestedValue ? !preferenceError : true);

  // Check if values are empty to force validation
  const isValuesEmpty = interestedValue ? !preferenceValue : false;

  // Force all validations
  const forceValidations = () => {
    forceInterestedValidations();
    if (interestedValue) forcePreferenceValidations();
  };

  const previousClickHandler = (event) => {
    event.preventDefault();

    dispatch(inputActions.decrementCurrentSectionIndex());
  };

  const nextClickHandler = (event) => {
    event.preventDefault();

    if (isValuesEmpty) {
      forceValidations();
      return;
    }

    if (isSectionValid) {
      dispatch(
        inputActions.updateField({
          section: SECTIONS.RELOCATION,
          field: FIELDS.RELOCATION.INTERESTED.VALUE,
          value: interestedValue
            ? FIELDS.RELOCATION.INTERESTED.OPTIONS.YES
            : FIELDS.RELOCATION.INTERESTED.OPTIONS.NO,
        })
      );
      if (interestedValue)
        dispatch(
          inputActions.updateField({
            section: SECTIONS.RELOCATION,
            field: FIELDS.RELOCATION.PREFERENCE,
            value: preferenceValue,
          })
        );
      dispatch(inputActions.incrementCurrentSectionIndex());
    }
  };

  return (
    <>
      <div className={classes.relocationContainer}>
        <Checkbox
          id="relocationInterested"
          label="Interested in Relocation?"
          value={interestedValue}
          changeHandler={interestedChange}
          blurHandler={interestedBlur}
          focusHandler={interestedFocus}
          error={interestedError}
          helperText="(Considered yes by default)"
          extraClass={classes.fullInputWidth}
          isRequired
        />

        {interestedValue && (
          <Select
            id="relocationPreference"
            label="Preference of stay"
            options={[
              { value: "", label: "Select stay preference" },
              { value: "guesthouse", label: "Opt for guest house" },
              { value: "other", label: "Other" },
            ]}
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
      </div>

      <FormActions
        isNextDisabled={!isSectionValid}
        previousHandler={previousClickHandler}
        nextHandler={nextClickHandler}
      />
    </>
  );
};

Relocation.displayName = "FormRelocation";
export default Relocation;
