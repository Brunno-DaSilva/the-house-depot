import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FETCH_CHECKOUT_COUNT_ERROR } from "../../constants/constants";
import PropTypes from "prop-types";

import "./Navbar.css";

const Navbar = ({ checkoutCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar__home-link">
        <NavLink exact to="/">
          <span>NaiLogger</span>
          <div className="underscore"></div>
        </NavLink>
      </div>
      <div className="navbar__search">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
          />
          <button type="submit" className="searchButton">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="navbar-links-wrapper">
        <NavLink exact to="/products">
          Products
        </NavLink>

        <NavLink exact to="/new-product-form">
          Add New Products
        </NavLink>

        <NavLink exact to="/departments">
          Departments
        </NavLink>

        <NavLink exact to="/vendors">
          Brands
        </NavLink>

        <NavLink className="navbar-link" exact to="/checkout">
          <FontAwesomeIcon className="navbar-icon" icon={faShoppingCart} />
          {checkoutCount !== FETCH_CHECKOUT_COUNT_ERROR && checkoutCount > 0 ? (
            <p className="navbar-checkout-count">: {checkoutCount}</p>
          ) : null}
        </NavLink>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  checkoutCount: PropTypes.number.isRequired,
};

export default Navbar;
