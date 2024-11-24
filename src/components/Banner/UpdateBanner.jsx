
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUpdateBanner } from "../../reducer/updateBannerSlice";
import { fetchGetBanners } from "../../reducer/bannerSlice";

const UpdateBanner = ({ bannerId, toggleModal, banner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateBannerState = useSelector((state) => state.updateBanner);
  console.log(updateBannerState);

  const [fileImage, setFileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: banner?.name || "",
    imageUrl: banner?.imageUrl || "", 
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

    // Pastikan file gambar terpilih
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
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        imageUrl = imageUploadResponse.data.url; 

        // Update formData dengan imageUrl yang baru
        setFormData((prevData) => ({
          ...prevData,
          imageUrl, 
        }));
      } catch (error) {
        setErrorMessage("Failed to upload image.");
        console.error(error);
        return;
      }
    }

    // Gabungkan data name dan imageUrl yang baru (baik dari formData atau hasil upload)
    const bannerData = {
      ...formData, 
      imageUrl, 
    };

    // Kirim data banner untuk diupdate
    try {
      await dispatch(fetchUpdateBanner({ id: bannerId, bannerData }));
      dispatch(fetchGetBanners()); 
      navigate("/banners"); 
      toggleModal(); 
    } catch (error) {
      setErrorMessage("Failed to update banner.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md p-4 bg-white rounded-lg shadow ">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h3 className="text-lg font-semibold ">
            Update Banner
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

export default UpdateBanner;
