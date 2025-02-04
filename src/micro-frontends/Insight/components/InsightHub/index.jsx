import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import Operations from "../../../Atoms/components/Operations";
import Upload from "../Upload";
import BatchStatus from "../BatchStatus";
import store from "../../store/store";
import { PAGES } from "../../../../constants";

/**
 * InsightHub Component
 *
 * Serves as a wrapper for candidate-related operations.
 * It includes the status message, operations, upload functionality, and any nested routes.
 *
 * @returns {JSX.Element} The rendered InsightHub component.
 */
const InsightHub = () => {
  return (
    <Provider store={store}>
      <Operations currentPage={PAGES.INSIGHT} extraOps={<BatchStatus />} />
      <Outlet />
      <Upload />
    </Provider>
  );
};

InsightHub.displayName = "InsightHub";
export default InsightHub;
