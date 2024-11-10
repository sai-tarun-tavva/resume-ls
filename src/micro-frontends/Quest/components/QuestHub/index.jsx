// import { Provider } from "react-redux";
import Header from "../../../Atoms/components/Operations";
// import QuestionGenerator from "../QuestionGenerator";
// import ConversationDisplay from "../ConversationDisplay";
// import store from "../../store/store";
import { PAGES } from "../../../../constants";
// import classes from "./index.module.scss";

/**
 * QuestHub Component
 *
 * Main hub for displaying question generation and conversation display within the RQuest application.
 * Wraps the `QuestionGenerator` and `ConversationDisplay` components with the Redux provider for state management.
 *
 * @component
 * @returns {JSX.Element} The QuestHub component containing a header, question generation, and conversation display sections.
 */
const QuestHub = () => {
  return (
    // <Provider store={store}>
    <Header
      currentPage={PAGES.QUEST}
      includeSearch={false} // Adjust based on whether search is needed
      includePagination={false}
    />
    //   {/* <section className={classes.questHub}>
    //     <QuestionGenerator />
    //     <ConversationDisplay />
    //   </section> */}
    // </Provider>
  );
};

QuestHub.displayName = "QuestHub";
export default QuestHub;
