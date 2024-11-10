import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../Address";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { defaultAddress, inputActions } from "../../../store";
import { focusErrorsIfAny } from "../../../../../utilities";
import {
  LOADING_ACTION_TYPES,
  INPUT_TYPES,
  CONTENT,
} from "../../../../../constants";
import {
  FIELDS,
  SECTIONS,
  HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA,
  HOME_ADDRESS_CONTACT_OPTIONAL_VISA,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * Location Component
 *
 * Handles the location section of the onboarding process.
 * It validates, submits, and manages user input for both USA and India location addresses.
 * Displays the India location address input based on visa status and user selection.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Location component.
 */
const Location = forwardRef((_, ref) => {
  const usaLocRef = useRef(); // Reference for the USA address component
  const indiaLocRef = useRef(); // Reference for the India address component
  const dispatch = useDispatch();
  const { isLoading } = useLoading();

  const {
    currentSectionIndex,
    isEditMode,
    data: {
      personal: { usaLocation, indiaLocation, visaStatus },
    },
  } = useSelector((state) => state.input);
  const sectionRef = useSectionInputsFocus(currentSectionIndex);

  /**
   * Determines if the user is exempt from providing a home address based on their visa status.
   * If the visa status includes specific values, home address is not required.
   */
  const isExemptFromHomeAddress =
    HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA.includes(visaStatus);

  /**
   * Determines if the home address is optional based on the visa status.
   * If the visa status includes specific values, home address is optional.
   */
  const isHomeAddressOptional =
    HOME_ADDRESS_CONTACT_OPTIONAL_VISA.includes(visaStatus);

  /**
   * If home address is not exempt, it will be required by default.
   */
  const shouldShowHomeAddress = !isExemptFromHomeAddress;

  // Input handling for the checkbox that tracks if the user has a home country address
  const {
    value: hasHomeCountryAddress,
    handleInputChange: handleHasHomeCountryChange,
    handleInputBlur: handleHasHomeCountryBlur,
  } = useInput(false, undefined, undefined, undefined, INPUT_TYPES.CHECKBOX);

  /**
   * Handles form submission for the location section.
   * Validates the addresses and submits data to the Redux store if valid.
   * If there are any validation errors, focuses on the fields with errors.
   */
  const submit = async () => {
    // Validate USA address (always required)
    const usaAddressResult = usaLocRef.current?.submit?.();
    const isUSAAddressValid = usaAddressResult?.isSectionValid;
    const usaAddress = usaAddressResult?.item;

    // Initialize India address validation results
    let isIndiaAddressValid = true;
    let indiaAddress = defaultAddress;

    // Validate India address if:
    // 1. User is not exempt from providing home address AND
    // 2. Either it's mandatory OR user opted to provide it when optional
    if (
      shouldShowHomeAddress &&
      (!isHomeAddressOptional || hasHomeCountryAddress)
    ) {
      const indiaAddressResult = indiaLocRef.current?.submit?.();
      isIndiaAddressValid = indiaAddressResult?.isSectionValid;
      indiaAddress = indiaAddressResult?.item || defaultAddress;
    }

    // If any address is invalid, focus on errors
    if (!isUSAAddressValid || isIndiaAddressValid === false) {
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading[BUTTON]) {
      // Update the store with validated addresses
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PERSONAL,
          field: FIELDS.PERSONAL.USA_LOCATION,
          value: usaAddress,
        })
      );

      dispatch(
        inputActions.updateField({
          section: SECTIONS.PERSONAL,
          field: FIELDS.PERSONAL.INDIA_LOCATION,
          value: indiaAddress,
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  // Expose submit method to parent component via ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.onboardFormSection}
    >
      {/* USA Address Section */}
      <Address
        heading={sections.location.usaHeading}
        defaultValue={usaLocation}
        id="current"
        ref={usaLocRef}
      />

      {/* India Address Section, based on visa status */}
      {shouldShowHomeAddress && (
        <>
          {/* Checkbox for optional India address */}
          {isHomeAddressOptional && (
            <Checkbox
              id="hasIndianAddress"
              label={sections.location.haveIndian.label}
              value={hasHomeCountryAddress}
              changeHandler={handleHasHomeCountryChange}
              blurHandler={handleHasHomeCountryBlur}
              helperText={sections.location.haveIndian.helper}
              extraClass={sectionClasses.fullInputWidth}
              isRequired
            />
          )}

          {/* India address field appears if the address is mandatory or user opted to provide it */}
          {(!isHomeAddressOptional || hasHomeCountryAddress) && (
            <Address
              heading={
                !isHomeAddressOptional ? sections.location.indiaHeading : ""
              }
              defaultValue={indiaLocation}
              id="current"
              ref={indiaLocRef}
              isRequired
            />
          )}
        </>
      )}
    </fieldset>
  );
});

Location.displayName = "Location";
export default Location;
