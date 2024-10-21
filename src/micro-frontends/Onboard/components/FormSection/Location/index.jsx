import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../Address";
import { inputActions } from "../../../store";
import { FIELDS, SECTIONS } from "../../../constants";

const Location = forwardRef((_, ref) => {
  const usaLocRef = useRef();
  const indiaLocRef = useRef();
  const dispatch = useDispatch();
  const {
    data: {
      personal: { usaLocation, indiaLocation },
    },
  } = useSelector((state) => state.input);

  const submit = () => {
    const { isSectionValid: isUSAAddressValid, item: usaAddress } =
      usaLocRef.current?.submit?.(); // Check if Address is valid
    const { isSectionValid: isIndiaAddressValid, item: indiaAddress } =
      indiaLocRef.current?.submit?.();

    if (!isUSAAddressValid || !isIndiaAddressValid) {
      usaLocRef.current?.forceValidations?.(); // Force Address validation
      indiaLocRef.current?.forceValidations?.();
      return false;
    }

    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.USA_LOCATION,
        value: usaAddress,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.INDIA_LOCATION,
        value: indiaAddress,
      })
    );

    return true;
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <>
      <Address
        heading="Address in USA"
        defaultValue={usaLocation}
        id="current"
        ref={usaLocRef}
      />
      <Address
        heading="Address in India"
        defaultValue={indiaLocation}
        id="current"
        ref={indiaLocRef}
      />
    </>
  );
});

Location.displayName = "Location";
export default Location;
