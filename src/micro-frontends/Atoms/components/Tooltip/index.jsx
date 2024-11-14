import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * Tooltip Component
 *
 * This component displays a tooltip with configurable behavior to show on hover or click.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.baseContentToHover - The content that triggers the tooltip visibility.
 * @param {React.ReactNode} props.children - The content to display inside the tooltip.
 * @param {"hover" | "click"} [props.trigger="hover"] - Determines how the tooltip is triggered (hover or click).
 * @returns {JSX.Element} The Tooltip component.
 */
const Tooltip = ({ baseContentToHover, children, trigger = "hover" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  /**
   * Toggles tooltip visibility when the base element is clicked.
   * Only active if the trigger type is set to "click".
   */
  const handleToggleVisibility = () => {
    if (trigger === "click") {
      setIsVisible((prev) => !prev);
    }
  };

  /**
   * Shows the tooltip on mouse enter for "hover" trigger type.
   */
  const handleMouseEnter = () => {
    if (trigger === "hover") setIsVisible(true);
  };

  /**
   * Hides the tooltip on mouse leave for "hover" trigger type.
   */
  const handleMouseLeave = () => {
    if (trigger === "hover") setIsVisible(false);
  };

  /**
   * Handles outside clicks to close the tooltip if visible.
   * Adds and removes event listener based on the "click" trigger type.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the tooltip if a click occurs outside the tooltip element
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        isVisible
      ) {
        setIsVisible(false);
      }
    };

    if (trigger === "click") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (trigger === "click") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isVisible, trigger]);

  return (
    <div
      className={classes.tooltipWrapper}
      onClick={handleToggleVisibility}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* The base element that triggers tooltip visibility */}
      <span>{baseContentToHover}</span>
      {/* Tooltip content */}
      <div
        ref={tooltipRef}
        className={`${classes.tooltip} ${isVisible ? classes.visible : ""}`}
      >
        <div className={classes.tooltipArrow}></div>
        <div className={classes.tooltipContent}>{children}</div>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  baseContentToHover: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  trigger: PropTypes.oneOf(["click", "hover"]),
};

Tooltip.displayName = "Tooltip";
export default Tooltip;
