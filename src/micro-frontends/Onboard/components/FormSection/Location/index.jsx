import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../Address";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress, inputActions } from "../../../store";
import { areObjectsEqual, focusErrorsIfAny } from "../../../../../utilities";
import {
  FIELDS,
  SECTIONS,
  HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA,
  HOME_ADDRESS_CONTACT_OPTIONAL_VISA,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";

const Location = forwardRef((_, ref) => {
  const usaLocRef = useRef();
  const indiaLocRef = useRef();
  const dispatch = useDispatch();

  const {
    currentSectionIndex,
    data: {
      personal: { usaLocation, indiaLocation, visaStatus },
    },
  } = useSelector((state) => state.input);
  const sectionRef = useSectionInputsFocus(currentSectionIndex);

  // Determine if home address is not required based on visa status
  const isExemptFromHomeAddress =
    HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA.includes(visaStatus);

  // Determine if home address is optional based on visa status
  const isHomeAddressOptional =
    HOME_ADDRESS_CONTACT_OPTIONAL_VISA.includes(visaStatus);

  // If not exempt and not optional, then it's required
  const shouldShowHomeAddress = !isExemptFromHomeAddress;

  const {
    value: hasHomeCountryAddress,
    handleInputChange: handleHasHomeCountryChange,
    handleInputBlur: handleHasHomeCountryBlur,
  } = useInput(false);

  const hasFormChanged = (usaAddress, indiaAddress) => {
    return (
      !areObjectsEqual(usaAddress, usaLocation) ||
      !areObjectsEqual(indiaAddress, indiaLocation)
    );
  };

  const submit = () => {
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

    if (!isUSAAddressValid || isIndiaAddressValid === false) {
      focusErrorsIfAny(sectionRef);
      return false;
    }

    if (hasFormChanged(usaAddress, indiaAddress)) {
      // Update store with validated addresses
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
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div ref={sectionRef} className={sectionClasses.onboardFormSection}>
      <Address
        heading="Address in USA"
        defaultValue={usaLocation}
        id="current"
        ref={usaLocRef}
      />

      {shouldShowHomeAddress && (
        <>
          {isHomeAddressOptional && (
            <Checkbox
              id="hasIndianAddress"
              label="Have any address in India (if applicable) or another country?"
              value={hasHomeCountryAddress}
              changeHandler={handleHasHomeCountryChange}
              blurHandler={handleHasHomeCountryBlur}
              helperText="(Considered no by default)"
              extraClass={sectionClasses.fullInputWidth}
              isRequired
            />
          )}

          {(!isHomeAddressOptional || hasHomeCountryAddress) && (
            <Address
              heading={!isHomeAddressOptional ? "Address in India" : ""}
              defaultValue={indiaLocation}
              id="current"
              ref={indiaLocRef}
              isRequired
            />
          )}
        </>
      )}
    </div>
  );
});

Location.displayName = "Location";
export default Location;
