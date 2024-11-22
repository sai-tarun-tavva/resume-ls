import { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import audioFile from "../../../../assets/convo_notification.wav";
import { CONTENT } from "../../../../constants";
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
  const { conversation } = useSelector((state) => state.result); // Retrieve conversation from Redux state
  const audioRef = useRef(null); // Reference to the audio element

  useEffect(() => {
    /**
     * Plays a notification sound when a new conversation entry is added.
     */
    if (
      conversation &&
      Object.keys(conversation).length > 0 &&
      audioRef.current
    ) {
      audioRef.current.play().catch((error) => {
        console.warn("Audio play failed:", error);
      });
    }
  }, [conversation]);

  return (
    <>
      {/* Audio element for notification sound */}
      <audio ref={audioRef} src={audioFile} />

      {/* Chat container */}
      <div className={classes.chatContainer}>
        {/* Chat header */}
        <div className={classes.chatHeader}>
          <i className="bi bi-chat-dots"></i>
          <h2>{CONTENT.QUEST.input.conversation.heading}</h2>
        </div>

        {/* Chat body containing AI and user messages */}
        <div className={classes.chatBody}>
          {Object.entries(conversation).map(([key, entry]) => (
            <Fragment key={key}>
              {/* Render AI response if available */}
              {entry?.ai_response && (
                <div className={classes.aiMessage}>
                  <i className="bi bi-robot"></i>
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
        </div>
      </div>
    </>
  );
};

Conversation.displayName = "Conversation";
export default Conversation;
