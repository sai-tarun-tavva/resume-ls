import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch } from "react-redux";
import Address from "../Address";
import { inputActions } from "../../../store";
import { FIELDS, SECTIONS } from "../../../constants";

const CurrentLocation = forwardRef((_, ref) => {
  const addressRef = useRef();
  const dispatch = useDispatch();

  const submit = () => {
    const { isAddressValid, address } = addressRef.current?.submit?.(); // Check if Address is valid

    if (!isAddressValid) {
      addressRef.current?.forceValidations(); // Force Address validation
      return false;
    }

    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.CURRENT_LOCATION,
        value: address,
      })
    );

    return true;
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return <Address ref={addressRef} />;
});

CurrentLocation.displayName = "CurrentLocation";
export default CurrentLocation;
