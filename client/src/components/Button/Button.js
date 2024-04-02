import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  disabled,
  onClick,
  title,
  isIconButton,
  icon,
  classHelper,
}) => {
  return (
    <button
      className={classHelper ? `${classHelper}` : "button__default"}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {isIconButton ? icon : title}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  isIconButton: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  classHelper: PropTypes.string,
};

export default Button;
