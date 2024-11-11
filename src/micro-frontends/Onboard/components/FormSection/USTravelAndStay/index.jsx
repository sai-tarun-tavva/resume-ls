import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import ListAdd from "../ListAdd";
import Address from "../Address";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { defaultAddress, inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  onboardingValidations,
} from "../../../../../utilities";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../../constants";
import {
  SECTIONS,
  FIELDS,
  US_STAY_ADDRESSES_OPTIONAL_VISA,
  PORT_OF_ENTRY_NOT_REQUIRED_VISA,
  PORT_OF_ENTRY_OPTIONAL_VISA,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * USTravelAndStay Component
 *
 * Handles the US travel and stay section of the onboarding process.
 * It validates, submits, and manages the user input for US entry month/year and stay addresses.
 *
 * @param {Object} props - The component props.
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered USTravelAndStay component.
 */
const USTravelAndStay = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
    data: {
      personal: { visaStatus },
      usTravelAndStay: { usEntry, stayAddresses },
    },
  } = useSelector((state) => state.input);

  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();

  const { usTravelAndStay: validations } = onboardingValidations;

  // Determine if the port of entry is required or optional based on visa status
  const isPortOfEntryNotRequired =
    PORT_OF_ENTRY_NOT_REQUIRED_VISA.includes(visaStatus);
  const isPortOfEntryOptional =
    PORT_OF_ENTRY_OPTIONAL_VISA.includes(visaStatus);

  // Determine if stay addresses in the US are optional based on visa status
  const isUSStayAddressesOptional =
    US_STAY_ADDRESSES_OPTIONAL_VISA.includes(visaStatus);

  // Handling entry date (Month and Year)
  const {
    value: usEntryValue,
    handleInputChange: usEntryChange,
    handleInputBlur: usEntryBlur,
    handleInputFocus: usEntryFocus,
    error: usEntryError,
    isFocused: isUsEntryFocused,
    forceValidations: forceUsEntryValidations,
  } = useInput(
    usEntry,
    (value) => validations.usEntry(value, isUSStayAddressesOptional),
    undefined,
    true
  );

  const stayAddressesRef = useRef();

  // Collect all errors for validation
  const allErrors = [usEntryError];
  const allValues = [
    !isPortOfEntryNotRequired && !isPortOfEntryOptional ? usEntryValue : true,
  ];

  // Check if the section is valid based on errors and values
  const isSectionValid = determineSectionValidity(allErrors, allValues);

  // Function to trigger validation
  const forceValidations = () => {
    forceUsEntryValidations();
  };

  /**
   * Handles form submission.
   * Validates the section and submits data to the Redux store.
   * Focuses on errors if any validation fails.
   */
  const submit = async () => {
    const { isSectionValid: areAddressesValid, listItems: addresses } =
      stayAddressesRef?.current?.submit?.();

    // If the section is invalid, force validation and focus errors
    if (!isSectionValid || !areAddressesValid) {
      if (!isPortOfEntryNotRequired) forceValidations();
      stayAddressesRef.current?.forceValidations?.();
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading[BUTTON]) {
      // Update fields in Redux store upon successful validation
      dispatch(
        inputActions.updateField({
          section: SECTIONS.US_TRAVEL_AND_STAY,
          field: FIELDS.US_TRAVEL_AND_STAY.US_ENTRY,
          value: usEntryValue,
        })
      );

      dispatch(
        inputActions.updateField({
          section: SECTIONS.US_TRAVEL_AND_STAY,
          field: FIELDS.US_TRAVEL_AND_STAY.STAY_ADDRESSES,
          value: addresses,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.US_TRAVEL_AND_STAY,
          field: FIELDS.COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  // Expose submit method to parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.onboardFormSection}
    >
      {/* Only display entry field if port of entry is required */}
      {!isPortOfEntryNotRequired && (
        <InputV2
          id="usEntry"
          label={sections.usTravelAndStay.monthYear}
          type="month"
          value={usEntryValue}
          changeHandler={usEntryChange}
          blurHandler={usEntryBlur}
          focusHandler={usEntryFocus}
          error={usEntryError}
          isFocused={isUsEntryFocused}
          extraClass={sectionClasses.fullInputWidth}
          isRequired={!isPortOfEntryOptional}
        />
      )}

      {/* Address section that can have multiple items */}
      <ListAdd
        label={sections.usTravelAndStay.stayAddressesList.label}
        helperText={sections.usTravelAndStay.stayAddressesList.helper}
        heading={sections.usTravelAndStay.stayAddressesList.heading}
        element={(props) => <Address {...props} />}
        savedListItems={
          stayAddresses.length > 0
            ? stayAddresses
            : !isUSStayAddressesOptional
            ? [defaultAddress]
            : []
        }
        newValue={defaultAddress}
        ref={stayAddressesRef}
        extraClass={sectionClasses.addressFullInputWidth}
        mandatoryItems={isUSStayAddressesOptional ? 0 : 1}
        maxItems={3}
      />
    </fieldset>
  );
});

USTravelAndStay.displayName = "USTravelAndStay";
export default USTravelAndStay;
