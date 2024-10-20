import {
  createRef,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "../../../../Atoms/components/Button";
import classes from "./index.module.scss";

const ListAdd = forwardRef(
  ({ label, itemLabel, element, savedListItems, helperText = "" }, ref) => {
    const [items, setItems] = useState(savedListItems);
    const itemRefs = useRef(items.map(() => createRef()));

    const addHandler = () => {
      setItems((prevItems) => [...prevItems, ""]);
      itemRefs.current.push(createRef());
    };

    const removeHandler = (indexToRemove) => {
      setItems((prevItems) =>
        prevItems.filter((_, index) => index !== indexToRemove)
      );
      itemRefs.current.splice(indexToRemove, 1);
    };

    const forceValidations = () => {
      itemRefs.current.forEach((itemRef) => {
        itemRef.current?.forceValidations?.(); // Call forceValidations on each ref
      });
    };

    const submit = () => {
      const results = itemRefs.current.map((itemRef, index) => {
        return itemRef.current?.submit?.(); // Call submit on each ref
      });

      const allValid = results.every((result) => result?.isSectionValid);

      return {
        isSectionValid: allValid,
        listItems: results.map((result) => result?.item),
      };
    };

    // Expose submit function via ref
    useImperativeHandle(ref, () => ({
      submit,
      forceValidations,
    }));

    return (
      <div className={classes.list}>
        <div className={classes.control}>
          <h3 className={classes.label}>
            {label}
            {helperText && (
              <small className={classes.helperText}>{helperText}</small>
            )}
          </h3>
          <Button
            type="button"
            className={classes.addButton}
            onClick={addHandler}
          >
            <i className="bi bi-plus-square-fill" />
          </Button>
        </div>
        {items.map((item, index) => (
          <div className={classes.listItem}>
            <Button
              type="button"
              className={classes.removeButton}
              onClick={() => removeHandler(index)}
            >
              <i className="bi bi-dash-square" />
            </Button>
            {element({
              id: index + 1,
              defaultValue: item,
              label: itemLabel,
              ref: itemRefs.current[index],
            })}
          </div>
        ))}
      </div>
    );
  }
);

ListAdd.displayName = "ListAdd";
export default ListAdd;
