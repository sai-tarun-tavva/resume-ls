import { forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "../../../../Atoms/components/Inputs/Textarea";
import { useSectionInputsFocus, useUpdateCandidate } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useStatus } from "../../../../../store";
import { inputActions } from "../../../store";
import { focusErrorsIfAny } from "../../../../../utilities";
import { SECTIONS, FIELDS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const Miscellaneous = forwardRef(({ isInNewRoute }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentSectionIndex,
    isEditMode,
    data: {
      miscellaneous: { remarks, notes },
    },
  } = useSelector((state) => state.input);
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { updateCandidate } = useUpdateCandidate();
  const { updateStatus } = useStatus();

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

  const hasFormChanged = () => {
    return remarksValue !== remarks || notesValue !== notes;
  };

  const submit = async () => {
    let moveForward = false;
    focusErrorsIfAny(sectionRef);

    if (hasFormChanged()) {
      const isAPICallSuccessful = await updateCandidate();

      if (isAPICallSuccessful) {
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
        moveForward = true;
      }
    } else {
      moveForward = true;
    }
    if (moveForward && isInNewRoute) {
      updateStatus({
        message: "Successfully added new candidate details!",
        type: "success",
      });
      navigate("..");
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
