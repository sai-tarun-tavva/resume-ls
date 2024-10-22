import { forwardRef, useImperativeHandle } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useInput } from "../../../../Atoms/hooks";
import {
  determineSectionValidity,
  transformPhoneNumber,
} from "../../../../../utilities";
import classes from "./index.module.scss";

const Reference = forwardRef(
  ({ labels, defaultValue, validationFuncs, id }, ref) => {
    const {
      name: nameLabel,
      phone: phoneLabel,
      email: emailLabel,
      designation: designationLabel,
      company: companyLabel,
    } = labels;

    const {
      name: nameDefaultValue,
      phone: phoneDefaultValue,
      email: emailDefaultValue,
      designation: designationDefaultValue,
      company: companyDefaultValue,
    } = defaultValue;

    const {
      name: nameValidationFunc,
      phone: phoneValidationFunc,
      email: emailValidationFunc,
      designation: designationValidationFunc,
      company: companyValidationFunc,
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
      value: phoneValue,
      handleInputChange: phoneChange,
      handleInputBlur: phoneBlur,
      handleInputFocus: phoneFocus,
      error: phoneError,
      isFocused: isPhoneFocused,
      forceValidations: forcePhoneValidations,
    } = useInput(
      transformPhoneNumber(phoneDefaultValue),
      phoneValidationFunc,
      transformPhoneNumber,
      true
    );

    const {
      value: emailValue,
      handleInputChange: emailChange,
      handleInputBlur: emailBlur,
      handleInputFocus: emailFocus,
      error: emailError,
      isFocused: isEmailFocused,
      forceValidations: forceEmailValidations,
    } = useInput(emailDefaultValue, emailValidationFunc, undefined, true);

    const {
      value: designationValue,
      handleInputChange: designationChange,
      handleInputBlur: designationBlur,
      handleInputFocus: designationFocus,
      error: designationError,
      isFocused: isDesignationFocused,
      forceValidations: forceDesignationValidations,
    } = useInput(
      designationDefaultValue,
      designationValidationFunc,
      undefined,
      true
    );

    const {
      value: companyValue,
      handleInputChange: companyChange,
      handleInputBlur: companyBlur,
      handleInputFocus: companyFocus,
      error: companyError,
      isFocused: isCompanyFocused,
      forceValidations: forceCompanyValidations,
    } = useInput(companyDefaultValue, companyValidationFunc, undefined, true);

    const allErrors = [
      nameError,
      phoneError,
      emailError,
      designationError,
      companyError,
    ];
    const allValues = [
      nameValue,
      phoneValue,
      emailValue,
      designationValue,
      companyValue,
    ];
    const isSectionValid = determineSectionValidity(allErrors, allValues);
    const forceValidations = () => {
      forceNameValidations();
      forcePhoneValidations();
      forceEmailValidations();
      forceDesignationValidations();
      forceCompanyValidations();
    };

    const submit = () => {
      const referenceData = {
        name: nameValue,
        phone: phoneValue,
        email: emailValue,
        designation: designationValue,
        company: companyValue,
      };

      if (!isSectionValid) {
        forceValidations();
        return {
          isSectionValid: false,
          item: referenceData,
        };
      }

      return {
        isSectionValid: true,
        item: referenceData,
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

        <div className={classes.referenceRow}>
          <InputV2
            id={`${phoneLabel} ${id}`}
            label={`${phoneLabel} ${id}`}
            value={phoneValue}
            changeHandler={phoneChange}
            blurHandler={phoneBlur}
            focusHandler={phoneFocus}
            isFocused={isPhoneFocused}
            error={phoneError}
            extraClass={classes.halfInputWidth}
            isRequired
          />

          <InputV2
            id={`${emailLabel} ${id}`}
            label={`${emailLabel} ${id}`}
            value={emailValue}
            changeHandler={emailChange}
            blurHandler={emailBlur}
            focusHandler={emailFocus}
            isFocused={isEmailFocused}
            error={emailError}
            extraClass={classes.halfInputWidth}
            isRequired
          />
        </div>

        <div className={classes.referenceRow}>
          <InputV2
            id={`${designationLabel} ${id}`}
            label={`${designationLabel} ${id}`}
            value={designationValue}
            changeHandler={designationChange}
            blurHandler={designationBlur}
            focusHandler={designationFocus}
            isFocused={isDesignationFocused}
            error={designationError}
            extraClass={classes.halfInputWidth}
            isRequired
          />

          <InputV2
            id={`${companyLabel} ${id}`}
            label={`${companyLabel} ${id}`}
            value={companyValue}
            changeHandler={companyChange}
            blurHandler={companyBlur}
            focusHandler={companyFocus}
            isFocused={isCompanyFocused}
            error={companyError}
            extraClass={classes.halfInputWidth}
            isRequired
          />
        </div>
      </>
    );
  }
);

Reference.displayName = "Reference";
export default Reference;
