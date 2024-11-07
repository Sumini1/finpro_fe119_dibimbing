import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCreateCategory } from "../../reducer/createCategorySlice";
import { fetchGetCategories } from "../../reducer/categorySlice";

const ModalCreateCategory = ({ isModalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createCategoryStatus = useSelector((state) => state.createCategory);
  console.log(createCategoryStatus);

  const [fileImage, setFileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
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

    // Cek jika 'name' kosong
    if (!formData.name) {
      setErrorMessage("Name is required.");
      return;
    }

    // Cek jika tidak ada file gambar yang dipilih
    if (!fileImage) {
      setErrorMessage("Please select an image file.");
      return;
    }

    // Buat FormData untuk mengirim data ke server
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name); // Menambahkan 'name' ke FormData
    formDataToSend.append("image", fileImage); // Menambahkan 'image' ke FormData

    try {
      // Kirim permintaan upload gambar
      const imageUploadResponse = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formDataToSend,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": "multipart/form-data",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accesToken}`,
          },
        }
      );

      const imageUrl = imageUploadResponse.data.url;

      // Kirim data kategori setelah mendapatkan URL gambar
      const categoryData = {
        ...formData,
        imageUrl, // Menyertakan URL gambar yang diupload
      };
      dispatch(fetchCreateCategory(categoryData));
      dispatch(fetchGetCategories());
      navigate("/category");
      toggleModal();
    } catch (error) {
      setErrorMessage(
        "Error uploading image or creating category. Please try again."
      );
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md p-4 bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create Category
          </h3>
          <button
            onClick={toggleModal}
            className="text-gray-400 hover:text-gray-900"
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
              className="w-full p-2"
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

export default ModalCreateCategory;
