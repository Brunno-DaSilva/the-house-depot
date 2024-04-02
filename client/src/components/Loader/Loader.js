import React from "react";
import PropTypes from "prop-types";

import "./Loader.css";

const Loader = (props) => {
  return (
    <span className="loader-wrapper">
      <div className="loader"></div>
      <p className="loading-message">{props.message}</p>
    </span>
  );
};

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loader;
