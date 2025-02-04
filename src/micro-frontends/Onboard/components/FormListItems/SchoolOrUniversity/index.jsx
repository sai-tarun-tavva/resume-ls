import { forwardRef, useImperativeHandle, useRef } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Address from "../../FormSection/Address"; // Address input for the employer's address
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress } from "../../../store";
import { determineSectionValidity } from "../../../../../utilities";
import classes from "./index.module.scss";

/**
 * SchoolOrUniversity Component
 *
 * This component is used to collect information about the user's school or university including:
 *  - School or University Name
 *  - Passed Month and year
 *  - Stream
 *  - School or University Address (via the Address component)
 *
 * @param {Object} labels - Contains the labels for the input fields.
 * @param {Object} defaultValue - The default values for the fields.
 * @param {Object} validationFuncs - The validation functions for the fields.
 * @param {string} id - Unique identifier for the form fields.
 * @param {Boolean} isUniversityDetailsRequired - Flag to determine the university details requirement.
 */
const SchoolOrUniversity = forwardRef(
  (
    { labels, defaultValue, validationFuncs, id, isUniversityDetailsRequired },
    ref
  ) => {
    const addressRef = useRef();

    // Destructure the labels for each field
    const {
      universityName: nameLabel,
      stream: streamLabel,
      passedMonthAndYear: monthAndYearLabel,
      address: addressLabel,
    } = labels;

    // Set the default values for each input field
    const {
      universityName: nameDefaultValue,
      stream: streamDefaultValue,
      passedMonthAndYear: monthAndYearDefaultValue,
      address: addressDefaultValue,
    } = defaultValue;

    // Set validation functions for each field
    const {
      universityName: nameValidationFunc,
      stream: streamValidationFunc,
      passedMonthAndYear: monthAndYearValidationFunc,
    } = validationFuncs;

    // Use custom hooks for managing state and validation of inputs
    const {
      value: universityNameValue,
      handleInputChange: universityNameChange,
      handleInputBlur: universityNameBlur,
      handleInputFocus: universityNameFocus,
      error: universityNameError,
      isFocused: isUniversityNameFocused,
      forceValidations: forceUniversityNameValidations,
    } = useInput(nameDefaultValue, nameValidationFunc, undefined, true);

    const {
      value: passedMonthAndYearValue,
      handleInputChange: passedMonthAndYearChange,
      handleInputBlur: passedMonthAndYearBlur,
      handleInputFocus: passedMonthAndYearFocus,
      error: passedMonthAndYearError,
      isFocused: isPassedMonthAndYearFocused,
      forceValidations: forcePassedMonthAndYearValidations,
    } = useInput(
      monthAndYearDefaultValue,
      monthAndYearValidationFunc,
      undefined,
      true
    );

    const {
      value: streamValue,
      handleInputChange: streamChange,
      handleInputBlur: streamBlur,
      handleInputFocus: streamFocus,
      error: streamError,
      isFocused: isStreamFocused,
      forceValidations: forceStreamValidations,
    } = useInput(streamDefaultValue, streamValidationFunc, undefined, true);

    // Collect all errors and values for the current section
    const allErrors = [
      universityNameError,
      passedMonthAndYearError,
      streamError,
    ];
    const allValues = [
      universityNameValue,
      passedMonthAndYearValue,
      streamValue,
    ];

    // Determine if the section is valid
    const isSectionValid = determineSectionValidity(allErrors, allValues);

    /**
     * Force validation for all fields in the SchoolOrUniversity section.
     */
    const forceValidations = () => {
      forceUniversityNameValidations();
      forcePassedMonthAndYearValidations();
      forceStreamValidations();
    };

    /**
     * Handles form submission and validates all fields, including the Address field.
     * If the section is valid, it returns the collected data, otherwise returns errors.
     *
     * @returns {Object} - Contains validation status and collected reference data.
     */
    const submit = () => {
      const addressSubmitResult = addressRef.current?.submit?.();
      const isAddressValid = addressSubmitResult?.isSectionValid;
      const address = addressSubmitResult?.item;

      const education = {
        universityName: universityNameValue,
        stream: streamValue,
        passedMonthAndYear: passedMonthAndYearValue,
        address: address || defaultAddress,
      };

      // If any validation fails, return false and force validations
      if (!isSectionValid || isAddressValid === false) {
        forceValidations();
        addressRef.current?.forceValidations();
        return {
          isSectionValid: false,
          item: education,
        };
      }

      return {
        isSectionValid: true,
        item: education,
      };
    };

    // Exposing the submit method to the parent via ref
    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <>
        <div className={classes.educationRow}>
          <InputV2
            id={`${nameLabel} ${id}`}
            label={`${nameLabel} ${id}`}
            value={universityNameValue}
            changeHandler={universityNameChange}
            blurHandler={universityNameBlur}
            focusHandler={universityNameFocus}
            error={universityNameError}
            isFocused={isUniversityNameFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />

          <InputV2
            id={`${monthAndYearLabel} ${id}`}
            label={`${monthAndYearLabel} ${id}`}
            type="month"
            value={passedMonthAndYearValue}
            changeHandler={passedMonthAndYearChange}
            blurHandler={passedMonthAndYearBlur}
            focusHandler={passedMonthAndYearFocus}
            error={passedMonthAndYearError}
            isFocused={isPassedMonthAndYearFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />
        </div>

        <InputV2
          id={`${streamLabel} ${id}`}
          label={`${streamLabel} ${id}`}
          value={streamValue}
          changeHandler={streamChange}
          blurHandler={streamBlur}
          focusHandler={streamFocus}
          error={streamError}
          isFocused={isStreamFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
        {isUniversityDetailsRequired && (
          <Address
            heading={`${addressLabel} ${id}`}
            defaultValue={addressDefaultValue}
            id={`universityAddress${id}`}
            ref={addressRef}
            extraClass={classes.fullInputWidth}
          />
        )}
      </>
    );
  }
);

SchoolOrUniversity.displayName = "SchoolOrUniversity";
export default SchoolOrUniversity;
