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
 * The central hub of the RQuest application, responsible for rendering the question generation
 * and conversation display functionalities. It integrates Redux for state management
 * and includes a common header for navigation.
 *
 * @component
 * @returns {JSX.Element} The QuestHub component, including the Header, QuestionsGenerator, and CallHub components.
 */
const QuestHub = () => {
  return (
    <Provider store={store}>
      {/* Header section */}
      <Header
        currentPage={PAGES.QUEST}
        includeSearch={false} // Toggle search functionality if required
        includePagination={false} // Toggle pagination functionality if required
      />

      {/* Main content section */}
      <section className={classes.questHub}>
        <QuestionsGenerator />
        <CallHub />
      </section>
    </Provider>
  );
};

QuestHub.displayName = "QuestHub";
export default QuestHub;
