import { forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "../../../../Atoms/components/Inputs/Textarea";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { inputActions } from "../../../store";
import { focusErrorsIfAny } from "../../../../../utilities";
import { SECTIONS, FIELDS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

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

  const {
    value: remarksValue,
    handleInputChange: remarksChange,
    handleInputBlur: remarksBlur,
    handleInputFocus: remarksFocus,
    error: remarksError,
    isFocused: isRemarksFocused,
  } = useInput(remarks);

  const {
    value: notesValue,
    handleInputChange: notesChange,
    handleInputBlur: notesBlur,
    handleInputFocus: notesFocus,
    error: notesError,
    isFocused: isNotesFocused,
  } = useInput(notes);

  const submit = async () => {
    focusErrorsIfAny(sectionRef);

    if (!isLoading.button) {
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
      className={sectionClasses.onboardFormSection}
    >
      <Textarea
        id="remarks"
        label="Remarks"
        value={remarksValue}
        changeHandler={remarksChange}
        blurHandler={remarksBlur}
        focusHandler={remarksFocus}
        error={remarksError}
        isFocused={isRemarksFocused}
        extraClass={sectionClasses.fullInputWidth}
      />

      <Textarea
        id="notes"
        label="Notes"
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
