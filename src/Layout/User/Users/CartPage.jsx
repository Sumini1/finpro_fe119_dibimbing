import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartItems = useSelector((state) => state.addToCart.cartItems);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
            <p>{item.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
