import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchTransactionUpdate,
  fetchMyTransactions,
} from "../../reducer/transactionSlice";
import axios from "axios";

const ModalUpdateProof = ({ toggleModalOpen, transactionId }) => {
  const dispatch = useDispatch();

  const [fileImage, setFileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    setErrorMessage(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!fileImage) {
      setErrorMessage("Please select an image file.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", fileImage);

      const uploadResponse = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const proofPaymentUrl = uploadResponse.data.url;

      // Kirim URL ke backend untuk update transaksi
      await dispatch(
        fetchTransactionUpdate({
          id: transactionId,
          proofPaymentUrl, 
        })
      ).unwrap();

      // Refresh transaksi dan tutup modal
      dispatch(fetchMyTransactions());
      toggleModalOpen();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update proof of payment."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative m-2 p-4 bg-white rounded-lg shadow w-[500px]">
        <div className="flex items-center justify-between pb-3 mb-4 ">
          <h3 className="text-lg font-semibold">Update Proof of Payment</h3>
          <button
            onClick={toggleModalOpen}
            className="text-gray-400 hover:text-gray-900\\"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full md:w-[300px]">
            <input
              type="file"
              id="proofPaymentUrl"
              name="proofPaymentUrl"
              onChange={handleFileChange}
              className="w-full p-2 border rounded text-black md:w-[200px]"
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
