import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCreateTransaction } from "../../reducer/transactionSlice";
import { useNavigate } from "react-router-dom";

const ModalCreateTransaction = ({
  toggleModalCreate,
  cartIds,
  paymentMethodId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    cartIds: cartIds || [], 
    paymentMethodId: paymentMethodId || "", 
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Fungsi untuk meng-handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // // Validasi Input
    // if (!formData.cartIds.length) {
    //   setErrorMessage("Cart ID wajib diisi.");
    //   setIsLoading(false);
    //   return;
    // }

    // if (!formData.paymentMethodId) {
    //   setErrorMessage("Payment Method ID wajib diisi.");
    //   setIsLoading(false);
    //   return;
    // }

    // Dispatch API Create Transaction
    dispatch(
      fetchCreateTransaction({
        cartIds: formData.cartIds, // Ambil dari formData
        paymentMethodId: formData.paymentMethodId, // Ambil dari formData
      })
    )
      .unwrap()
      .then(() => {
        navigate("/my-transactions");
        toggleModalCreate();
      })
      .catch((error) => {
        setErrorMessage(
          "Gagal membuat transaksi: " + (error.message || "Kesalahan server.")
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative m-2 p-4 bg-white rounded-lg shadow w-[500px]">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h3 className="text-lg font-semibold">Create Transaction</h3>
          <button
            onClick={toggleModalCreate}
            className="text-gray-400 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input untuk Cart ID */}
          <div>
            <label
              htmlFor="cartIds"
              className="block text-sm font-medium text-gray-900"
            >
              Cart ID
            </label>
            <input
              type="text"
              id="cartIds"
              name="cartIds"
              value={formData.cartIds}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              placeholder="Masukkan Cart ID"
            />
          </div>

          {/* Input untuk Payment Method ID */}
          <div>
            <label
              htmlFor="paymentMethodId"
              className="block text-sm font-medium text-gray-900"
            >
              Payment Method ID
            </label>
            <input
              type="text"
              id="paymentMethodId"
              name="paymentMethodId"
              value={formData.paymentMethodId}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              placeholder="Masukkan Payment Method ID"
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className={`w-full py-2 text-white rounded ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ModalCreateTransaction;
