import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../helpers/formatPrice";
import Button from "../Button/Button";
import "./CheckoutItem.css";

const CheckoutItem = ({ item, removeItemFromCheckout }) => {
  const { id, name, brand, description, retailPrice } = item;

  return (
    <li className="checkout__item">
      <div>
        <div className="checkout-item-wrapper">
          <div className="checkout-item-data strong">{name}</div>
          <div className="checkout-item-data brand">
            <span>{brand}</span>
          </div>
          <div className="checkout-item-wrapper description">{description}</div>
        </div>
      </div>
      <div className="checkout-item-price">{formatPrice(retailPrice)}</div>
      <div>
        <Button title="Remove" onClick={() => removeItemFromCheckout(id)} />
      </div>
    </li>
  );
};

CheckoutItem.propTypes = {
  item: PropTypes.object.isRequired,
  removeItemFromCheckout: PropTypes.func.isRequired,
};

export default CheckoutItem;
