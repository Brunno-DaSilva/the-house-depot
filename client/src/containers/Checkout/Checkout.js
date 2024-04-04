import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import {
  FETCH_CHECKOUT_PRODUCTS_ERROR,
  REMOVE_PRODUCT_FROM_CHECKOUT_ERROR,
  PRODUCT_REMOVED_FROM_CHECKOUT_SUCCESS,
} from "../../constants/constants";
import * as checkoutApi from "../../services/checkoutApi";
// eslint-disable-next-line no-unused-vars
// import emptyCartSvg from "../../helpers/emptyCartSvg";

import emptyCartSvg from "./emptyCart.svg";

import "./Checkout.css";

const Checkout = ({ updateCheckoutCount }) => {
  const [checkoutItems, setCheckoutItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      const allCheckoutItems = await checkoutApi.getAllCheckoutItems();

      if (allCheckoutItems !== FETCH_CHECKOUT_PRODUCTS_ERROR) {
        setCheckoutItems(allCheckoutItems);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    fetchCheckoutItems();
  }, []);

  const removeItemFromCheckout = async (id) => {
    const remainingCheckoutItems = await checkoutApi.removeProductFromCheckout(
      id
    );
    if (remainingCheckoutItems !== REMOVE_PRODUCT_FROM_CHECKOUT_ERROR) {
      setCheckoutItems(remainingCheckoutItems);
      await updateCheckoutCount();
      toast(`${PRODUCT_REMOVED_FROM_CHECKOUT_SUCCESS}`, {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "toast__Success",
      });
    } else {
      toast(`${remainingCheckoutItems}`, {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "toast__Error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="checkout">
      <h1 className="checkout__title">Checkout Page</h1>
      <div className="checkout__content">
        {loading ? <Loader message="Fetching items to checkout..." /> : null}

        {error ? (
          <p className="checkout-message">
            {FETCH_CHECKOUT_PRODUCTS_ERROR} Please refresh the page or try again
            later.
          </p>
        ) : null}
        {!loading && !error && checkoutItems.length ? (
          <div className="checkout__table">
            <div className="checkout__header">
              <div>Product Information</div>
              <div>Suggested Retail Price</div>
              <div>Update Checkout</div>
            </div>
            <ul className="checkout__list-wrapper">
              {checkoutItems.map((item) => (
                <CheckoutItem
                  key={item.id}
                  item={item}
                  removeItemFromCheckout={removeItemFromCheckout}
                />
              ))}
            </ul>
          </div>
        ) : null}
        {!loading && !error && !checkoutItems.length ? (
          <div className="checkout__empty">
            <div className="checkout__empty--img">
              <img src={emptyCartSvg} alt="Empty Cart Image" />
            </div>
            <div className="checkout__empty--msg">
              <p>The checkout is currently empty.</p>
              <NavLink className="page-link" to="/products">
                <Button title="Go to Products" />
              </NavLink>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

Checkout.propTypes = {
  updateCheckoutCount: PropTypes.func.isRequired,
};

export default Checkout;
