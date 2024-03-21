import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import "./ListCard.css";

const ListCard = ({ title, items }) => {
  return (
    <div className="list">
      <div className="list__title">
        <h3>{title}</h3>
        <FontAwesomeIcon className="icon" icon={faEllipsisV} />
      </div>
      <div className="list__items">
        {items.map((item) => {
          return (
            <div className="list__item" key={item.id}>
              <div className="list__item-icon">
                <FontAwesomeIcon className="icon" icon={faTools} />
              </div>
              <div>{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ListCard.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListCard;
