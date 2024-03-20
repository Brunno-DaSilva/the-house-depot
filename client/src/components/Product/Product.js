import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../helpers/formatPrice";
import "./Product.css";

const Product = ({ product, addItemToCheckout }) => {
  const { id, name, imageURL, brand, retailPrice, description } = product;

  return (
    <div key={id} className="productCard">
      <div className="productCard__image">
        <img src={imageURL} alt={name} />
      </div>
      <div>
        <h3 className="productCard__name">{name}</h3>
      </div>
      <div>
        <p className="productCard__description">{description}</p>
      </div>
      <div className="productCard__wrapper">
        <p className="productCard__price">{formatPrice(retailPrice)}</p>
        <p className="productCard__brand">{brand}</p>
      </div>
      <div className="productCard__wrapper--btn">
        <button
          className="productCard__button"
          onClick={() => addItemToCheckout(product)}
        >
          Add to Checkout
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    retailPrice: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
  addItemToCheckout: PropTypes.func.isRequired,
};

export default Product;
