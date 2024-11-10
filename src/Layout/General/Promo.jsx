import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromos } from "../../reducer/promoSlice";
import { Link } from "react-router-dom";
import { MdOutlineDiscount } from "react-icons/md";

const Promo = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.promo);

  useEffect(() => {
    dispatch(fetchGetPromos());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }
  return (
    <div className="grid py-10 bg-blue-500 md:p-16">
      <div className="text-white font-['Itim'] mx-5 text-2xl">
        <div className="flex gap-1 mb-3">
          <MdOutlineDiscount />
          <h1 className="text-lg font-bold md:text-2xl">FlashSale</h1>
        </div>
        <p className="flex flex-col w-full mx-5 text-lg md:text-2xl">
          Promo terbatas <span>dapetin promonya sekarang</span>
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3 md:p-10 md:gap-7 ">
        {data.slice(0, 3).map((promo) => (
          <div
            key={promo.id}
            className="shadow-lg h-[330px] rounded-md text-white md:h-[450px] "
          >
            <Link to={`/promo/${promo.id}`}>
              <img
                src={promo.imageUrl}
                alt={promo.name}
                className="w-full rounded-md h-60 md:h-[350px]"
              />
            </Link>
            <div className="mx-2 mt-3 font-['Itim'] text-xl md:mx-5">
              <h2>{promo.title}</h2>
              <p>{`Code promo : ${promo.promo_code}`}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-2">
        <Link to={"/list-promo"}>
          <button className="font-['Itim'] text-xl bg-blue-600 text-white w-[200px] items-center p-1 rounded-full">
            List semua promo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Promo;
