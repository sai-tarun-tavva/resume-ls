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

/**
 * ListAdd Component
 *
 * Handles a dynamic list of form elements, allowing users to add and remove items.
 * Each item can have its own form fields, validated individually, and the list can be limited by `maxItems`.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the list.
 * @param {Object} props.itemLabels - Labels for individual items in the list.
 * @param {React.Component} props.element - The component that represents an individual list item (e.g., Address, TextInput).
 * @param {Array} props.savedListItems - A list of saved items to initialize the component with.
 * @param {Object} props.validationFuncs - Validation functions for individual list items.
 * @param {string} [props.helperText] - Optional helper text for the list.
 * @param {string} [props.heading] - Optional heading to be displayed for each item.
 * @param {string} [props.newValue] - Default value to be used for new items.
 * @param {number} [props.mandatoryItems=0] - The number of items that are mandatory and cannot be removed.
 * @param {number} [props.maxItems] - Optional max number of items allowed.
 * @param {string} [props.extraClass=""] - Extra CSS class to apply to the component.
 * @returns {JSX.Element} The rendered ListAdd component.
 */
const ListAdd = forwardRef(
  (
    {
      label,
      itemLabels,
      element,
      savedListItems,
      validationFuncs,
      helperText = "",
      heading = "",
      newValue,
      mandatoryItems = 0, // by default nothing is mandatory
      maxItems, // no limit by default
      extraClass = "",
    },
    ref
  ) => {
    const [items, setItems] = useState(
      savedListItems.map((item, index) => ({
        id: `${index}-${Date.now()}`, // Unique identifier for each item
        value: item,
      }))
    );
    const itemRefs = useRef(new Map()); // Map to store refs for each item
    const firstInputRef = useRef(); // Ref to focus the first input button

    /**
     * Synchronize refs for the items whenever the list of items changes.
     * This ensures refs are created or cleaned up as needed.
     */
    useEffect(() => {
      // Initialize refs for newly added items
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

    /**
     * Adds a new item to the list.
     * Prevents adding items if the maximum limit (`maxItems`) is reached.
     */
    const addHandler = () => {
      if (maxItems && items.length >= maxItems) return; // Prevent adding more than maxItems
      const newItem = {
        id: `${items.length}-${Date.now()}`, // Unique id for each item
        value: newValue,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      itemRefs.current.set(newItem.id, createRef()); // Store the new ref
    };

    /**
     * Removes an item from the list by its id.
     */
    const removeHandler = (idToRemove) => {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== idToRemove)
      );
      itemRefs.current.delete(idToRemove); // Clean up the ref for the removed item
    };

    /**
     * Forces validation for all items in the list.
     */
    const forceValidations = () => {
      itemRefs.current.forEach((itemRef) => {
        itemRef.current?.forceValidations?.(); // Trigger forceValidations method for each item
      });
    };

    /**
     * Submits the list of items and returns the validation results.
     */
    const submit = () => {
      const results = items.map((item) => {
        const itemRef = itemRefs.current.get(item.id);
        return itemRef?.current?.submit?.(); // Submit each item's validation
      });
      const allValid = results.every((result) => result?.isSectionValid);
      return {
        isSectionValid: allValid,
        listItems: results.map((result) => result?.item),
      };
    };

    // Expose the submit and forceValidations methods to the parent component
    useImperativeHandle(ref, () => ({
      submit,
      forceValidations,
      focusFirstInput: () => {
        firstInputRef.current.focus();
      },
    }));

    return (
      <div className={classes.list}>
        {/* Render the list control and add button */}
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
            disabled={maxItems && items.length >= maxItems} // Disable button if maxItems reached
            ref={firstInputRef}
          >
            <i className="bi bi-plus-square-fill" />
          </Button>
        </div>

        {/* Render each item in the list */}
        {items.map((item, index) => (
          <div key={item.id} className={classes.listItem}>
            {/* Remove button, only visible if more than mandatory items */}
            {items.length > mandatoryItems && (
              <Button
                type="button"
                className={classes.removeButton}
                onClick={() => removeHandler(item.id)}
              >
                <i className="bi bi-dash-square" />
              </Button>
            )}
            <div>
              {/* Render the form element for the item */}
              {element({
                id: index + 1,
                defaultValue: item.value,
                heading: `${heading} ${index + 1}`,
                labels: itemLabels,
                validationFuncs,
                ref: itemRefs.current.get(item.id),
                extraClass: extraClass,
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
