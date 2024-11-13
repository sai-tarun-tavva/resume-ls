import { useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useInput } from "../../../../Atoms/hooks";
import {
  determineSectionValidity,
  getLabelByValue,
  onboardingValidations,
} from "../../../../../utilities";
import { FIELDS_ADDRESS, OPTIONS } from "../../../constants";
import classes from "./index.module.scss";
import states from "../../../constants/countries.json";
import { CONTENT } from "../../../../../constants";

let isInitial = true;

/**
 * Address Component
 *
 * Handles the address section of the form, including fields like Address Line 1,
 * Address Line 2, City, State, Country, and Zipcode.
 * It also validates the input and manages state dynamically based on country selection.
 *
 * @param {Object} props - The props object passed down from the parent
 * @param {string} props.heading - The heading for the address section (optional)
 * @param {Object} props.defaultValue - Default address values including address1, address2, city, state, country, zipcode
 * @param {string} props.id - Unique ID for the form section
 * @param {string} props.extraClass - Additional class names for styling
 * @returns {JSX.Element} - Rendered address form fields
 */
const Address = forwardRef(
  (
    {
      heading = "",
      defaultValue: { address1, address2, city, state, country, zipcode },
      id = "",
      extraClass = "",
    },
    ref
  ) => {
    const { address: validations } = onboardingValidations;
    const firstInputRef = useRef();

    /**
     * Address Line 1 Input Field (State and Validation)
     */
    const {
      value: address1Value,
      handleInputChange: address1Change,
      handleInputBlur: address1Blur,
      handleInputFocus: address1Focus,
      error: address1Error,
      isFocused: isAddress1Focused,
      forceValidations: forceAddress1Validations,
      resetValue: resetAddress1,
    } = useInput(address1, validations.address1, undefined, true);

    /**
     * Address Line 2 Input Field (State and Validation)
     */
    const {
      value: address2Value,
      handleInputChange: address2Change,
      handleInputBlur: address2Blur,
      handleInputFocus: address2Focus,
      error: address2Error,
      isFocused: isAddress2Focused,
      resetValue: resetAddress2,
    } = useInput(address2);

    /**
     * City Input Field (State and Validation)
     */
    const {
      value: cityValue,
      handleInputChange: cityChange,
      handleInputBlur: cityBlur,
      handleInputFocus: cityFocus,
      error: cityError,
      isFocused: isCityFocused,
      forceValidations: forceCityValidations,
      resetValue: resetCity,
    } = useInput(city, validations.city, undefined, true);

    /**
     * State Input Field (State and Validation)
     */
    const {
      value: stateValue,
      handleInputChange: stateChange,
      handleInputBlur: stateBlur,
      handleInputFocus: stateFocus,
      error: stateError,
      isFocused: isStateFocused,
      resetValue: resetState,
      clearValue: clearState,
      forceValidations: forceStateValidations,
    } = useInput(state, validations.state, undefined, true);

    /**
     * Country Input Field (State and Validation)
     */
    const {
      value: countryValue,
      handleInputChange: countryChange,
      handleInputBlur: countryBlur,
      handleInputFocus: countryFocus,
      error: countryError,
      isFocused: isCountryFocused,
      forceValidations: forceCountryValidations,
      resetValue: resetCountry,
    } = useInput(country, validations.country, undefined, true);

    /**
     * Zipcode Input Field (State and Validation)
     */
    const {
      value: zipcodeValue,
      handleInputChange: zipcodeChange,
      handleInputBlur: zipcodeBlur,
      handleInputFocus: zipcodeFocus,
      error: zipcodeError,
      isFocused: isZipcodeFocused,
      forceValidations: forceZipcodeValidations,
      resetValue: resetZipcode,
    } = useInput(
      zipcode,
      (value) => validations.zipcode(value, countryValue),
      undefined,
      true
    );

    /**
     * Effect Hook to force zip code validations based on country selection
     */
    useEffect(() => {
      // force zip code validations based on new country's zipcode regex
      if (!isInitial) {
        clearState();
        forceZipcodeValidations();
      }

      isInitial = true;
    }, [countryValue, forceZipcodeValidations, clearState]);

    // Group all errors and values dynamically for validation
    const allErrors = [
      address1Error,
      cityError,
      stateError,
      countryError,
      zipcodeError,
    ];

    const allValues = [
      address1Value,
      cityValue,
      stateValue,
      countryValue,
      zipcodeValue,
    ];

    /**
     * Validates the entire section (address form)
     */
    const isSectionValid = determineSectionValidity(allErrors, allValues);

    /**
     * Forces validation for all address fields
     */
    const forceValidations = () => {
      forceAddress1Validations();
      forceCityValidations();
      forceStateValidations();
      forceCountryValidations();
      forceZipcodeValidations();
    };

    /**
     * Resets all address fields to their default values
     */
    const resetValues = () => {
      resetAddress1();
      resetAddress2();
      resetCity();
      resetState();
      resetCountry();
      resetZipcode();
    };

    /**
     * Submits the form data if the section is valid
     * @returns {Object} - Validated item data or error state
     */
    const submit = () => {
      if (!isSectionValid) {
        forceValidations();
        return { isSectionValid: false, item: null };
      }

      return {
        isSectionValid: true,
        item: {
          [FIELDS_ADDRESS.ADDRESS1]: address1Value,
          [FIELDS_ADDRESS.ADDRESS2]: address2Value,
          [FIELDS_ADDRESS.CITY]: cityValue,
          [FIELDS_ADDRESS.STATE]: stateValue,
          [FIELDS_ADDRESS.COUNTRY]: countryValue,
          [FIELDS_ADDRESS.ZIPCODE]: zipcodeValue,
        },
      };
    };

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      submit,
      forceValidations,
      resetValues,
      focusFirstInput: () => {
        firstInputRef.current?.focus();
      },
    }));

    return (
      <>
        {heading && <h4 className={classes.heading}>{heading}</h4>}
        <div className={`${classes.addressRow} ${extraClass}`}>
          <InputV2
            ref={firstInputRef}
            id={`${id}-address1`}
            type="text"
            label={CONTENT.ONBOARD.candidateForm.address.address1}
            value={address1Value}
            changeHandler={address1Change}
            blurHandler={address1Blur}
            focusHandler={address1Focus}
            error={address1Error}
            isFocused={isAddress1Focused}
            extraClass={classes.halfInputWidth}
            isRequired
          />

          <InputV2
            id={`${id}-address2`}
            type="text"
            label={CONTENT.ONBOARD.candidateForm.address.address2}
            value={address2Value}
            changeHandler={address2Change}
            blurHandler={address2Blur}
            focusHandler={address2Focus}
            error={address2Error}
            isFocused={isAddress2Focused}
            extraClass={classes.halfInputWidth}
          />
        </div>

        <div className={`${classes.addressRow} ${extraClass}`}>
          <InputV2
            id={`${id}-city`}
            type="text"
            label={CONTENT.ONBOARD.candidateForm.address.city}
            value={cityValue}
            changeHandler={cityChange}
            blurHandler={cityBlur}
            focusHandler={cityFocus}
            error={cityError}
            isFocused={isCityFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />

          <Select
            id={`${id}-state`}
            label={CONTENT.ONBOARD.candidateForm.address.state}
            value={stateValue}
            options={[
              { value: "", label: "" },
              ...(states[getLabelByValue(OPTIONS.COUNTRY, countryValue)] ||
                states["USA"]),
            ]}
            changeHandler={stateChange}
            blurHandler={stateBlur}
            focusHandler={stateFocus}
            error={stateError}
            isFocused={isStateFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />
        </div>

        <div className={`${classes.addressRow} ${extraClass}`}>
          <Select
            id={`${id}-country`}
            label={CONTENT.ONBOARD.candidateForm.address.country}
            value={countryValue}
            options={[{ value: "", label: "" }, ...OPTIONS.COUNTRY]}
            changeHandler={countryChange}
            blurHandler={countryBlur}
            focusHandler={countryFocus}
            error={countryError}
            isFocused={isCountryFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />

          <InputV2
            id={`${id}-zipcode`}
            type="text"
            label={CONTENT.ONBOARD.candidateForm.address.zipcode}
            value={zipcodeValue}
            changeHandler={zipcodeChange}
            blurHandler={zipcodeBlur}
            focusHandler={zipcodeFocus}
            error={zipcodeError}
            isFocused={isZipcodeFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />
        </div>
      </>
    );
  }
);

Address.displayName = "FormAddress";
export default Address;
