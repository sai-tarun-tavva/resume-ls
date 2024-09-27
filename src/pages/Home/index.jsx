import React from "react";
import { Outlet } from "react-router-dom";
import Operations from "../../components/Operations";

const Home = () => {
  return (
    <>
      <Operations />
      <Outlet />
    </>
  );
};

Home.displayName = "Home";
export default Home;
