import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../Address";
import { inputActions } from "../../../store";
import { FIELDS, SECTIONS } from "../../../constants";

const CurrentLocation = forwardRef((_, ref) => {
  const addressRef = useRef();
  const dispatch = useDispatch();
  const {
    data: {
      personal: { currentLocation },
    },
  } = useSelector((state) => state.input);

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

  return (
    <Address
      heading="Where are you currently located?"
      defaultValues={currentLocation}
      id="current"
      ref={addressRef}
    />
  );
});

CurrentLocation.displayName = "CurrentLocation";
export default CurrentLocation;
