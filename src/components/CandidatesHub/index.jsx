import React from "react";
import { Outlet } from "react-router-dom";
import Operations from "./Operations";
import Upload from "./Upload";
import StatusMessage from "../Atoms/StatusMessage";
import { StatusMsgContextProvider } from "../../store";

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
