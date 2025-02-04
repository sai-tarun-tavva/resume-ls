import { forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import Textarea from "../../../../Atoms/components/Inputs/Textarea";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  onboardingValidations,
} from "../../../../../utilities";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../../constants";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * OfferLetter Component
 *
 * Handles the offer letter section of the onboarding process.
 * It validates, submits, and manages the user input for offer letter status, marketing name, designation, start date, end date, and roles and responsibilities.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered OfferLetter component.
 */
const OfferLetter = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
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
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();

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

  /**
   * Handle input for the "Status" field
   */
  const {
    value: statusValue,
    handleInputChange: statusChange,
    handleInputBlur: statusBlur,
    handleInputFocus: statusFocus,
    error: statusError,
    isFocused: isStatusFocused,
    forceValidations: forceStatusValidations,
  } = useInput(status, statusValidationFunc, undefined, true);

  const isStatusApplicable = statusValue !== "notApplicable";

  /**
   * Handle input for the "Marketing Name" field
   */
  const {
    value: marketingNameValue,
    handleInputChange: marketingNameChange,
    handleInputBlur: marketingNameBlur,
    handleInputFocus: marketingNameFocus,
    error: marketingNameError,
    isFocused: isMarketingNameFocused,
    forceValidations: forceMarketingNameValidations,
  } = useInput(marketingName, marketingNameValidationFunc, undefined, true);

  /**
   * Handle input for the "Designation" field
   */
  const {
    value: designationValue,
    handleInputChange: designationChange,
    handleInputBlur: designationBlur,
    handleInputFocus: designationFocus,
    error: designationError,
    isFocused: isDesignationFocused,
    forceValidations: forceDesignationValidations,
  } = useInput(designation, designationValidationFunc, undefined, true);

  /**
   * Handle input for the "Start Date" field
   */
  const {
    value: startDateValue,
    handleInputChange: startDateChange,
    handleInputBlur: startDateBlur,
    handleInputFocus: startDateFocus,
    error: startDateError,
    isFocused: isStartDateFocused,
    forceValidations: forceStartDateValidations,
  } = useInput(startDate, startDateValidationFunc, undefined, true);

  /**
   * Handle input for the "End Date" field
   */
  const {
    value: endDateValue,
    handleInputChange: endDateChange,
    handleInputBlur: endDateBlur,
    handleInputFocus: endDateFocus,
    error: endDateError,
    isFocused: isEndDateFocused,
    forceValidations: forceEndDateValidations,
  } = useInput(endDate, endDateValidationFunc, undefined, true);

  /**
   * Handle input for the "Roles and Responsibilities" field
   */
  const {
    value: rolesAndResponsibilitiesValue,
    handleInputChange: rolesAndResponsibilitiesChange,
    handleInputBlur: rolesAndResponsibilitiesBlur,
    handleInputFocus: rolesAndResponsibilitiesFocus,
    error: rolesAndResponsibilitiesError,
    isFocused: isRolesAndResponsibilitiesFocused,
    forceValidations: forceRolesValidations,
  } = useInput(
    rolesAndResponsibilities,
    rolesAndResponsibilitiesValidationFunc,
    undefined,
    true
  );

  // Group all errors and values for validation
  const sharedErrors = [statusError, marketingNameError, designationError];
  const sharedValues = [statusValue, marketingNameValue, designationValue];

  const additionalErrors = [
    startDateError,
    endDateError,
    rolesAndResponsibilitiesError,
  ];
  const additionalValues = [
    startDateValue,
    endDateValue,
    rolesAndResponsibilitiesValue,
  ];

  const allErrors = isStatusApplicable
    ? [...sharedErrors, ...additionalErrors]
    : sharedErrors;
  const allValues = isStatusApplicable
    ? [...sharedValues, ...additionalValues]
    : sharedValues;

  /**
   * Determines if the offer letter section is valid based on errors and values
   */
  const isSectionValid = determineSectionValidity(allErrors, allValues);

  /**
   * Forces validation for all inputs
   */
  const forceValidations = () => {
    forceStatusValidations();
    forceMarketingNameValidations();
    forceDesignationValidations();

    if (isStatusApplicable) {
      forceStartDateValidations();
      forceEndDateValidations();
      forceRolesValidations();
    }
  };

  /**
   * Handles form submission.
   * Validates the offer letter section and submits data to the Redux store.
   * Focuses on errors if any validation fails.
   */
  const submit = async () => {
    if (!isSectionValid) {
      forceValidations();
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading[BUTTON]) {
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
          value: isStatusApplicable ? startDateValue : "",
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.OFFER_LETTER,
          field: FIELDS.OFFER_LETTER.END_DATE,
          value: isStatusApplicable ? endDateValue : "",
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.OFFER_LETTER,
          field: FIELDS.OFFER_LETTER.ROLES_AND_RESPONSIBILITIES,
          value: isStatusApplicable ? rolesAndResponsibilitiesValue : "",
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.OFFER_LETTER,
          field: FIELDS.COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  // Expose submit method to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.onboardFormSection}
    >
      <Select
        id="status"
        label={sections.offerLetter.status}
        value={statusValue}
        options={OPTIONS.OFFER_LETTER_STATUS}
        changeHandler={statusChange}
        blurHandler={statusBlur}
        focusHandler={statusFocus}
        error={statusError}
        isFocused={isStatusFocused}
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />

      <div className={sectionClasses.formRow}>
        <InputV2
          id="marketingName"
          label={sections.offerLetter.marketingName}
          value={marketingNameValue}
          changeHandler={marketingNameChange}
          blurHandler={marketingNameBlur}
          focusHandler={marketingNameFocus}
          error={marketingNameError}
          isFocused={isMarketingNameFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />

        <InputV2
          id="designation"
          label={sections.offerLetter.designation}
          value={designationValue}
          changeHandler={designationChange}
          blurHandler={designationBlur}
          focusHandler={designationFocus}
          error={designationError}
          isFocused={isDesignationFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>

      {isStatusApplicable && (
        <>
          <div className={sectionClasses.formRow}>
            <InputV2
              id="startDate"
              label={sections.offerLetter.startDate}
              type="date"
              value={startDateValue}
              changeHandler={startDateChange}
              blurHandler={startDateBlur}
              focusHandler={startDateFocus}
              error={startDateError}
              isFocused={isStartDateFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />

            <InputV2
              id="endDate"
              label={sections.offerLetter.endDate}
              type="date"
              value={endDateValue}
              changeHandler={endDateChange}
              blurHandler={endDateBlur}
              focusHandler={endDateFocus}
              error={endDateError}
              isFocused={isEndDateFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>

          <Textarea
            id="rolesAndResponsibilities"
            label={sections.offerLetter.rolesAndResponsibilities}
            value={rolesAndResponsibilitiesValue}
            changeHandler={rolesAndResponsibilitiesChange}
            blurHandler={rolesAndResponsibilitiesBlur}
            focusHandler={rolesAndResponsibilitiesFocus}
            error={rolesAndResponsibilitiesError}
            isFocused={isRolesAndResponsibilitiesFocused}
            extraClass={sectionClasses.fullInputWidth}
            isRequired
          />
        </>
      )}
    </fieldset>
  );
});

OfferLetter.displayName = "OfferLetter";
export default OfferLetter;
