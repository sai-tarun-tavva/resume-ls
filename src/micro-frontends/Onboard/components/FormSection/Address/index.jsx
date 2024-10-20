import { useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress, inputActions } from "../../../store";
import { onboardingValidations } from "../../../../../utilities";
import { SECTIONS, FIELDS_ADDRESS, FIELDS, OPTIONS } from "../../../constants";
import classes from "./index.module.scss";

const getStateOptions = (country) => {
  switch (country) {
    case "india":
      return OPTIONS.STATE_INDIA;
    case "usa":
      return OPTIONS.STATE_USA;
    default:
      return OPTIONS.STATE_USA;
  }
};

const Address = forwardRef(
  ({ heading = "Where are you currently located?" }, ref) => {
    const dispatch = useDispatch();
    const {
      data: {
        personal: {
          currentLocation: {
            address1,
            address2,
            city,
            state,
            country,
            zipcode,
          },
        },
      },
    } = useSelector((state) => state.input);

    const { address: validations } = onboardingValidations;

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

    const {
      value: address2Value,
      handleInputChange: address2Change,
      handleInputBlur: address2Blur,
      handleInputFocus: address2Focus,
      error: address2Error,
      isFocused: isAddress2Focused,
      resetValue: resetAddress2,
    } = useInput(address2);

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

    const {
      value: stateValue,
      handleInputChange: stateChange,
      handleInputBlur: stateBlur,
      handleInputFocus: stateFocus,
      error: stateError,
      isFocused: isStateFocused,
      resetValue: resetState,
      forceValidations: forceStateValidations,
    } = useInput(state, validations.state, undefined, true);

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

    const {
      value: zipcodeValue,
      handleInputChange: zipcodeChange,
      handleInputBlur: zipcodeBlur,
      handleInputFocus: zipcodeFocus,
      error: zipcodeError,
      isFocused: isZipcodeFocused,
      forceValidations: forceZipcodeValidations,
      resetValue: resetZipcode,
    } = useInput(zipcode, validations.zipcode, undefined, true);

    // Group all errors and values dynamically
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

    const noErrors = allErrors.every((error) => !error); // Ensure no errors
    const allValuesPresent = allValues.every((value) => value); // Ensure all values are filled

    const isSectionValid = noErrors && allValuesPresent;

    const forceValidations = () => {
      forceAddress1Validations();
      forceCityValidations();
      forceStateValidations();
      forceCountryValidations();
      forceZipcodeValidations();
    };

    const resetValues = () => {
      resetAddress1();
      resetAddress2();
      resetCity();
      resetState();
      resetCountry();
      resetZipcode();

      dispatch(
        inputActions.updateField({
          section: SECTIONS.PERSONAL,
          field: FIELDS.PERSONAL.CURRENT_LOCATION,
          value: defaultAddress,
        })
      );
    };

    const submit = () => {
      if (!isSectionValid) {
        forceValidations();
        return false;
      }

      dispatch(
        inputActions.updateField({
          section: SECTIONS.PERSONAL,
          field: FIELDS.PERSONAL.CURRENT_LOCATION,
          value: {
            [FIELDS_ADDRESS.ADDRESS1]: address1Value,
            [FIELDS_ADDRESS.ADDRESS2]: address2Value,
            [FIELDS_ADDRESS.CITY]: cityValue,
            [FIELDS_ADDRESS.STATE]: stateValue,
            [FIELDS_ADDRESS.COUNTRY]: countryValue,
            [FIELDS_ADDRESS.ZIPCODE]: zipcodeValue,
          },
        })
      );
      return true;
    };

    // Expose methods to parent using ref
    useImperativeHandle(ref, () => ({
      submit,
      forceValidations,
      resetValues,
    }));

    return (
      <>
        {heading && <h4 className={classes.heading}>{heading}</h4>}
        <div className={classes.addressRow}>
          <InputV2
            id="currentAddress1"
            type="text"
            label="Address Line 1"
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
            id="currentAddress2"
            type="text"
            label="Address Line 2"
            value={address2Value}
            changeHandler={address2Change}
            blurHandler={address2Blur}
            focusHandler={address2Focus}
            error={address2Error}
            isFocused={isAddress2Focused}
            extraClass={classes.halfInputWidth}
          />
        </div>

        <div className={classes.addressRow}>
          <InputV2
            id="currentCity"
            type="text"
            label="City"
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
            id="currentState"
            label="State"
            value={stateValue}
            options={getStateOptions(countryValue)}
            changeHandler={stateChange}
            blurHandler={stateBlur}
            focusHandler={stateFocus}
            error={stateError}
            isFocused={isStateFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />
        </div>

        <div className={classes.addressRow}>
          <Select
            id="currentCountry"
            label="Country"
            value={countryValue}
            options={OPTIONS.COUNTRY}
            changeHandler={countryChange}
            blurHandler={countryBlur}
            focusHandler={countryFocus}
            error={countryError}
            isFocused={isCountryFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />

          <InputV2
            id="currentZipcode"
            type="text"
            label="Zipcode"
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
