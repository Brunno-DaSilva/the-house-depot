import React from "react";

import StatusCard from "../../components/Cards/StatusCard/StatusCard";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1 className="home-title">Welcome to Hardware Handler!</h1>

      <StatusCard title="Weekly Product Count" productCount={350} />
    </div>
  );
};

export default Home;
