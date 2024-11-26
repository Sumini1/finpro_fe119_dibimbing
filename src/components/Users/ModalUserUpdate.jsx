
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUpdateUser } from "../../reducer/updateUserSlice";
import { fetchGetAllUsers } from "../../reducer/allUserSlice";

const ModalUserUpdate = ({ isModalOpen, toggleModal, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateUserStatus = useSelector((state) => state.updateUser);
  console.log(updateUserStatus);

  const [fileImage, setFileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (!fileImage) {
        throw new Error("Please select an image file.");
      }

      const imageData = new FormData();
      imageData.append("image", fileImage);

      const imageUploadResponse = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        imageData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": "multipart/form-data",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const profilePictureUrl = imageUploadResponse.data.url;

      const userData = {
        ...formData,
        profilePictureUrl,
      };

      dispatch(fetchUpdateUser(userData))
        .unwrap()
        .then(() => {
          dispatch(fetchGetAllUsers());
          // navigate("/alluser");
          toggleModal();
        });
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md p-4 bg-blue-700 rounded-lg shadow">
        <div className="flex  justify-between pb-3 mb-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Update User
          </h3>
          <button
            onClick={toggleModal}
            className="text-white "
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div className="flex flex-col ">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label
              htmlFor="profilePictureUrl"
              className="block text-sm font-medium text-white"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePictureUrl"
              name="profilePictureUrl"
              onChange={(e) => setFileImage(e.target.files[0])}
              className="w-full p-2 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ModalUserUpdate;
