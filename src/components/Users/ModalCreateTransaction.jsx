import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCreateTransaction} from "../../reducer/createTransactionSlice"

const ModalCreateTransaction = ({ toggleModalCreate }) => {
  // State lokal untuk menyimpan data form
  const [formData, setFormData] = useState({
    cartId: "",
    paymentMethodId: "",
  });

  // Fungsi untuk meng-handle perubahan input
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk meng-handle submit form
  const handleSubmit = (e) => { 
    e.preventDefault();
    // Lakukan tindakan untuk membuat transaksi
    console.log("Membuat transaksi:", formData);
    // Tutup modal setelah berhasil membuat transaksi
    toggleModalCreate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-4 bg-white rounded-lg shadow w-[500px]">
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
              htmlFor="cartId"
              className="block text-sm font-medium text-gray-900"
            >
              Cart ID
            </label>
            <input
              type="text"
              id="cartId"
              name="cartId"
              value={formData.cartId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
              placeholder="Masukkan Payment Method ID"
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateTransaction;
