import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  extractOnlyDigits,
  focusErrorsIfAny,
  forgeValidations,
  transformPhoneNumber,
} from "../../../../../utilities";
import { CONTENT } from "../../../../../constants";
import { SECTIONS, FIELDS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { sections } = CONTENT.FORGE.candidateForm;

/**
 * Vendor Component
 *
 * Handles the vendor section of the form.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Vendor component.
 */
const Vendor = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const formType = location.pathname.split("/")[3];

  const {
    currentSectionIndex,
    isEditMode,
    data: {
      sales: {
        vendor: { name, company, phone, email, alternatePhone, extension },
      },
    },
  } = useSelector((state) => state.input);

  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { vendorOrEmployer: validations } = forgeValidations;

  // Input handlers
  const {
    value: nameValue,
    handleInputChange: nameChange,
    handleInputBlur: nameBlur,
    handleInputFocus: nameFocus,
    error: nameError,
    forceValidations: forceNameValidations,
  } = useInput(name, validations.name, undefined, true);

  const {
    value: companyValue,
    handleInputChange: companyChange,
    handleInputBlur: companyBlur,
    handleInputFocus: companyFocus,
    error: companyError,
    forceValidations: forceCompanyValidations,
  } = useInput(company, validations.companyName, undefined, true);

  const {
    value: phoneValue,
    handleInputChange: phoneChange,
    handleInputBlur: phoneBlur,
    handleInputFocus: phoneFocus,
    error: phoneError,
    forceValidations: forcePhoneValidations,
  } = useInput(
    transformPhoneNumber(phone),
    validations.phone,
    transformPhoneNumber,
    true
  );

  const {
    value: alternatePhoneValue,
    handleInputChange: alternatePhoneChange,
    handleInputBlur: alternatePhoneBlur,
    handleInputFocus: alternatePhoneFocus,
    error: alternatePhoneError,
    forceValidations: forceAlternatePhoneValidations,
  } = useInput(
    transformPhoneNumber(alternatePhone || ""),
    (value) => validations.phone(value, true),
    transformPhoneNumber,
    true
  );

  const {
    value: extensionValue,
    handleInputChange: extensionChange,
    handleInputBlur: extensionBlur,
    handleInputFocus: extensionFocus,
    error: extensionError,
    forceValidations: forceExtensionValidations,
  } = useInput(
    extension || "",
    (value) => validations.extension(value, true),
    undefined,
    true
  );

  const {
    value: emailValue,
    handleInputChange: emailChange,
    handleInputBlur: emailBlur,
    handleInputFocus: emailFocus,
    error: emailError,
    forceValidations: forceEmailValidations,
  } = useInput(email, validations.email, undefined, true);

  const allErrors = [
    nameError,
    companyError,
    phoneError,
    emailError,
    alternatePhoneError,
    extensionError,
  ];
  const allValues = [
    nameValue,
    companyValue,
    phoneValue,
    emailValue,
    alternatePhoneValue || true,
    extensionValue || true,
  ];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceNameValidations();
    forceCompanyValidations();
    forcePhoneValidations();
    forceAlternatePhoneValidations();
    forceExtensionValidations();
    forceEmailValidations();
  };

  const submit = () => {
    if (!isSectionValid) {
      focusErrorsIfAny(sectionRef);
      forceValidations();
    } else {
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].VENDOR,
          field: FIELDS[formType.toUpperCase()].VENDOR.NAME,
          value: nameValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].VENDOR,
          field: FIELDS[formType.toUpperCase()].VENDOR.COMPANY,
          value: companyValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].VENDOR,
          field: FIELDS[formType.toUpperCase()].VENDOR.PHONE,
          value: extractOnlyDigits(phoneValue),
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].VENDOR,
          field: FIELDS[formType.toUpperCase()].VENDOR.ALTERNATE_PHONE,
          value: extractOnlyDigits(alternatePhoneValue),
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].VENDOR,
          field: FIELDS[formType.toUpperCase()].VENDOR.EXTENSION,
          value: extensionValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].VENDOR,
          field: FIELDS[formType.toUpperCase()].VENDOR.EMAIL,
          value: emailValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].VENDOR,
          field: FIELDS.SALES.COMMON.COMPLETED,
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
          id="name"
          type="text"
          label={sections.vendorOrEmployer.name}
          value={nameValue}
          changeHandler={nameChange}
          blurHandler={nameBlur}
          focusHandler={nameFocus}
          error={nameError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
        <InputV2
          id="company"
          type="text"
          label={sections.vendorOrEmployer.company}
          value={companyValue}
          changeHandler={companyChange}
          blurHandler={companyBlur}
          focusHandler={companyFocus}
          error={companyError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>
      <div className={sectionClasses.formRow}>
        <InputV2
          id="phone"
          type="tel"
          label={sections.vendorOrEmployer.phone}
          value={phoneValue}
          changeHandler={phoneChange}
          blurHandler={phoneBlur}
          focusHandler={phoneFocus}
          error={phoneError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
        <InputV2
          id="alternatePhone"
          type="tel"
          label={sections.vendorOrEmployer.alternatePhone}
          value={alternatePhoneValue}
          changeHandler={alternatePhoneChange}
          blurHandler={alternatePhoneBlur}
          focusHandler={alternatePhoneFocus}
          error={alternatePhoneError}
          extraClass={sectionClasses.halfInputWidth}
        />
      </div>
      <div className={sectionClasses.formRow}>
        <InputV2
          id="extension"
          label={sections.vendorOrEmployer.extension}
          value={extensionValue}
          changeHandler={extensionChange}
          blurHandler={extensionBlur}
          focusHandler={extensionFocus}
          error={extensionError}
          extraClass={sectionClasses.halfInputWidth}
        />
        <InputV2
          id="email"
          type="email"
          label={sections.vendorOrEmployer.email}
          value={emailValue}
          changeHandler={emailChange}
          blurHandler={emailBlur}
          focusHandler={emailFocus}
          error={emailError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>
    </fieldset>
  );
});

Vendor.displayName = "Vendor";
export default Vendor;
