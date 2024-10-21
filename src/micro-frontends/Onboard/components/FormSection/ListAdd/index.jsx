import {
  createRef,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Button from "../../../../Atoms/components/Button";
import classes from "./index.module.scss";

const ListAdd = forwardRef(
  (
    {
      label,
      itemLabels,
      element,
      savedListItems,
      validationFuncs,
      helperText = "",
      newValue,
      mandatoryItems = 0, // by default nothing is mandatory
    },
    ref
  ) => {
    const [items, setItems] = useState(
      savedListItems.map((item, index) => ({
        id: `${index}-${Date.now()}`,
        value: item,
      }))
    );
    const itemRefs = useRef(new Map());

    useEffect(() => {
      // Initialize refs for existing items
      items.forEach((item) => {
        if (!itemRefs.current.has(item.id)) {
          itemRefs.current.set(item.id, createRef());
        }
      });

      // Clean up refs for removed items
      itemRefs.current.forEach((_, key) => {
        if (!items.find((item) => item.id === key)) {
          itemRefs.current.delete(key);
        }
      });
    }, [items]);

    const addHandler = () => {
      const newItem = {
        id: `${items.length}-${Date.now()}`,
        value: newValue,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      itemRefs.current.set(newItem.id, createRef());
    };

    const removeHandler = (idToRemove) => {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== idToRemove)
      );
      itemRefs.current.delete(idToRemove);
    };

    const forceValidations = () => {
      itemRefs.current.forEach((itemRef) => {
        itemRef.current?.forceValidations?.();
      });
    };

    const submit = () => {
      const results = items.map((item) => {
        const itemRef = itemRefs.current.get(item.id);
        return itemRef?.current?.submit?.();
      });
      const allValid = results.every((result) => result?.isSectionValid);
      return {
        isSectionValid: allValid,
        listItems: results.map((result) => result?.item),
      };
    };

    useImperativeHandle(ref, () => ({
      submit,
      forceValidations,
    }));

    return (
      <div className={classes.list}>
        <div className={classes.control}>
          <h4 className={classes.label}>
            {label}
            {helperText && (
              <small className={classes.helperText}>{helperText}</small>
            )}
          </h4>
          <Button
            type="button"
            className={classes.addButton}
            onClick={addHandler}
          >
            <i className="bi bi-plus-square-fill" />
          </Button>
        </div>
        {items.map((item, index) => (
          <div key={item.id} className={classes.listItem}>
            {items.length > mandatoryItems && ( // Display remove button only if more than mandatory items
              <Button
                type="button"
                className={classes.removeButton}
                onClick={() => removeHandler(item.id)}
              >
                <i className="bi bi-dash-square" />
              </Button>
            )}
            <div>
              {element({
                id: index + 1,
                defaultValue: item.value,
                labels: itemLabels,
                validationFuncs,
                ref: itemRefs.current.get(item.id),
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

ListAdd.displayName = "ListAdd";
export default ListAdd;
