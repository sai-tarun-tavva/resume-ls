import React from "react";
import { useSelector } from "react-redux";
import classes from "./index.module.scss";

const Conversation = () => {
  const { conversation } = useSelector((state) => state.result);

  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatHeader}>
        <i className="bi bi-chat-dots"></i>
        <h2>Conversation</h2>
      </div>
      <div className={classes.chatBody}>
        {Object.entries(conversation).map(([key, entry], index) => (
          <React.Fragment key={key}>
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

Conversation.displayName = "Conversation";
export default Conversation;
