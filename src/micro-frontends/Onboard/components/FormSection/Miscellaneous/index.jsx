import { forwardRef, useImperativeHandle } from "react";
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
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * Miscellaneous Component
 *
 * Handles the miscellaneous section of the onboarding process.
 * It validates, submits, and manages the user input for remarks and notes.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Miscellaneous component.
 */
const Miscellaneous = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
    data: {
      miscellaneous: { remarks, notes },
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

  // Input handling for the 'notes' field
  const {
    value: notesValue,
    handleInputChange: notesChange,
    handleInputBlur: notesBlur,
    handleInputFocus: notesFocus,
    error: notesError,
    isFocused: isNotesFocused,
  } = useInput(notes);

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
          section: SECTIONS.MISCELLANEOUS,
          field: FIELDS.MISCELLANEOUS.REMARKS,
          value: remarksValue,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.MISCELLANEOUS,
          field: FIELDS.MISCELLANEOUS.NOTES,
          value: notesValue,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.MISCELLANEOUS,
          field: FIELDS.COMMON.COMPLETED,
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
      className={sectionClasses.onboardFormSection}
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

      {/* Notes Textarea */}
      <Textarea
        id="notes"
        label={sections.miscellaneous.notes}
        value={notesValue}
        changeHandler={notesChange}
        blurHandler={notesBlur}
        focusHandler={notesFocus}
        error={notesError}
        isFocused={isNotesFocused}
        extraClass={sectionClasses.fullInputWidth}
      />
    </fieldset>
  );
});

Miscellaneous.displayName = "Miscellaneous";
export default Miscellaneous;
