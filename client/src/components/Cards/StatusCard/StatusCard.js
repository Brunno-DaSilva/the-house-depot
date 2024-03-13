import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountUp,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";

import "./StatusCard.css";

const StatusCard = ({ title, productCount }) => {
  const [trackProductCount, setTrackProductCount] = useState(100);
  const [isProductCountGreater, setIsProductCountGreater] = useState(false);

  useEffect(() => {
    const checkProductStatus = async () => {
      if (trackProductCount !== null) {
        setIsProductCountGreater(trackProductCount > productCount);
      }
      setTrackProductCount(productCount);
    };

    checkProductStatus();
  }, [productCount]);

  return (
    <div className="card">
      <div className="card__title">
        <h3>{title}</h3>
      </div>
      <div className="card__status">
        <div className="status__number">
          <p>{productCount}</p>
        </div>
        <div className="status__icon">
          {isProductCountGreater ? (
            <FontAwesomeIcon className="icon" icon={faSortAmountDown} />
          ) : (
            <FontAwesomeIcon className="icon" icon={faSortAmountUp} />
          )}
        </div>
      </div>
    </div>
  );
};

StatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  productCount: PropTypes.number.isRequired,
};

export default StatusCard;
