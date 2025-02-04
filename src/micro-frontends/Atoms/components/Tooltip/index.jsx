import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * Tooltip Component
 *
 * Displays a tooltip based on cursor behavior, such as hover, click, or pause-hover.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.baseContentToHover - The content that triggers the tooltip visibility.
 * @param {React.ReactNode} props.children - The content to display inside the tooltip.
 * @param {"hover" | "click" | "pause-hover"} [props.trigger="hover"] - Determines how the tooltip is triggered.
 * @param {string} [props.extraClass] - Additional CSS class to style the tooltip wrapper.
 * @param {number} [props.delay=300] - Delay in milliseconds before showing the tooltip after cursor stops moving.
 * @param {number} [props.autoHideDelay=2000] - Delay in milliseconds before automatically hiding the tooltip.
 * @param {boolean} [props.avoidDisplay=false] - Avoid displaying the tooltip entirely.
 * @returns {JSX.Element} The Tooltip component.
 */
const Tooltip = ({
  baseContentToHover,
  children,
  trigger = "hover",
  extraClass,
  delay = 300,
  autoHideDelay = 2000,
  avoidDisplay = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const hoverTimeout = useRef(null);
  const autoHideTimeout = useRef(null);

  /**
   * Handles cursor movement for "pause-hover" trigger type.
   *
   * @param {MouseEvent} event - Mouse event.
   */
  const handleMouseMove = (event) => {
    if (trigger === "pause-hover") {
      setIsVisible(false); // Hide tooltip immediately when cursor moves
      clearTimeout(hoverTimeout.current);
      clearTimeout(autoHideTimeout.current);

      // Set a timeout to display tooltip if cursor stops moving
      hoverTimeout.current = setTimeout(() => {
        setPosition({ top: event.clientY + 10, left: event.clientX + 10 }); // Adjust for tooltip offset
        setIsVisible(true);

        // Auto-hide tooltip after the specified delay
        autoHideTimeout.current = setTimeout(() => {
          setIsVisible(false);
        }, autoHideDelay);
      }, delay);
    }
  };

  /**
   * Handles visibility for "hover" trigger type.
   */
  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsVisible(true);
    }
  };

  /**
   * Hides tooltip when cursor leaves for "hover" and "pause-hover" trigger types.
   */
  const handleMouseLeave = () => {
    if (trigger === "hover" || trigger === "pause-hover") {
      clearTimeout(hoverTimeout.current);
      clearTimeout(autoHideTimeout.current);
      setIsVisible(false);
    }
  };

  /**
   * Toggles visibility for "click" trigger type.
   */
  const handleToggleVisibility = () => {
    if (trigger === "click") {
      setIsVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    // Clean up timeouts on component unmount
    return () => {
      clearTimeout(hoverTimeout.current);
      clearTimeout(autoHideTimeout.current);
    };
  }, []);

  return (
    <div
      className={`${classes.tooltipWrapper} ${extraClass}`}
      onClick={handleToggleVisibility}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* The base element that triggers tooltip visibility */}
      <span>{baseContentToHover}</span>
      {/* Tooltip content */}
      {!avoidDisplay && isVisible && (
        <div
          ref={tooltipRef}
          className={`${classes.tooltip} ${isVisible ? classes.visible : ""}`}
          style={
            trigger === "pause-hover"
              ? { top: position.top, left: position.left }
              : {}
          }
        >
          <div className={classes.tooltipArrow}></div>
          <div className={classes.tooltipContent}>{children}</div>
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  baseContentToHover: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  trigger: PropTypes.oneOf(["hover", "click", "pause-hover"]),
  extraClass: PropTypes.string,
  delay: PropTypes.number,
  autoHideDelay: PropTypes.number,
  avoidDisplay: PropTypes.bool,
};

Tooltip.displayName = "Tooltip";
export default Tooltip;
