import { forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import Textarea from "../../../../Atoms/components/Inputs/Textarea";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  onboardingValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import classes from "./index.module.scss";

const OfferLetter = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    data: {
      offerLetter: {
        status,
        marketingName,
        designation,
        startDate,
        endDate,
        rolesAndResponsibilities,
      },
    },
  } = useSelector((state) => state.input);

  const {
    offerLetter: {
      status: statusValidationFunc,
      marketingName: marketingNameValidationFunc,
      designation: designationValidationFunc,
      startDate: startDateValidationFunc,
      endDate: endDateValidationFunc,
      rolesAndResponsibilities: rolesAndResponsibilitiesValidationFunc,
    },
  } = onboardingValidations;

  const {
    value: statusValue,
    handleInputChange: statusChange,
    handleInputBlur: statusBlur,
    handleInputFocus: statusFocus,
    error: statusError,
    isFocused: isStatusFocused,
    forceValidations: forceStatusValidations,
  } = useInput(status, statusValidationFunc, undefined, true);

  const {
    value: marketingNameValue,
    handleInputChange: marketingNameChange,
    handleInputBlur: marketingNameBlur,
    handleInputFocus: marketingNameFocus,
    error: marketingNameError,
    isFocused: isMarketingNameFocused,
    forceValidations: forceMarketingNameValidations,
  } = useInput(marketingName, marketingNameValidationFunc, undefined, true);

  const {
    value: designationValue,
    handleInputChange: designationChange,
    handleInputBlur: designationBlur,
    handleInputFocus: designationFocus,
    error: designationError,
    isFocused: isDesignationFocused,
    forceValidations: forceDesignationValidations,
  } = useInput(designation, designationValidationFunc, undefined, true);

  const {
    value: startDateValue,
    handleInputChange: startDateChange,
    handleInputBlur: startDateBlur,
    handleInputFocus: startDateFocus,
    error: startDateError,
    isFocused: isStartDateFocused,
    forceValidations: forceStartDateValidations,
  } = useInput(startDate, startDateValidationFunc, undefined, true);

  const {
    value: endDateValue,
    handleInputChange: endDateChange,
    handleInputBlur: endDateBlur,
    handleInputFocus: endDateFocus,
    error: endDateError,
    isFocused: isEndDateFocused,
    forceValidations: forceEndDateValidations,
  } = useInput(endDate, endDateValidationFunc, undefined, true);

  const {
    value: rolesAndResponsibilitiesValue,
    handleInputChange: rolesAndResponsibilitiesChange,
    handleInputBlur: rolesAndResponsibilitiesBlur,
    handleInputFocus: rolesAndResponsibilitiesFocus,
    error: rolesAndResponsibilitiesError,
    isFocused: isrolesAndResponsibilitiesFocused,
    forceValidations: forceRolesValidations,
  } = useInput(
    rolesAndResponsibilities,
    rolesAndResponsibilitiesValidationFunc,
    undefined,
    true
  );

  const allErrors = [
    statusError,
    marketingNameError,
    designationError,
    startDateError,
    endDateError,
    rolesAndResponsibilitiesError,
  ];
  const allValues = [
    statusValue,
    marketingNameValue,
    designationValue,
    startDateValue,
    endDateValue,
    rolesAndResponsibilitiesValue,
  ];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceStatusValidations();
    forceMarketingNameValidations();
    forceDesignationValidations();
    forceStartDateValidations();
    forceEndDateValidations();
    forceRolesValidations();
  };

  const submit = () => {
    if (!isSectionValid) {
      forceValidations();
      return false;
    }

    dispatch(
      inputActions.updateField({
        section: SECTIONS.OFFER_LETTER,
        field: FIELDS.OFFER_LETTER.STATUS,
        value: statusValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.OFFER_LETTER,
        field: FIELDS.OFFER_LETTER.MARKETING_NAME,
        value: marketingNameValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.OFFER_LETTER,
        field: FIELDS.OFFER_LETTER.DESIGNATION,
        value: designationValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.OFFER_LETTER,
        field: FIELDS.OFFER_LETTER.START_DATE,
        value: startDateValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.OFFER_LETTER,
        field: FIELDS.OFFER_LETTER.END_DATE,
        value: endDateValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.OFFER_LETTER,
        field: FIELDS.OFFER_LETTER.ROLES_AND_RESPONSIBILITIES,
        value: rolesAndResponsibilitiesValue,
      })
    );

    return true;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <>
      <Select
        id="status"
        label="Status"
        value={statusValue}
        options={OPTIONS.OFFER_LETTER_STATUS}
        changeHandler={statusChange}
        blurHandler={statusBlur}
        focusHandler={statusFocus}
        error={statusError}
        isFocused={isStatusFocused}
        extraClass={classes.fullInputWidth}
        isRequired
      />
      <div className={classes.offerLetterRow}>
        <InputV2
          id="marketingName"
          label="Marketing Name"
          value={marketingNameValue}
          changeHandler={marketingNameChange}
          blurHandler={marketingNameBlur}
          focusHandler={marketingNameFocus}
          error={marketingNameError}
          isFocused={isMarketingNameFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />

        <InputV2
          id="designation"
          label="Designation"
          value={designationValue}
          changeHandler={designationChange}
          blurHandler={designationBlur}
          focusHandler={designationFocus}
          error={designationError}
          isFocused={isDesignationFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />
      </div>

      <div className={classes.offerLetterRow}>
        <InputV2
          id="startDate"
          label="Start Date"
          type="date"
          value={startDateValue}
          changeHandler={startDateChange}
          blurHandler={startDateBlur}
          focusHandler={startDateFocus}
          error={startDateError}
          isFocused={isStartDateFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />

        <InputV2
          id="endDate"
          label="End Date"
          type="date"
          value={endDateValue}
          changeHandler={endDateChange}
          blurHandler={endDateBlur}
          focusHandler={endDateFocus}
          error={endDateError}
          isFocused={isEndDateFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />
      </div>

      <Textarea
        id="rolesAndResponsibilities"
        label="Roles and Responsibilities"
        value={rolesAndResponsibilitiesValue}
        changeHandler={rolesAndResponsibilitiesChange}
        blurHandler={rolesAndResponsibilitiesBlur}
        focusHandler={rolesAndResponsibilitiesFocus}
        error={rolesAndResponsibilitiesError}
        isFocused={isrolesAndResponsibilitiesFocused}
        extraClass={classes.fullInputWidth}
        isRequired
      />
    </>
  );
});

OfferLetter.displayName = "OfferLetter";
export default OfferLetter;