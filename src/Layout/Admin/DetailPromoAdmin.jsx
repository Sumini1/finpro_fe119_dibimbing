import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromoById } from "../../reducer/promoByIdSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/General/Navbar";
import Footer from "../../components/General/Footer";

const DetailPromoAdmin = () => {
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
    <div>
      <Navbar />
      <div className="min-h-screen p-6 py-5 bg-blue-500 md:p-10 ">
        <div className="text-lg text-white">
          {isLoading && <p>Loading...</p>}
          {message && <p>Error: {message}</p>}
          <h1 className="mb-5 text-2xl md:text-3xl font-bold md:mx-56"  >Detail Promo Admin Page</h1>
          {data ? (
            <div className="flex flex-col items-center justify-center shadow-lg ">
              <div className="flex flex-col gap-2 md:flex-row md:mb-5">
                <div className="w-full p-3 md:max-w-md lg:max-w-lg">
                  <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="w-full h-auto rounded-lg "
                  />
                </div>
                <div className="flex flex-col gap-2 p-5 mt-1 md:p-10 md:mt-[-30px]">
                  <h2 className="mb-2 text-xl font-semibold">
                    Title: {data.title}
                  </h2>
                  <p>{`Code Promo: ${data?.promo_code}`}</p>
                  <p className="w-[350px]">{`Diskon: ${data?.terms_condition}`}</p>
                  <p>{data.description}</p>
                  <p>{`Potongan Diskon: ${formatToIDR(
                    data?.promo_discount_price
                  )}`}</p>
                  <p>{`Minimum Belanja: ${formatToIDR(
                    data?.minimum_claim_price
                  )}`}</p>
                  <div className="flex items-center gap-2 mt-5 md:items-start">
                  
                    <Link to="/promo-admin">
                      <button className="w-[170px] mt-3 bg-blue-600 rounded-full p-1">
                        Back to Dasboard
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
      <Footer />
    </div>
  );
};

export default DetailPromoAdmin;
