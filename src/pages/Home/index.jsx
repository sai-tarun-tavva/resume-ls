import React from "react";
import Operations from "../../components/Operations";
import Candidates from "../../components/Candidates";

const Home = () => {
  return (
    <>
      {/* Operations component for filtering and index management */}
      <Operations />
      {/* Component to display the filtered data */}
      <Candidates />
    </>
  );
};

Home.displayName = "Home";
export default Home;
