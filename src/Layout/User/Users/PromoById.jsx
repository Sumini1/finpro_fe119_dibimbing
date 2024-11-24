import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromoById } from "../../../reducer/promoByIdSlice";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../../components/General/Navbar";
import Footer from "../../../components/General/Footer";

const PromoById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.promoById);

  useEffect(() => {
    dispatch(fetchGetPromoById(id));
  }, [id, dispatch]);

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 md:p-10">
        <div className="text-lg text-white">
          {isLoading && <p>Loading...</p>}
          {message && <p>Error: {message}</p>}
          {data ? (
            <div className="flex flex-col items-center shadow-lg">
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full max-w-xs py-3 lg:max-w-lg">
                  <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="w-full h-auto rounded-lg md:w-[900px] md:h-[400px] mb-0 md:mb-10"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5 mt-[-20px]  md:p-10 md:mt-[-5px]">
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
                    {/* <button
                    onClick={handleClaimPromo}
                    className="w-[150px] mt-5 bg-blue-600 rounded-full text-center py-2"
                  >
                    Claim Now
                  </button> */}
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
      <Footer />
    </div>
  );
};

export default PromoById;
