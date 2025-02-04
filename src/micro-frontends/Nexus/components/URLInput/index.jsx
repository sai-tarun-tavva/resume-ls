import { useDispatch } from "react-redux";
import InputV2 from "../../../Atoms/components/Inputs/InputV2";
import Button from "../../../Atoms/components/Button";
import { useInput } from "../../../Atoms/hooks";
import { useLoading, useStatus } from "../../../../store";
import { resultActions } from "../../store";
import {
  dispatchAsync,
  fetchWebsiteOverview,
  nexusValidations,
} from "../../../../utilities";
import {
  CONTENT,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * URLInput Component
 *
 * Renders an input field for entering a URL and a button to trigger a web scraping operation.
 * It validates the URL input, manages loading states, and dispatches the scraped data to the store.
 *
 * @component
 * @returns {JSX.Element} The URLInput component.
 */
export const URLInput = () => {
  const dispatch = useDispatch();
  const { isLoading, enableFetchLoading, disableFetchLoading } = useLoading();
  const { updateStatus, resetStatus } = useStatus();
  const {
    value: urlValue,
    handleInputChange: urlChange,
    handleInputBlur: urlBlur,
    handleInputFocus: urlFocus,
    error: urlError,
    isFocused: isUrlFocused,
    forceValidations: forceUrlValidations,
  } = useInput("", nexusValidations.URL, undefined, true);

  /**
   * Handles the "Scrape" button click event.
   *
   * This function validates the URL input, initiates a web scraping request, and updates the
   * application state with the scraped overview data or an error message if the operation fails.
   *
   * @async
   * @function scrapeHandler
   * @param {Event} event - The form submission event.
   */
  const scrapeHandler = async (event) => {
    event.preventDefault();
    await dispatchAsync(resetStatus);
    resultActions.resetState();

    if (isLoading[FETCH]) return;

    if (!urlValue) {
      // Force validation if input is empty
      forceUrlValidations();
    } else {
      enableFetchLoading();

      try {
        const { status, data } = await fetchWebsiteOverview(urlValue);

        if (status === STATUS_CODES.SUCCESS) {
          dispatch(resultActions.updateOverview(data));
        } else {
          dispatch(resultActions.updateOverview([]));
          updateStatus({
            message: CONTENT.COMMON.serverError,
            type: "failure",
          });
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error scraping URL:", error);
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
        });
      } finally {
        disableFetchLoading();
      }
    }
  };

  return (
    <form className={classes.formContainer}>
      <InputV2
        id="url"
        type="url"
        label=""
        placeholder={CONTENT.NEXUS.input.urlLabel}
        value={urlValue}
        changeHandler={urlChange}
        blurHandler={urlBlur}
        focusHandler={urlFocus}
        error={urlError}
        isFocused={isUrlFocused}
        extraClass={classes.extraInputClass}
      />
      <Button
        className={`${classes.button} ${isLoading[FETCH] ? "loading" : ""}`}
        disabled={!!urlError}
        onClick={scrapeHandler}
      >
        {isLoading[FETCH]
          ? CONTENT.NEXUS.input.buttons.scrape.loading
          : CONTENT.NEXUS.input.buttons.scrape.default}{" "}
        <i
          className="bi bi-arrow-repeat"
          style={{ WebkitTextStroke: "0.03rem" }}
        />
      </Button>
    </form>
  );
};

URLInput.displayName = "URLInput";
export default URLInput;
