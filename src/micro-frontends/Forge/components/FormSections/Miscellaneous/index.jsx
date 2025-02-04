import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "../../../../Atoms/components/Inputs/Textarea";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { inputActions } from "../../../store";
import { focusErrorsIfAny } from "../../../../../utilities";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../../constants";
import { SECTIONS, FIELDS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.FORGE.candidateForm;

/**
 * Miscellaneous Component
 *
 * Handles the miscellaneous section of the sales or recruiting process.
 * It validates, submits, and manages the user input for remarks.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Miscellaneous component.
 */
const Miscellaneous = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const formType = location.pathname.split("/")[3];

  const {
    currentSectionIndex,
    isEditMode,
    data: {
      [formType]: {
        miscellaneous: { remarks },
      },
    },
  } = useSelector((state) => state.input);

  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();

  // Input handling for the 'remarks' field
  const {
    value: remarksValue,
    handleInputChange: remarksChange,
    handleInputBlur: remarksBlur,
    handleInputFocus: remarksFocus,
    error: remarksError,
    isFocused: isRemarksFocused,
  } = useInput(remarks);

  /**
   * Handles form submission for the miscellaneous section.
   * If there are errors, focuses on the fields with errors.
   * Submits the form data to the Redux store if valid.
   */
  const submit = async () => {
    focusErrorsIfAny(sectionRef); // Focus on any error fields

    if (!isLoading[BUTTON]) {
      // Dispatch actions to update the remarks and notes fields in the store
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].MISCELLANEOUS,
          field: FIELDS[formType.toUpperCase()].MISCELLANEOUS.REMARKS,
          value: remarksValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].MISCELLANEOUS,
          field: FIELDS[formType.toUpperCase()].COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  // Expose submit method to parent component using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.forgeFormSection}
    >
      {/* Remarks Textarea */}
      <Textarea
        id="remarks"
        label={sections.miscellaneous.remarks}
        value={remarksValue}
        changeHandler={remarksChange}
        blurHandler={remarksBlur}
        focusHandler={remarksFocus}
        error={remarksError}
        isFocused={isRemarksFocused}
        extraClass={sectionClasses.fullInputWidth}
      />
    </fieldset>
  );
});

Miscellaneous.displayName = "Miscellaneous";
export default Miscellaneous;
