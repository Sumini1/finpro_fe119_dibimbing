import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactionUpdate, fetchMyTransactions } from "../../reducer/transactionSlice";


const ModalUpdateProof = ({ toggleModalOpen, transactionId }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    proofPaymentUrl: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.proofPaymentUrl.trim()) {
      setErrorMessage("Proof of Payment URL is required!");
      return;
    }

    setIsLoading(true);

    dispatch(
      fetchTransactionUpdate({
        id: transactionId,
        proofPaymentUrl: formData.proofPaymentUrl,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchMyTransactions());
        toggleModalOpen();
      })
      .catch((error) => {
        setErrorMessage(error.message || "Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative m-2 p-4 bg-white rounded-lg shadow w-[500px]">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h3 className="text-lg font-semibold">Update Proof of Payment</h3>
          <button
            onClick={toggleModalOpen}
            className="text-gray-400 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="proofPaymentUrl"
              className="block text-sm font-medium text-gray-900"
            >
              Proof of Payment URL
            </label>
            <input
              type="text"
              id="proofPaymentUrl"
              name="proofPaymentUrl"
              value={formData.proofPaymentUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              placeholder="Enter proof payment URL"
            />
          </div>

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

export default ModalUpdateProof;
