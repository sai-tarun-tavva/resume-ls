import { forwardRef, useImperativeHandle, useRef } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Address from "../../FormSection/Address";
import { useInput } from "../../../../Atoms/hooks";
import {
  determineSectionValidity,
  transformPhoneNumber,
} from "../../../../../utilities";
import classes from "./index.module.scss";

const PreviousExperience = forwardRef(
  ({ labels, defaultValue, validationFuncs, id }, ref) => {
    const {
      employerName: nameLabel,
      email: emailIdLabel,
      phone: phoneNumberLabel,
      address: addressLabel,
    } = labels;
    const addressRef = useRef();
    const {
      employerName: nameDefaultValue,
      email: emailIdDefaultValue,
      phone: phoneNumberDefaultValue,
      address: addressDefaultValue,
    } = defaultValue;
    const {
      employerName: nameValidationFunc,
      email: emailIdValidationFunc,
      phone: phoneNumberValidationFunc,
    } = validationFuncs;

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

    const allErrors = [nameError, emailIdError, phoneNumberError];
    const allValues = [nameValue, emailIdValue, phoneNumberValue];

    const isSectionValid = determineSectionValidity(allErrors, allValues);
    const forceValidations = () => {
      forceNameValidations();
      forceEmailValidations();
      forcePhoneNumberValidations();
    };

    const submit = () => {
      const addressSubmitResult = addressRef.current?.submit?.();
      const isAddressValid = addressSubmitResult?.isSectionValid;
      const address = addressSubmitResult?.item;

      const prevExp = {
        name: nameValue,
        phone: phoneNumberValue,
        email: emailIdValue,
        address,
      };

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

    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <>
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
