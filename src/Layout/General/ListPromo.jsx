import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromos } from "../../reducer/promoSlice";
import { Link } from "react-router-dom";

const ListPromo = () => {
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
    <div className="grid py-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
      <h1 className="text-white font-['Itim'] mx-10 text-2xl">
        List Semua Promo
      </h1>
      <div className="grid grid-cols-1 gap-5 p-10 text-white md:grid-cols-3">
        {data.map((promo) => (
          <div key={promo.id} className="shadow-lg h-[300px] rounded-md">
            {/* <h2>{promo.title}</h2> */}
            <Link to={`/promo/${promo.id}`}>
              <img
                src={promo.imageUrl}
                alt={promo.name}
                className="w-full rounded-md h-60"
              />
            </Link>
            {/* <p>{promo?.description}</p> */}
            <p className="mx-2 mt-3 font-['Itim'] text-lg">{`Code promo : ${promo.promo_code}`}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-2 ">
        <Link to={"/"}>
          <button className="font-['Itim'] text-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white w-[200px] items-center p-1 rounded-full">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListPromo;
