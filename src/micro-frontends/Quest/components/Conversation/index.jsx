import { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import audioFile from "../../../../assets/convo_notification.wav";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

const Conversation = () => {
  const { conversation } = useSelector((state) => state.result);
  const audioRef = useRef(null);

  useEffect(() => {
    // Only play audio if conversation data exists
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
      <audio ref={audioRef} src={audioFile} />
      <div className={classes.chatContainer}>
        <div className={classes.chatHeader}>
          <i className="bi bi-chat-dots"></i>
          <h2>{CONTENT.QUEST.input.conversation.heading}</h2>
        </div>
        <div className={classes.chatBody}>
          {Object.entries(conversation).map(([key, entry], index) => (
            <Fragment key={key}>
              <div className={classes.aiMessage}>
                <i className="bi bi-robot"></i>
                <div className={classes.messageContent}>
                  <p>{entry.ai_response}</p>
                </div>
              </div>
              <div className={classes.userMessage}>
                <div className={classes.messageContent}>
                  <p>{entry.user_response}</p>
                </div>
                <i className="bi bi-person-circle"></i>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

Conversation.displayName = "Conversation";
export default Conversation;
