import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { fetchStatusUpdate } from "../../reducer/transactionSlice";

const ModalUpdateStatus = ({isModalOpen, toggleModal, transactionId, transaction }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        status:  "", 
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        try {
            await dispatch(fetchStatusUpdate({ id : transactionId, status: formData.status }));
            toggleModal((prev) => 
            !prev
            );
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };


  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative m-2 p-4 bg-white rounded-lg shadow w-[500px]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b">
            <h3 className="text-lg font-semibold">Update Proof of Payment</h3>
            <button
              onClick={() => toggleModal((prev) => !prev)}
              className="text-gray-400 hover:text-gray-900"
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-900"
              >
                Update Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
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
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    );
};

export default ModalUpdateStatus;