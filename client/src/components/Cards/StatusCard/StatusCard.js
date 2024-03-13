import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountUp,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";

import "./StatusCard.css";

const StatusCard = ({ title, productCount, interval }) => {
  const [trackWeeklyProductCount, setTrackWeeklyProductCount] = useState(null);
  const [trackMonthlyProductCount, setTrackMonthlyProductCount] =
    useState(null);
  const [trackYearlyProductCount, setTrackYearlyProductCount] = useState(null);
  const [isWeeklyProductCountGreater, setIsWeeklyProductCountGreater] =
    useState(false);
  const [isMonthlyProductCountGreater, setIsMonthlyProductCountGreater] =
    useState(false);
  const [isYearlyProductCountGreater, setIsYearlyProductCountGreater] =
    useState(false);

  const convertInterval = interval;

  useEffect(() => {
    const checkProductStatus = async () => {
      switch (convertInterval) {
        case "weekly":
          setIsWeeklyProductCountGreater(
            trackWeeklyProductCount > productCount
          );
          setTrackWeeklyProductCount(productCount);
          break;
        case "monthly":
          setIsMonthlyProductCountGreater(
            trackMonthlyProductCount > productCount
          );
          setTrackMonthlyProductCount(productCount);
          break;
        case "yearly":
          setIsYearlyProductCountGreater(
            trackYearlyProductCount > productCount
          );
          setTrackYearlyProductCount(productCount);
          break;
        default:
          break;
      }
    };

    checkProductStatus();
  }, [productCount]);

  const renderIcon = () => {
    switch (convertInterval) {
      case "weekly":
        return (
          <FontAwesomeIcon
            className="icon"
            icon={
              isWeeklyProductCountGreater ? faSortAmountDown : faSortAmountUp
            }
          />
        );
      case "monthly":
        return (
          <FontAwesomeIcon
            className="icon"
            icon={
              isMonthlyProductCountGreater ? faSortAmountDown : faSortAmountUp
            }
          />
        );
      case "yearly":
        return (
          <FontAwesomeIcon
            className="icon"
            icon={
              isYearlyProductCountGreater ? faSortAmountDown : faSortAmountUp
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <div className="card__title">
        <h3>{title}</h3>
      </div>
      <div className="card__status">
        <div className="status__number">
          <p>{productCount}</p>
        </div>
        <div className="status__icon">{renderIcon()}</div>
      </div>
    </div>
  );
};

StatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  productCount: PropTypes.number.isRequired,
  interval: PropTypes.oneOf(["weekly", "monthly", "yearly"]).isRequired,
};

export default StatusCard;
