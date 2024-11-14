import { useEffect, useMemo, useRef, useState } from "react";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useUI } from "../../../../../store";
import { useInput } from "../../../../Atoms/hooks";
import { buildFetchCandidatesUrl } from "../../../../../utilities";
import { CONTENT, END_POINTS } from "../../../../../constants";
import { OPTIONS } from "../../../constants";
import classes from "./index.module.scss";

/**
 * CandidatesPerPage Component
 *
 * Manages and displays candidates per page selection, including dynamic range display
 * based on the current page and scrolling shadow effect.
 *
 * @component
 * @returns {JSX.Element} The rendered CandidatesPerPage component.
 */
const CandidatesPerPage = () => {
  const {
    state: {
      candidatesPerPage,
      searchTerm,
      pagination: { totalCount, nextPage },
    },
    enableRefetch,
    updateRefetchURL,
    updateCandidatesPerPage,
  } = useUI();

  // Store the initial candidatesPerPage in a ref to prevent re-renders
  const initialCandidatesPerPage = useRef(candidatesPerPage);

  const {
    value: perPageValue,
    handleInputChange: perPageChange,
    handleInputBlur: perPageBlur,
    handleInputFocus: perPageFocus,
    isFocused: perPageFocused,
  } = useInput(initialCandidatesPerPage.current);

  const [showShadow, setShowShadow] = useState(false); // State to control shadow visibility on scroll
  const lastScrollY = useRef(0); // Track the last scroll position to determine direction

  /**
   * Memoized URL for fetching candidates based on current settings.
   * Ensures URL only updates if perPageValue or searchTerm changes.
   */
  const refetchUrl = useMemo(
    () =>
      buildFetchCandidatesUrl(
        END_POINTS.INSIGHT.FETCH_CANDIDATES,
        perPageValue,
        "",
        searchTerm
      ),
    [perPageValue, searchTerm]
  );

  /**
   * Effect to handle updating candidates per page and refetching data.
   * Triggers whenever perPageValue changes, allowing a controlled refresh.
   */
  useEffect(() => {
    if (perPageValue !== candidatesPerPage) {
      updateCandidatesPerPage(perPageValue);
      enableRefetch();
      updateRefetchURL(refetchUrl);
    }
  }, [
    perPageValue,
    enableRefetch,
    refetchUrl,
    updateCandidatesPerPage,
    updateRefetchURL,
    candidatesPerPage,
  ]);

  // Calculate current page number based on nextPage or total count if on the last page
  const currentPage = nextPage
    ? +nextPage - 1
    : Math.ceil(totalCount / candidatesPerPage); // If nextPage is null, calculate current page as the last page

  // Compute start and end records for display based on current page and candidates per page
  const startRecord = (currentPage - 1) * candidatesPerPage + 1;
  const endRecord = Math.min(currentPage * candidatesPerPage, totalCount);

  /**
   * Effect to handle shadow display based on scroll direction.
   * Adds shadow when scrolling up or down and removes it at the top.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowShadow(true); // Show shadow when scrolling
      } else {
        setShowShadow(false); // Remove shadow at the top of the page
      }
      lastScrollY.current = window.scrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${classes.perPageContainer} ${
        showShadow ? classes.shadow : ""
      }`}
    >
      <div className={classes.currentRecords}>
        {CONTENT.INSIGHT.candidates.numberOfRecords1}
        <span>{startRecord}</span> - <span>{endRecord}</span> of{" "}
        <span>{totalCount}</span>
        {CONTENT.INSIGHT.candidates.numberOfRecords2}
      </div>
      <div className={classes.perPageSelect}>
        <span>{CONTENT.INSIGHT.candidates.perPage}</span>
        <Select
          id="perPage"
          label=""
          options={OPTIONS.CANDIDATES_PER_PAGE}
          value={perPageValue}
          changeHandler={perPageChange}
          blurHandler={perPageBlur}
          focusHandler={perPageFocus}
          isFocused={perPageFocused}
          version="version-1"
          extraClass={classes.extraSelectClass}
        />
      </div>
    </div>
  );
};

CandidatesPerPage.displayName = "CandidatesPerPage";
export default CandidatesPerPage;
