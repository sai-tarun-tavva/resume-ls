import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "../../../../Atoms/components/Button";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Header Component
 *
 * Displays header tabs for results selection with navigation arrows.
 *
 * @param {Object} props - The component props.
 * @param {function} props.clickHandler - The function to call on tab click.
 * @returns {JSX.Element} The header component.
 */
const Header = ({ clickHandler }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const headerRef = useRef(null);
  const { selectedKey } = useSelector((state) => state.result);
  const headerTabs = Object.entries(CONTENT.SPARK.results);

  const checkScroll = () => {
    if (headerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = headerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      checkScroll();
      header.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      return () => {
        header.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (headerRef.current) {
      const scrollAmount = 320; // Width of two tabs
      headerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
        {headerTabs.map(([key, value]) => (
          <button
            key={key}
            className={`${classes.headerTab} ${
              key === selectedKey ? classes.active : ""
            }`}
            onClick={() => clickHandler(key)}
          >
            {value}
          </button>
        ))}
      </nav>
    </header>
  );
};

Header.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default Header;
