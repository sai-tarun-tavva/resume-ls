import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "../../../../Atoms/components/Button";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Header Component
 *
 * Displays header tabs for result sections with navigation arrows to scroll through the tabs.
 *
 * @param {Object} props - The component props.
 * @param {function} props.clickHandler - Function to call when a tab is clicked.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({ clickHandler }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const headerRef = useRef(null);
  const { selectedKey, headerTabs } = useSelector((state) => state.result);
  const headerTabContent = CONTENT.SPARK.results;

  /**
   * Checks if the header can be scrolled to the left or right and sets arrow visibility accordingly.
   */
  const checkScroll = () => {
    if (headerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = headerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  /**
   * Scrolls the header in the specified direction.
   *
   * @param {string} direction - Direction to scroll, either "left" or "right".
   */
  const scroll = (direction) => {
    if (headerRef.current) {
      const scrollAmount = 320; // Scroll by the width of two tabs
      headerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    /**
     * Attaches scroll and resize event listeners to update arrow visibility as
     * the user scrolls or resizes the window. Runs on component mount and cleans
     * up on unmount.
     *
     * - `scroll` event: Tracks horizontal scroll position to adjust arrow visibility.
     * - `resize` event: Rechecks scroll state when window resizes.
     */
    const header = headerRef.current;
    if (header) {
      checkScroll();
      header.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      // Cleanup event listeners on component unmount
      return () => {
        header.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []); // Empty dependency array means it runs only once on mount

  return (
    <header className={classes.headerContainer}>
      <Button
        onClick={() => scroll("left")}
        className={`${classes.navArrow} ${classes.leftArrow} ${
          showLeftArrow ? classes.visible : ""
        }`}
        aria-label="Scroll left"
      >
        <i className="bi bi-arrow-left-circle-fill" />
      </Button>

      <Button
        onClick={() => scroll("right")}
        className={`${classes.navArrow} ${classes.rightArrow} ${
          showRightArrow ? classes.visible : ""
        }`}
        aria-label="Scroll right"
      >
        <i className="bi bi-arrow-right-circle-fill" />
      </Button>

      <nav ref={headerRef} className={classes.header}>
        {Object.entries(headerTabs).map(([key, value], index) =>
          value ? (
            <button
              key={index}
              className={`${classes.headerTab} ${
                key === selectedKey ? classes.active : ""
              }`}
              onClick={() => clickHandler(key)}
            >
              {headerTabContent[key]}
            </button>
          ) : null
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default Header;
Header.displayName = "Header";
