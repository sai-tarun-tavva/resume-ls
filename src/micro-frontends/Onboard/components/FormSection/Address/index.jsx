import { useDispatch, useSelector } from "react-redux";
import FormActions from "../../FormActions";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import { onboardingValidations } from "../../../../../utilities";
import { SECTIONS, FIELDS_ADDRESS, FIELDS } from "../../../constants";
import classes from "./index.module.scss";

const Address = () => {
  const dispatch = useDispatch();
  const {
    data: {
      personal: {
        currentLocation: { address1, address2, city, state, country, zipcode },
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
  } = useInput(address1, validations.address1, undefined, true);

  const {
    value: address2Value,
    handleInputChange: address2Change,
    handleInputBlur: address2Blur,
    handleInputFocus: address2Focus,
    error: address2Error,
    isFocused: isAddress2Focused,
  } = useInput(address2);

  const {
    value: cityValue,
    handleInputChange: cityChange,
    handleInputBlur: cityBlur,
    handleInputFocus: cityFocus,
    error: cityError,
    isFocused: isCityFocused,
    forceValidations: forceCityValidations,
  } = useInput(city, validations.city, undefined, true);

  const {
    value: stateValue,
    handleInputChange: stateChange,
    handleInputBlur: stateBlur,
    handleInputFocus: stateFocus,
    error: stateError,
    isFocused: isStateFocused,
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
  } = useInput(country, validations.country, undefined, true);

  const {
    value: zipcodeValue,
    handleInputChange: zipcodeChange,
    handleInputBlur: zipcodeBlur,
    handleInputFocus: zipcodeFocus,
    error: zipcodeError,
    isFocused: isZipcodeFocused,
    forceValidations: forceZipcodeValidations,
  } = useInput(zipcode, validations.zipcode, undefined, true);

  // Check if section is valid based on errors
  const isSectionValid =
    !address1Error &&
    !cityError &&
    !stateError &&
    !countryError &&
    !zipcodeError;

  // Check if values are empty to force validation
  const isValuesEmpty =
    !address1Value ||
    !cityValue ||
    !stateValue ||
    !countryValue ||
    !zipcodeValue;

  // Force all validations
  const forceValidations = () => {
    forceAddress1Validations();
    forceCityValidations();
    forceStateValidations();
    forceCountryValidations();
    forceZipcodeValidations();
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
    dispatch(inputActions.incrementCurrentSectionIndex());
  };

  return (
    <>
      <div className={classes.addressContainer}>
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

          <InputV2
            id="currentState"
            type="text"
            label="State"
            value={stateValue}
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
          <InputV2
            id="currentCountry"
            type="text"
            label="Country"
            value={countryValue}
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
      </div>

      <FormActions
        isNextDisabled={!isSectionValid}
        previousHandler={previousClickHandler}
        nextHandler={nextClickHandler}
      />
    </>
  );
};

Address.displayName = "FormAddress";
export default Address;
