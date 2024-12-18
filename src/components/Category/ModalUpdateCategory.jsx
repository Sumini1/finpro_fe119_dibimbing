import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUpdateCategory } from "../../reducer/updateCategorySlice";
import { fetchGetCategories } from "../../reducer/categorySlice";

const ModalUpdateCategory = ({ category, categoryId, toggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateCategoryStatus = useSelector((state) => state.updateCategory);
  console.log(updateCategoryStatus);

  const [fileImage, setFileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: category?.name || "",
    imageUrl: category?.imageUrl || "",
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
    const accesToken = localStorage.getItem("accessToken");

    if (!fileImage && !formData.imageUrl) {
      setErrorMessage("Please select an image file.");
      return;
    }

    let imageUrl = formData.imageUrl;
    if (fileImage) {
      const formDataImage = new FormData();
      formDataImage.append("image", fileImage);

      try {
        const imageUploadResponse = await axios.post(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
          formDataImage,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": "multipart/form-data",
              apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${accesToken}`,
            },
          }
        );
        imageUrl = imageUploadResponse.data.url;

        setFormData((prevData) => ({
          ...prevData,
          imageUrl,
        }));
      } catch (error) {
        setErrorMessage("Failed to upload image.");
        console.log(error);
        return;
      }
    }

    const categoryData = {
      ...formData,
      imageUrl,
    };

    try {
      await dispatch(fetchUpdateCategory({ id: categoryId, categoryData }));
      dispatch(fetchGetCategories());
      // navigate("/category");
      toggleModal();
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md p-4 bg-blue-700 rounded-lg shadow ">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h3 className="text-lg font-semibold text-white">
            Update Category
          </h3>
          <button
            onClick={toggleModal}
            className="text-white hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={(e) => setFileImage(e.target.files[0])}
              className="w-full p-2 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-800 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateCategory;
