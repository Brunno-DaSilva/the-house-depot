import React from "react";

import StatusCard from "../../components/Cards/StatusCard/StatusCard";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <StatusCard
        title="Weekly Product Count"
        productCount={100}
        interval="weekly"
      />
      <StatusCard
        title="Monthly Product Count"
        productCount={5}
        interval="monthly"
      />
      <StatusCard
        title="Yearly Product Count"
        productCount={65}
        interval="yearly"
      />
    </div>
  );
};

export default Home;
