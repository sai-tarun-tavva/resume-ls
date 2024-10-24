import { useEffect, useRef } from "react";

export const useSectionInputsFocus = (sectionIndex) => {
  const sectionRef = useRef();

  useEffect(() => {
    const firstInput = sectionRef?.current?.querySelector(
      "[data-focusable='true']"
    );
    const timer = setTimeout(() => firstInput?.focus?.(), 500);

    return () => clearTimeout(timer);
  }, [sectionIndex]);

  return sectionRef;
};
