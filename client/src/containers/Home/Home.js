import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StatusCard from "../../components/Cards/StatusCard/StatusCard";

import "./Home.css";

const Home = () => {
  const [dateAndTime, setDateAndTime] = useState();

  useEffect(() => {
    const getDateAndTime = async () => {
      // const months = [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ];

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const currentDate = new Date();
      const dayOfWeek = days[currentDate.getDay()];
      const dayOfMonth = currentDate.getDate();
      // const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";

      if (hours > 12) {
        hours -= 12;
      } else if (hours === 0) {
        hours = 12;
      }

      // Add leading zero if minutes is less than 10
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

      setDateAndTime(
        `${dayOfWeek} ${dayOfMonth}, ${year} | ${hours}:${formattedMinutes} ${period}`
      );
    };

    getDateAndTime();
  }, []);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__date">
          <h1>Today</h1>
          <h3>{dateAndTime}</h3>
        </div>
        <div className="home__add">
          <p>Add New Products</p>
          <div className="home__icon">
            <NavLink to="/new-product-form">
              <FontAwesomeIcon className="home__icon--icon" icon={faPlus} />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="home__cards">
        <StatusCard
          title="Weekly Product Count"
          productCount={99}
          interval="weekly"
        />
        <StatusCard
          title="Monthly Product Count"
          productCount={55}
          interval="monthly"
        />
        <StatusCard
          title="Yearly Product Count"
          productCount={35}
          interval="yearly"
        />
      </div>

      <div className="home__bottom">
        <div className="home__bottom-departments"></div>
        <div className="home__bottom-highlights"></div>
      </div>
    </div>
  );
};

export default Home;
