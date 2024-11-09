import { useEffect, useRef } from "react";

/**
 * Custom hook to handle focusing the first input field of a section.
 *
 * This hook automatically focuses the first input field within a specified section
 * based on the `sectionIndex`. The focusable input is identified by a `data-focusable="true"` attribute.
 * It uses a timer to delay the focus action by 500ms to ensure the DOM is fully rendered.
 *
 * @param {number} sectionIndex - The index of the section. The effect is triggered whenever the index changes.
 * @returns {React.RefObject} A reference to the section element that can be used for DOM manipulation.
 */
export const useSectionInputsFocus = (sectionIndex) => {
  // Reference to the section element
  const sectionRef = useRef();

  useEffect(() => {
    // Find the first input element with the data-focusable="true" attribute within the section
    const firstInput = sectionRef?.current?.querySelector(
      "[data-focusable='true']"
    );

    // Set a timeout to focus the first input after 500ms to ensure DOM is fully rendered
    const timer = setTimeout(() => firstInput?.focus?.(), 500);

    // Cleanup the timeout when the effect is re-run
    return () => clearTimeout(timer);
  }, [sectionIndex]); // The effect is re-triggered when the sectionIndex changes

  return sectionRef; // Return the sectionRef to be used in the component
};
