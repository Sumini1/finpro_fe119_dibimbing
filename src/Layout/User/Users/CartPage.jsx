import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../../components/General/Navbar";
import { fetchCart, fetchCartUpdate,  fetchCartDelete } from "../../../reducer/cartSlice";
import Swal from "sweetalert2"

const CartPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cartItems", cartItems);

  const handleUpdateQuantity = (quantity, id) => {
    dispatch(fetchCartUpdate({ id, quantity }))
      .unwrap()
      .then(() => {
        dispatch(fetchCart());
      });
  };
const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this Activity?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  })
    .then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchCartDelete(id)).then(() => {
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
          dispatch(fetchCart());
        });
      }
    })
    .catch(() => {
      Swal.fire("Delete failed", "Failed to delete activity.", "error");
    });
};

 const formatToIDR = (amount) => {
   return new Intl.NumberFormat("id-ID", {
     style: "currency",
     currency: "IDR",
   }).format(amount);
 };

  return (
    <div >
      <Navbar />
      <div className="text-white p-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 md:p-20 md:mt-[-40px] min-h-screen">
        <h1>Your Cart</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index}>
              <p>{item?.activity?.title}</p>
              <p>{item?.activity?.facilities}</p>
              <p>{item?.activity?.price_discount}</p>
              <p>{item?.activity?.description}</p>
              <p>{`${formatToIDR(item?.activity?.price)}`}</p>
              <p>{`${formatToIDR(item?.quantity * item?.activity?.price)}`}</p>

              <div className="flex gap-10">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item?.quantity + 1, item?.id)
                  }
                >
                  +
                </button>
                <p>{item?.quantity}</p>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item?.quantity - 1, item?.id)
                  }
                >
                  -
                </button>
                <button onClick={() => handleDelete(item?.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        {cartItems.length > 0 && (
          <div>
            <p>
              Total Price:{" "}
              {formatToIDR(
                cartItems.reduce(
                  (total, item) =>
                    total + item.quantity * item?.activity?.price,
                  0
                )
              )}
            </p>
            <button>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
