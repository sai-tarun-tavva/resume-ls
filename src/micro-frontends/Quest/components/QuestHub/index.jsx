import { Provider } from "react-redux";
import Header from "../../../Atoms/components/Operations";
import QuestionsGenerator from "../QuestionsGenerator";
import CallHub from "../CallHub";
import store from "../../store/store";
import { PAGES } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * QuestHub Component
 *
 * Main hub for displaying question generation and conversation display within the RQuest application.
 * Wraps the `QuestionGenerator` and `CallHub` components with the Redux provider for state management.
 *
 * @component
 * @returns {JSX.Element} The QuestHub component containing a header, question generation, and conversation display sections.
 */
const QuestHub = () => {
  return (
    <Provider store={store}>
      <Header
        currentPage={PAGES.QUEST}
        includeSearch={false} // Adjust based on whether search is needed
        includePagination={false}
      />
      <section className={classes.questHub}>
        <QuestionsGenerator />
        <CallHub />
      </section>
    </Provider>
  );
};

QuestHub.displayName = "QuestHub";
export default QuestHub;
