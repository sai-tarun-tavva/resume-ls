import React from "react";
import { Outlet } from "react-router-dom";
import Operations from "../Operations";
import StatusMessage from "../Atoms/StatusMessage";
import StatusMsgContextProvider from "../../store/StatusMsgContextProvider";

const CandidatesHub = () => {
  return (
    <StatusMsgContextProvider>
      <StatusMessage />
      <Operations />
      <Outlet />
    </StatusMsgContextProvider>
  );
};

CandidatesHub.displayName = "CandidatesHub";
export default CandidatesHub;
