import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [checkoutCount] = useState(useState);

  console.log(checkoutCount);

  CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <CartContext.Provider value={{ checkoutCount: 1 }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
