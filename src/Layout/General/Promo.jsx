import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromos } from "../../reducer/promoSlice";
import { Link } from "react-router-dom";

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
    <div className="grid grid-cols-3 gap-5 p-5">
      {data.map((promo) => (
        <div key={promo.id} >
          <h2>{promo.title}</h2>
          <Link to={`/promo/${promo.id}`}>
            <img src={promo.imageUrl} alt={promo.name}  className="w-full h-60"/>
          </Link>
          <p>{promo.promo_code}</p>
        </div>
      ))}
    </div>
  );
};

export default Promo;
