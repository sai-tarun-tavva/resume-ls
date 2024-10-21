import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../Address";
import { inputActions } from "../../../store";
import { FIELDS, SECTIONS } from "../../../constants";

const Location = forwardRef((_, ref) => {
  const addressRef = useRef();
  const dispatch = useDispatch();
  const {
    data: {
      personal: { location },
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
        field: FIELDS.PERSONAL.LOCATION,
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
      defaultValues={location}
      id="current"
      ref={addressRef}
    />
  );
});

Location.displayName = "Location";
export default Location;
