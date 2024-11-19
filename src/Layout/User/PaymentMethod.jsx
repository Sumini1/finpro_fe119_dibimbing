import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchPaymentMethod } from "../../reducer/paymentMethodSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/General/Navbar";
import ModalCreateTransaction from "../../components/Users/ModalCreateTransaction";

const PaymentMethod = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { selectedCartItems } = location.state || { selectedCartItems: [] };
  const { data: paymentMethod } = useSelector((state) => state.paymentMethod);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const toggleModalCreate = () => {
    setIsModalCreateOpen((prev) => !prev);
  };

  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    dispatch(fetchPaymentMethod());
  }, [dispatch]);

  const handleSelectPaymentMethod = (methodId) => {
    setSelectedMethod(methodId);
  };

  // const handleSubmit = () => {
  //   if (!selectedMethod) {
  //     alert("Please select a payment method!");
  //     return;
  //   }

  //   console.log("Selected Method:", selectedMethod);
  //   console.log("Selected Items:", selectedCartItems);
  //   // proses pembayaran
  // };

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-blue-500 min-h-screen z-50 p-5 md:p-10 text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Buat Pesanan</h1>
        <h2 className="font-semibold mb-2 text-md md:text-xl">
          Selected Items:
        </h2>
        <ul>
          {selectedCartItems.map((item) => (
            <li key={item.id}>
              <p className="text-md md:text-xl">{item?.activity?.title}</p>
              <p className="text-md md:text-xl">Quantity: {item.quantity}</p>

              <p>
                Total:{" "}
                {`${formatToIDR(item?.quantity * item?.activity?.price)}`}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h2 className="font-semibold mt-4 mb-3 text-md md:text-xl">
            Choose Payment Method:
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {paymentMethod.map((method) => (
              <div
                key={method.id}
                onClick={() => handleSelectPaymentMethod(method.id)}
                className={`cursor-pointer border p-3 rounded ${
                  selectedMethod === method.id
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={method.imageUrl}
                  alt={method.name}
                  className="w-16 h-16 mx-auto"
                />
                <p className="text-center mt-2">{method.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={toggleModalCreate}
              className="bg-green-600 text-white px-5 py-2 rounded-lg mt-4"
            >
              Create Transaction
            </button>
            <Link to={"/cart"}>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-4">
                Back To Cart
              </button>
            </Link>
          </div>
        </div>
        {/* Modal */}
        {isModalCreateOpen && (
          <ModalCreateTransaction
            toggleModalCreate={toggleModalCreate}
            cartIds={selectedCartItems.map((item) => item.id)}
            paymentMethodId={selectedMethod}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
