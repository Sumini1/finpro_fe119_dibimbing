// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Navbar from "../../../components/General/Navbar";
// import { fetchCart, fetchCartUpdate,  fetchCartDelete } from "../../../reducer/cartSlice";
// import Swal from "sweetalert2"
// import { RiDeleteBin5Line } from "react-icons/ri";

// const CartPage = () => {
//   const dispatch = useDispatch()
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   console.log("cartItems", cartItems);

//   const handleUpdateQuantity = (quantity, id) => {
//     dispatch(fetchCartUpdate({ id, quantity }))
//       .unwrap()
//       .then(() => {
//         dispatch(fetchCart());
//       });
//   };
// const handleDelete = (id) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You want to delete this Activity?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   })
//     .then((result) => {
//       if (result.isConfirmed) {
//         dispatch(fetchCartDelete(id)).then(() => {
//           Swal.fire("Deleted!", "Your activity has been deleted.", "success");
//           dispatch(fetchCart());
//         });
//       }
//     })
//     .catch(() => {
//       Swal.fire("Delete failed", "Failed to delete activity.", "error");
//     });
// };

//  const formatToIDR = (amount) => {
//    return new Intl.NumberFormat("id-ID", {
//      style: "currency",
//      currency: "IDR",
//    }).format(amount);
//  };

//   return (
//     <div>
//       <Navbar />
//       <div className="text-white p-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 md:p-20 md:mt-[-40px] min-h-screen">
//         <h1>Your Cart</h1>
//         {cartItems.length > 0 ? (
//           cartItems.map((item, index) => (
//             <div key={index}>
//               <p className="mt-7">{item?.activity?.title}</p>
//               <p>{item?.activity?.facilities}</p>
//               <p>{item?.activity?.price_discount}</p>
//               <p>{item?.activity?.description}</p>
//               <p>{`${formatToIDR(item?.activity?.price)}`}</p>
//               <p>{`${formatToIDR(item?.quantity * item?.activity?.price)}`}</p>
//               <img
//                 className="w-[100px] h-[100px] "
//                 src={item?.activity?.imageUrls[0]}
//                 alt={item?.activity?.title}
//               />
//               <div className="flex gap-10 ">
//                 <table className="border-1  ">
//                   <th>1</th>
//                   <th>3</th>
//                   <th></th>
//                 </table>
//                 <button
//                   onClick={() =>
//                     handleUpdateQuantity(item?.quantity + 1, item?.id)
//                   }
//                 >
//                   +
//                 </button>
//                 <p>{item?.quantity}</p>
//                 <button
//                   onClick={() =>
//                     handleUpdateQuantity(item?.quantity - 1, item?.id)
//                   }
//                 >
//                   -
//                 </button>
//                 {/* <button onClick={() => handleDelete(item?.id)}>Remove</button> */}
//                 <RiDeleteBin5Line onClick={() => handleDelete(item?.id)} />
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Your cart is empty.</p>
//         )}

//         {cartItems.length > 0 && (
//           <div className="flex flex-col ">
//             <p>
//               Total Price:{" "}
//               {formatToIDR(
//                 cartItems.reduce(
//                   (total, item) =>
//                     total + item.quantity * item?.activity?.price,
//                   0
//                 )
//               )}
//             </p>
//             <button className="bg-blue-500 text-white p-2 rounded-lg m-5">
//               Checkout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/General/Navbar";
import {
  fetchCart,
  fetchCartUpdate,
  fetchCartDelete,
} from "../../../reducer/cartSlice";
import Swal from "sweetalert2";
import { RiDeleteBin5Line } from "react-icons/ri";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedItems, setSelectedItems] = useState([]);

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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchCartDelete(id)).then(() => {
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
          dispatch(fetchCart());
        });
      }
    });
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleCheckout = () => {
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (selectedCartItems.length > 0) {
      navigate("/payment-method", { state: { selectedCartItems } });
    } else {
      Swal.fire(
        "Warning",
        "Please select at least one item to checkout.",
        "warning"
      );
    }
  };

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div>
      <Navbar />
      <div className="text-white p-5 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 md:p-20 md:mt-[-40px] min-h-screen">
        <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
        {cartItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white text-black rounded-md overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3">Select</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="text-center border-b border-gray-300"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td className="p-3">
                      <img
                        className="w-[100px] h-[100px] mx-auto"
                        src={item?.activity?.imageUrls[0]}
                        alt={item?.activity?.title}
                      />
                    </td>
                    <td className="p-3">{item?.activity?.title}</td>
                    <td className="p-3">
                      {formatToIDR(item?.activity?.price)}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item?.quantity - 1, item?.id)
                          }
                          className="bg-gray-300 px-2 rounded"
                        >
                          -
                        </button>
                        <span>{item?.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item?.quantity + 1, item?.id)
                          }
                          className="bg-gray-300 px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      {formatToIDR(item?.quantity * item?.activity?.price)}
                    </td>
                    <td className="p-3">
                      <RiDeleteBin5Line
                        onClick={() => handleDelete(item?.id)}
                        className="text-red-500 text-xl cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}

        {cartItems.length > 0 && (
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

