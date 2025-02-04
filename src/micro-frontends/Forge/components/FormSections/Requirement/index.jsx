import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import Textarea from "../../../../Atoms/components/Inputs/Textarea";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  forgeValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import { CONTENT, ROUTES } from "../../../../../constants";
import states from "../../../../../constants/countries.json";
import sectionClasses from "../sections.module.scss";

const { sections } = CONTENT.FORGE.candidateForm;

/**
 * Requirement Component
 *
 * Handles the requirement (job) section of the form.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Requirement component.
 */
const Requirement = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const formType = location.pathname.split("/")[3];

  const isSales = formType === ROUTES.FORGE.SALES.VIEW;

  const {
    currentSectionIndex,
    isEditMode,
    data: {
      [formType]: {
        requirement: {
          clientName,
          position,
          rate: { frequency: rateFrequency, value: rate },
          terms,
          city,
          state,
          primeVendor,
          implementor,
        },
      },
    },
  } = useSelector((state) => state.input);

  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { requirement: validations } = forgeValidations;

  // Input handlers for all fields
  const {
    value: clientNameValue,
    handleInputChange: clientNameChange,
    handleInputBlur: clientNameBlur,
    handleInputFocus: clientNameFocus,
    error: clientNameError,
    forceValidations: forceClientNameValidations,
  } = useInput(clientName, validations.clientName, undefined, true);

  const {
    value: positionValue,
    handleInputChange: positionChange,
    handleInputBlur: positionBlur,
    handleInputFocus: positionFocus,
    error: positionError,
    forceValidations: forcepositionValidations,
  } = useInput(position, validations.position, undefined, true);

  const {
    value: rateFrequencyValue,
    handleInputChange: rateFrequencyChange,
    handleInputBlur: rateFrequencyBlur,
    handleInputFocus: rateFrequencyFocus,
    error: rateFrequencyError,
    forceValidations: forceRateFrequencyValidations,
  } = useInput(rateFrequency, validations.rateFrequency, undefined, true);

  const {
    value: rateValue,
    handleInputChange: rateChange,
    handleInputBlur: rateBlur,
    handleInputFocus: rateFocus,
    error: rateError,
    forceValidations: forceRateValidations,
  } = useInput(rate, validations.rate, undefined, true);

  const {
    value: termsValue,
    handleInputChange: termsChange,
    handleInputBlur: termsBlur,
    handleInputFocus: termsFocus,
    error: termsError,
    forceValidations: forceTermsValidations,
  } = useInput(terms, validations.terms, undefined, true);

  const {
    value: cityValue,
    handleInputChange: cityChange,
    handleInputBlur: cityBlur,
    handleInputFocus: cityFocus,
    error: cityError,
    forceValidations: forceCityValidations,
  } = useInput(city, validations.city, undefined, true);

  const {
    value: stateValue,
    handleInputChange: stateChange,
    handleInputBlur: stateBlur,
    error: stateError,
    forceValidations: forceStateValidations,
  } = useInput(state, validations.state, undefined, true);

  const {
    value: primeVendorValue,
    handleInputChange: primeVendorChange,
    handleInputBlur: primeVendorBlur,
    handleInputFocus: primeVendorFocus,
    error: primeVendorError,
    forceValidations: forcePrimeVendorValidations,
  } = useInput(primeVendor, validations.primeVendor, undefined, true);

  const {
    value: implementorValue,
    handleInputChange: implementorChange,
    handleInputBlur: implementorBlur,
    handleInputFocus: implementorFocus,
    error: implementorError,
    forceValidations: forceImplementorValidations,
  } = useInput(implementor, validations.implementor, undefined, true);

  let allErrors = [
    clientNameError,
    positionError,
    rateFrequencyError,
    rateError,
    termsError,
  ];

  let allValues = [
    clientNameValue,
    positionValue,
    rateFrequencyValue,
    rateValue,
    termsValue,
  ];

  if (isSales) {
    allErrors = [
      ...allErrors,
      cityError,
      stateError,
      primeVendorError,
      implementorError,
    ];
    allValues = [
      ...allValues,
      cityValue,
      stateValue,
      primeVendorValue,
      implementorValue,
    ];
  }

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  // Function to force validations on all inputs
  const forceValidations = () => {
    forceClientNameValidations();
    forcepositionValidations();
    forceRateFrequencyValidations();
    forceRateValidations();
    forceTermsValidations();

    if (isSales) {
      forceCityValidations();
      forceStateValidations();
      forcePrimeVendorValidations();
      forceImplementorValidations();
    }
  };

  const submit = () => {
    if (!isSectionValid) {
      forceValidations();
      focusErrorsIfAny(sectionRef);
    } else {
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].REQUIREMENT.CLIENT_NAME,
          value: clientNameValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].REQUIREMENT.POSITION,
          value: positionValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].REQUIREMENT.RATE.LABEL,
          value: {
            [FIELDS[formType.toUpperCase()].REQUIREMENT.RATE.FREQUENCY]:
              rateFrequencyValue,
            [FIELDS[formType.toUpperCase()].REQUIREMENT.RATE.VALUE]: rateValue,
          },
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].REQUIREMENT.TERMS,
          value: termsValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].REQUIREMENT.CITY,
          value: cityValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].REQUIREMENT.STATE,
          value: stateValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].REQUIREMENT.PRIME_VENDOR,
          value: primeVendorValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].REQUIREMENT.IMPLEMENTOR,
          value: implementorValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].REQUIREMENT,
          field: FIELDS[formType.toUpperCase()].COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.forgeFormSection}
    >
      <div className={sectionClasses.formRow}>
        <InputV2
          id="clientName"
          type="text"
          label={sections.requirement.clientName}
          value={clientNameValue}
          changeHandler={clientNameChange}
          blurHandler={clientNameBlur}
          focusHandler={clientNameFocus}
          error={clientNameError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
        <InputV2
          id="position"
          type="text"
          label={sections.requirement.position}
          value={positionValue}
          changeHandler={positionChange}
          blurHandler={positionBlur}
          focusHandler={positionFocus}
          error={positionError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>
      <div className={sectionClasses.formRow}>
        <Select
          id="rateFrequency"
          label={sections.requirement.rateFreq}
          options={OPTIONS.RATE_FREQUENCY}
          value={rateFrequencyValue}
          changeHandler={rateFrequencyChange}
          blurHandler={rateFrequencyBlur}
          focusHandler={rateFrequencyFocus}
          error={rateFrequencyError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
        <InputV2
          id="rate"
          type="number"
          label={sections.requirement.rate}
          value={rateValue}
          changeHandler={rateChange}
          blurHandler={rateBlur}
          focusHandler={rateFocus}
          error={rateError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>
      <Textarea
        id="terms"
        label={sections.requirement.terms}
        value={termsValue}
        changeHandler={termsChange}
        blurHandler={termsBlur}
        focusHandler={termsFocus}
        error={termsError}
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />
      {isSales && (
        <>
          {" "}
          <div className={sectionClasses.formRow}>
            <InputV2
              id="city"
              type="text"
              label={sections.requirement.city}
              value={cityValue}
              changeHandler={cityChange}
              blurHandler={cityBlur}
              focusHandler={cityFocus}
              error={cityError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
            <Select
              id="state"
              label={sections.requirement.state}
              value={stateValue}
              options={[
                { value: "", label: "" },
                { value: "Remote", label: "REMOTE" },
                ...states["USA"],
              ]}
              changeHandler={stateChange}
              blurHandler={stateBlur}
              error={stateError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>
          <div className={sectionClasses.formRow}>
            <InputV2
              id="primeVendor"
              type="text"
              label={sections.requirement.primeVendor}
              value={primeVendorValue}
              changeHandler={primeVendorChange}
              blurHandler={primeVendorBlur}
              focusHandler={primeVendorFocus}
              error={primeVendorError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
            <InputV2
              id="implementor"
              type="text"
              label={sections.requirement.implementor}
              value={implementorValue}
              changeHandler={implementorChange}
              blurHandler={implementorBlur}
              focusHandler={implementorFocus}
              error={implementorError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>
        </>
      )}
    </fieldset>
  );
});

Requirement.displayName = "Requirement";
export default Requirement;
