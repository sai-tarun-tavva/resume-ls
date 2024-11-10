import { forwardRef, useImperativeHandle, useRef } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Address from "../../FormSection/Address"; // Address input for the employer's address
import { useInput } from "../../../../Atoms/hooks";
import {
  determineSectionValidity,
  extractOnlyDigits,
  transformPhoneNumber,
} from "../../../../../utilities";
import classes from "./index.module.scss";

/**
 * PreviousExperience Component
 *
 * This component is used to collect information about the user's previous employer including:
 *  - Employer Name
 *  - Employer Phone Number
 *  - Employer Email ID
 *  - Employer Address (via the Address component)
 *
 * @param {Object} labels - Contains the labels for the input fields.
 * @param {Object} defaultValue - The default values for the fields.
 * @param {Object} validationFuncs - The validation functions for the fields.
 * @param {string} id - Unique identifier for the form fields.
 */
const PreviousExperience = forwardRef(
  ({ labels, defaultValue, validationFuncs, id }, ref) => {
    // Destructure the labels for each field
    const {
      employerName: nameLabel,
      email: emailIdLabel,
      phone: phoneNumberLabel,
      address: addressLabel,
    } = labels;
    const addressRef = useRef();

    // Set the default values for each input field
    const {
      employerName: nameDefaultValue,
      email: emailIdDefaultValue,
      phone: phoneNumberDefaultValue,
      address: addressDefaultValue,
    } = defaultValue;

    // Set validation functions for each field
    const {
      employerName: nameValidationFunc,
      email: emailIdValidationFunc,
      phone: phoneNumberValidationFunc,
    } = validationFuncs;

    // Use custom hooks for managing state and validation of inputs
    const {
      value: nameValue,
      handleInputChange: nameChange,
      handleInputBlur: nameBlur,
      handleInputFocus: nameFocus,
      error: nameError,
      isFocused: isNameFocused,
      forceValidations: forceNameValidations,
    } = useInput(nameDefaultValue, nameValidationFunc, undefined, true);

    const {
      value: emailIdValue,
      handleInputChange: emailIdChange,
      handleInputBlur: emailIdBlur,
      handleInputFocus: emailIdFocus,
      error: emailIdError,
      isFocused: isEmailIdFocused,
      forceValidations: forceEmailValidations,
    } = useInput(emailIdDefaultValue, emailIdValidationFunc, undefined, true);

    const {
      value: phoneNumberValue,
      handleInputChange: phoneNumberChange,
      handleInputBlur: phoneNumberBlur,
      handleInputFocus: phoneNumberFocus,
      error: phoneNumberError,
      isFocused: isPhoneNumberFocused,
      forceValidations: forcePhoneNumberValidations,
    } = useInput(
      transformPhoneNumber(phoneNumberDefaultValue),
      phoneNumberValidationFunc,
      transformPhoneNumber,
      true
    );

    // Collect all errors and values for the current section
    const allErrors = [nameError, emailIdError, phoneNumberError];
    const allValues = [nameValue, emailIdValue, phoneNumberValue];

    // Determine if the section is valid
    const isSectionValid = determineSectionValidity(allErrors, allValues);

    /**
     * Force validation for all fields in the PreviousExperience section.
     */
    const forceValidations = () => {
      forceNameValidations();
      forceEmailValidations();
      forcePhoneNumberValidations();
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

      const prevExp = {
        employerName: nameValue,
        phone: extractOnlyDigits(phoneNumberValue),
        email: emailIdValue,
        address,
      };

      // If any validation fails, return false and force validations
      if (!isSectionValid || isAddressValid === false) {
        forceValidations();
        addressRef.current?.forceValidations();
        return {
          isSectionValid: false,
          item: prevExp,
        };
      }

      return {
        isSectionValid: true,
        item: prevExp,
      };
    };

    // Exposing the submit method to the parent via ref
    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <>
        {/* Employer Name input field */}
        <InputV2
          id={`${nameLabel} ${id}`}
          label={`${nameLabel} ${id}`}
          value={nameValue}
          changeHandler={nameChange}
          blurHandler={nameBlur}
          focusHandler={nameFocus}
          isFocused={isNameFocused}
          error={nameError}
          extraClass={classes.fullInputWidth}
          isRequired
        />

        <div className={classes.prevExpRow}>
          {/* Email and Phone input fields */}
          <InputV2
            id={`${emailIdLabel} ${id}`}
            label={`${emailIdLabel} ${id}`}
            value={emailIdValue}
            changeHandler={emailIdChange}
            blurHandler={emailIdBlur}
            focusHandler={emailIdFocus}
            isFocused={isEmailIdFocused}
            error={emailIdError}
            extraClass={classes.halfInputWidth}
            isRequired
          />
          <InputV2
            id={`${phoneNumberLabel} ${id}`}
            label={`${phoneNumberLabel} ${id}`}
            value={phoneNumberValue}
            changeHandler={phoneNumberChange}
            blurHandler={phoneNumberBlur}
            focusHandler={phoneNumberFocus}
            isFocused={isPhoneNumberFocused}
            error={phoneNumberError}
            extraClass={classes.halfInputWidth}
            isRequired
          />
        </div>

        {/* Address input field for employer */}
        <Address
          heading={`${addressLabel} ${id}`}
          defaultValue={addressDefaultValue}
          id={`companyAddress${id}`}
          ref={addressRef}
          extraClass={classes.fullInputWidth}
        />
      </>
    );
  }
);

PreviousExperience.displayName = "PreviousExperience";
export default PreviousExperience;
