import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUpdatePromo } from "../../reducer/updatePromoSlice";
import { fetchGetPromos } from "../../reducer/promoSlice";

const ModalUpdatePromo = ({toggleModal, promo, promoId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateBannerStatus = useSelector((state) => state.updatePromo);
  console.log(updateBannerStatus);

  const [fileImage, setFileImage] = useState(null);
  const [formData, setFormData] = useState({
    title: promo?.title || "",
    description: promo?.description || "",
    imageUrl: promo?.imageUrl || "",
    terms_condition: promo?.terms_condition || "",
    promo_code: promo?.promo_code || "",
    promo_discount_price: promo?.promo_discount_price || "",
    minimum_claim_price: promo?.minimum_claim_price || "",
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
    if (!fileImage && !formData.imageUrl) {
      setErrorMessage("Please select an image file.");
      return;
    }
    if (!fileImage && !formData.imageUrl){
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
        
        setFormData((prevData) => ({
          ...prevData,
          promo_discount_price: parseInt(prevData.promo_discount_price, 10), 
          minimum_claim_price: parseInt(prevData.minimum_claim_price, 10), 
          imageUrl, 
        }));
      } catch (error) {
        console.error(error);
        return
      }
    }
    const promoData = {
      ...formData,
      promo_discount_price: parseInt(formData.promo_discount_price, 10), 
      minimum_claim_price: parseInt(formData.minimum_claim_price, 10),
      imageUrl, 
    };
    try {
      await dispatch(fetchUpdatePromo({id : promoId, promoData }));
      dispatch(fetchGetPromos());
      // navigate("/promo");
      toggleModal();
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
      return
    }
  }

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md p-4 bg-blue-700 rounded-lg shadow ">
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h3 className="text-lg font-semibold text-white ">
            Update Promo
          </h3>
          <button
            onClick={toggleModal}
            className="text-white"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white "
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="name"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="profilePictureUrl"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              ImageUrl
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={(e) => setFileImage(e.target.files[0])}
              className="w-full p-2 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Terms Condition
            </label>
            <input
              type="text"
              id="terms_condition"
              name="terms_condition"
              value={formData.terms_condition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo_code"
              name="promo_code"
              value={formData.promo_code}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Promo Diskon
            </label>
            <input
              type="number"
              id="promo_discount_price"
              name="promo_discount_price"
              value={formData.promo_discount_price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Promo Claim Price
            </label>
            <input
              type="number"
              id="minimum_claim_price"
              name="minimum_claim_price"
              value={formData.minimum_claim_price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
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

export default ModalUpdatePromo;
