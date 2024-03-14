import React from "react";
import PropTypes from "prop-types";

const Department = ({ title }) => {
  return (
    <div className="department">
      <div className="department__title">
        <h3>{title}</h3>
      </div>
      <div className="department__list"></div>
    </div>
  );
};

Department.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Department;
