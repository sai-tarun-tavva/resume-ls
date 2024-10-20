import { useState, useEffect } from "react";

/**
 * Custom hook to manage top and bottom scroll shadows based on scroll position
 * @param {Object} sectionRef - The ref to the scrollable section
 * @param {number} currentSectionIndex - The index of the current section
 * @returns {Object} - An object containing the state of top and bottom shadows
 */
export const useScrollShadows = (sectionRef, currentSectionIndex) => {
  const [scrollShadows, setScrollShadows] = useState({
    top: false,
    bottom: true,
  });

  useEffect(() => {
    const element = sectionRef.current;

    const checkScrollPosition = () => {
      if (element) {
        const isScrollable = element.scrollHeight > element.clientHeight;
        const isAtTop = element.scrollTop === 0;
        const isAtBottom =
          element.scrollTop + element.clientHeight >= element.scrollHeight;

        // Update shadow state based on scroll position
        setScrollShadows({
          top: !isAtTop && isScrollable,
          bottom: !isAtBottom && isScrollable,
        });
      }
    };

    const handleScroll = () => checkScrollPosition();

    if (element) {
      element.addEventListener("scroll", handleScroll);
      checkScrollPosition(); // Initial check
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sectionRef, currentSectionIndex]);

  return scrollShadows;
};
