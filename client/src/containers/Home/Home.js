import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as departmentApi from "../../services/departmentApi";
import * as productApi from "../../services/productApi";
import {
  FETCH_DEPARTMENT_DATA_ERROR,
  FETCH_CHECKOUT_PRODUCTS_ERROR,
} from "../../constants/constants";
import Loader from "../../components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StatusCard from "../../components/Cards/StatusCard/StatusCard";
import ListCard from "../../components/Cards/ListCard/ListCard";
import BrandCard from "../../components/Cards/BrandCard/BrandCard";
import "./Home.css";

const Home = () => {
  const [dateAndTime, setDateAndTime] = useState();
  const [departments, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [brands, setBrands] = useState([]);

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

  useEffect(() => {
    const fetchDepartments = async () => {
      const allDepartments = await departmentApi.getAllDepartments();

      if (allDepartments !== FETCH_DEPARTMENT_DATA_ERROR) {
        setDepartment(allDepartments);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      const allProducts = await productApi.getAllProducts();

      if (allProducts !== FETCH_CHECKOUT_PRODUCTS_ERROR) {
        const getBrands = [
          ...new Set(
            allProducts.map(({ brand }) => {
              return brand;
            })
          ),
        ];

        const newObj = getBrands.map((brand) => ({ brand }));

        setBrands(newObj);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchBrands();
  }, []);

  console.log("Something Went Wrong => ", error);

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
          productCount={100}
          interval="weekly"
        />
        <StatusCard
          title="Monthly Product Count"
          productCount={50}
          interval="monthly"
        />
        <StatusCard
          title="Yearly Product Count"
          productCount={60}
          interval="yearly"
        />
      </div>

      <div className="home__bottom">
        {loading ? <Loader message="Loading new product form data..." /> : null}
        <div className="home__bottom-departments">
          <ListCard title="Departments" items={departments} />
        </div>
        <div className="home__bottom-brands">
          <BrandCard title="Brands" items={brands} />
        </div>
      </div>
    </div>
  );
};

export default Home;
