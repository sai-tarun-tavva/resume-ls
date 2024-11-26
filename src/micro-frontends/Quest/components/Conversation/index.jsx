import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resultActions } from "../../store";
import { CONTENT, QUEST } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Conversation Component
 *
 * Displays the conversation between the user and the AI. Plays a notification sound
 * when a new conversation entry is added. Handles rendering of both AI and user responses.
 *
 * @component
 * @returns {JSX.Element} The Conversation component, including AI and user message threads.
 */
const Conversation = () => {
  const dispatch = useDispatch();
  const { conversation, callStatus } = useSelector((state) => state.result); // Retrieve conversation from Redux state

  /**
   * Handles retry logic for initiating a new call.
   *
   * Resets the call status, and clears the list of questions
   * to prepare for initiating another candidate call.
   *
   * @function retryHandler
   * @returns {void}
   */
  const retryHandler = () => {
    dispatch(resultActions.updateCallStatus(""));
    dispatch(resultActions.updateQuestions([]));
  };

  // Function to render the status message with an optional button
  const renderStatusMessage = (iconClass, text, buttonText) => (
    <div className={classes.callStatusMessage}>
      <i className={`bi ${iconClass}`}></i>
      <p>{text}</p>
      {buttonText && (
        <p className={classes.actionButton} onClick={retryHandler}>
          {buttonText}
        </p>
      )}
    </div>
  );

  // Render content based on callStatus and conversation
  if (callStatus === QUEST.CALL_STATUSES.CANCELED) {
    return renderStatusMessage(
      "bi-x-circle",
      CONTENT.QUEST.input.conversation.callRejected,
      "Try Again"
    );
  }

  if (
    callStatus === QUEST.CALL_STATUSES.COMPLETED &&
    Object.keys(conversation).length === 0
  ) {
    return renderStatusMessage(
      "bi-telephone-x",
      CONTENT.QUEST.input.conversation.callEndedQuickly,
      "Call Again"
    );
  }

  if (callStatus === QUEST.CALL_STATUSES.FAILED) {
    return renderStatusMessage(
      "bi-exclamation-triangle",
      CONTENT.QUEST.input.conversation.callFailed,
      "Retry Call"
    );
  }

  if (callStatus === QUEST.CALL_STATUSES.BUSY) {
    return renderStatusMessage(
      "bi-telephone-minus",
      CONTENT.QUEST.input.conversation.callBusy,
      "Try Again"
    );
  }

  if (callStatus === QUEST.CALL_STATUSES.NO_ANSWER) {
    return renderStatusMessage(
      "bi-hourglass-split",
      CONTENT.QUEST.input.conversation.callNoAnswer,
      "Call Back"
    );
  }

  return (
    <>
      {/* Chat container */}
      <div className={classes.chatContainer}>
        {/* Chat header */}
        <div className={classes.chatHeader}>
          <i className="bi bi-chat-dots" />
          <h2>{CONTENT.QUEST.input.conversation.heading}</h2>
        </div>

        {/* Chat body containing AI and user messages */}
        <div className={classes.chatBody}>
          {Object.entries(conversation).map(([key, entry]) => (
            <Fragment key={key}>
              {/* Render AI response if available */}
              {entry?.ai_response && (
                <div className={classes.aiMessage}>
                  <i className="bi bi-robot" />
                  <div className={classes.messageContent}>
                    <p>{entry?.ai_response}</p>
                  </div>
                </div>
              )}

              {/* Render user response if available */}
              {entry?.user_response && (
                <div className={classes.userMessage}>
                  <div className={classes.messageContent}>
                    <p>{entry?.user_response}</p>
                  </div>
                  <i className="bi bi-person-circle"></i>
                </div>
              )}
            </Fragment>
          ))}

          <p>{CONTENT.QUEST.input.conversation.ending}</p>
        </div>

        {/* Floating action text or button */}
        <div className={classes.floatingAction}>
          <p onClick={retryHandler}>
            {CONTENT.QUEST.input.conversation.callother}
          </p>
        </div>
      </div>
    </>
  );
};

Conversation.displayName = "Conversation";
export default Conversation;
