import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromoById } from "../../reducer/promoByIdSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PromoById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.promoById);

  useEffect(() => {
    dispatch(fetchGetPromoById(id));
  }, [id, dispatch]);

  // Fungsi untuk memformat angka menjadi IDR
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="min-h-screen p-4 bg-blue-500 md:p-10">
      <div className="text-lg text-white">
        {isLoading && <p>Loading...</p>}
        {message && <p>Error: {message}</p>}
        {data ? (
          <div className="flex flex-col items-center shadow-lg">
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="w-full max-w-xs p-3 md:max-w-md lg:max-w-lg">
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2 p-5 mt-5 md:p-10">
                <h2 className="mb-5 text-xl font-semibold">
                  Title: {data.title}
                </h2>
                <p>{`Code Promo: ${data?.promo_code}`}</p>
                <p>{`Diskon: ${data?.terms_condition}`}</p>
                <p>{data.description}</p>
                <p>{`Potongan Diskon: ${formatToIDR(
                  data?.promo_discount_price
                )}`}</p>
                <p>{`Minimum Belanja: ${formatToIDR(
                  data?.minimum_claim_price
                )}`}</p>
                <div className="flex flex-col items-center mt-5 md:items-start">
                  <button className="w-[150px] mt-5 bg-blue-600 rounded-full text-center py-2">
                    Claim Now
                  </button>
                  <Link to="/list-promo">
                    <button className="w-[200px] mt-3 bg-blue-600 rounded-full py-2">
                      Back to list promo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No promo found.</p>
        )}
      </div>
    </div>
  );
};

export default PromoById;
