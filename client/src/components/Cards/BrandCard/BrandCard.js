import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import "./BrandCard.css";

const BrandCard = ({ title, items }) => {
  return (
    <div className="brand">
      <div className="brand__title">
        <h3>{title}</h3>
        <NavLink exact to="/vendors">
          <FontAwesomeIcon className="icon" icon={faEllipsisV} />
        </NavLink>
      </div>
      <div className="brand__items">
        {items.map((item) => {
          return (
            <div className="brand__item" key={item.id}>
              <div className="brand__item-icon">
                <FontAwesomeIcon className="icon" icon={faFolder} />
              </div>
              <div>{item.vendorName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BrandCard.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BrandCard;
