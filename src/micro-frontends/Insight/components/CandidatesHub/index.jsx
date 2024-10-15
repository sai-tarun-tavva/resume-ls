import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import Operations from "../Operations";
import Upload from "../Upload";
import store from "../../store/store";

/**
 * CandidatesHub Component
 *
 * Serves as a wrapper for candidate-related operations.
 * It includes the status message, operations, upload functionality, and any nested routes.
 *
 * @returns {JSX.Element} The rendered CandidatesHub component.
 */
const CandidatesHub = () => {
  return (
    <Provider store={store}>
      <Operations />
      <Outlet />
      <Upload />
    </Provider>
  );
};

CandidatesHub.displayName = "CandidatesHub";
export default CandidatesHub;
