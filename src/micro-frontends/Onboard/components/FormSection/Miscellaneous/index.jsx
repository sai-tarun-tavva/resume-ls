import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "../../../../Atoms/components/Inputs/Textarea";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import { SECTIONS, FIELDS } from "../../../constants";
import classes from "./index.module.scss";

const Miscellaneous = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    data: {
      miscellaneous: { remarks, notes },
    },
  } = useSelector((state) => state.input);
  const firstInputRef = useRef();

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

  const submit = () => {
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

    return true;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  useEffect(() => {
    if (currentSectionIndex === 9) {
      const timer = setTimeout(() => firstInputRef.current.focus(), 500);

      return () => clearTimeout(timer);
    }
  }, [currentSectionIndex]);

  return (
    <>
      <Textarea
        ref={firstInputRef}
        id="remarks"
        label="Remarks"
        value={remarksValue}
        changeHandler={remarksChange}
        blurHandler={remarksBlur}
        focusHandler={remarksFocus}
        error={remarksError}
        isFocused={isRemarksFocused}
        extraClass={classes.fullInputWidth}
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
        extraClass={classes.fullInputWidth}
      />
    </>
  );
});

Miscellaneous.displayName = "Miscellaneous";
export default Miscellaneous;
