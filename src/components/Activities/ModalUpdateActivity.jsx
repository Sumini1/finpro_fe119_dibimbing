import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUpdateActivity } from "../../reducer/updateActivitySlice";
import { fetchActivity } from "../../reducer/activitySlice";

const ModalUpdateActivity = ({ toggleModal, activity, activityId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateActivity = useSelector((state) => state.updateActivity);

  const [fileImages, setFileImages] = useState(null);
  const [formData, setFormData] = useState({
    categoryId: activity?.categoryId || "",
    name: activity?.name || "",
    title: activity?.title || "",
    description: activity?.description || "",
    imageUrls: activity?.imageUrls || "",
    price: activity?.price || "",
    price_discount: activity?.price_discount || "",
    rating: activity?.rating || "",
    total_reviews: activity?.total_reviews || "",
    facilities: activity?.facilities || "",
    address: activity?.address || "",
    province: activity?.province || "",
    city: activity?.city || "",
    location_maps: activity?.location_maps || "",
  });
  const [errorMessage, setErrorMessage] = useState("");

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData((prevData) => ({
     ...prevData,
     [name]: value,
   }));
 };

 // mengganti file image menjadi array of files
 const handleImageChange = (e) => {
   const files = Array.from(e.target.files);
   setFileImages(files);
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!fileImages || fileImages.length === 0) {
     setErrorMessage("Silakan unggah minimal satu gambar.");
     return;
   }
   const accessToken = localStorage.getItem("accessToken");
   const uploadedImageUrls = [];

   try {
     for (const fileImage of fileImages) {
       const imageData = new FormData();
       imageData.append("image", fileImage);

       const response = await axios.post(
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
       uploadedImageUrls.push(response.data.url);
     }

     // Hanya lanjutkan jika uploadedImageUrls sudah berisi URL
     if (uploadedImageUrls.length === 0) {
       setErrorMessage("Gagal mengunggah gambar. Silakan coba lagi.");
       return;
     }

     const activityData = {
       ...formData,
       imageUrls: uploadedImageUrls,
       price: parseInt(formData.price, 10),
       price_discount: parseInt(formData.price_discount, 10),
       rating: parseInt(formData.rating, 10),
       total_reviews: parseInt(formData.total_reviews, 10),
     };

     dispatch(fetchUpdateActivity({ id: activityId, activityData }));
     dispatch(fetchActivity());
     toggleModal();
   } catch (error) {
     setErrorMessage("Gagal mengunggah gambar atau memperbarui aktivitas.");
   }
 };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-lg p-4 bg-blue-700 rounded-lg shadow-md ">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h3 className="text-lg font-semibold text-white">
            Update Promo
          </h3>
          <button
            onClick={toggleModal}
            className="text-white"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Category Id
              </label>
              <input
                type="text"
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                rows="2"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                ImageUrls
              </label>
              <input
                type="file"
                id="imageUrls"
                name="imageUrls"
                onChange={handleImageChange}
                className="w-full p-1 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Price Discount
              </label>
              <input
                type="number"
                id="price_discount"
                name="price_discount"
                value={formData.price_discount}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
          </div>

          {/* Second row of inputs */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Total Reviews
              </label>
              <input
                type="number"
                id="total_reviews"
                name="total_reviews"
                value={formData.total_reviews}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Facilities
              </label>
              <input
                type="text"
                id="facilities"
                name="facilities"
                value={formData.facilities}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Province
              </label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Location Maps
              </label>
              <textarea
                rows="2"
                id="location_maps"
                name="location_maps"
                value={formData.location_maps}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 text-white bg-blue-800 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateActivity;
