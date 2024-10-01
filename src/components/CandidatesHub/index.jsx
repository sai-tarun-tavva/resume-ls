import { Outlet } from "react-router-dom";
import Operations from "./Operations";
import Upload from "./Upload";
import StatusMessage from "../Atoms/StatusMessage";
import { StatusMsgContextProvider } from "../../store";

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
    <StatusMsgContextProvider>
      <StatusMessage />
      <Operations />
      <Outlet />
      <Upload />
    </StatusMsgContextProvider>
  );
};

CandidatesHub.displayName = "CandidatesHub";
export default CandidatesHub;
